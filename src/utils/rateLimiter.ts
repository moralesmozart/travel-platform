// Rate Limiter para prevenir ataques de fuerza bruta
// Implementación simple en memoria (en producción usar Redis o similar)

interface LoginAttempt {
  timestamp: number;
  ip?: string;
  userAgent?: string;
}

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

class RateLimiter {
  private attempts: Map<string, LoginAttempt[]> = new Map();
  private blockedIPs: Map<string, number> = new Map();
  
  private config: RateLimitConfig = {
    maxAttempts: 5,        // 5 intentos por ventana
    windowMs: 60000,       // 1 minuto
    blockDurationMs: 300000 // 5 minutos de bloqueo
  };

  constructor(config?: Partial<RateLimitConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  // Obtener IP del cliente (simulado para desarrollo)
  private getClientIP(): string {
    // En desarrollo, usar timestamp como identificador único
    // En producción, obtener IP real del request
    return `client_${Date.now()}`;
  }

  // Limpiar intentos antiguos
  private cleanOldAttempts(identifier: string): void {
    const attempts = this.attempts.get(identifier) || [];
    const now = Date.now();
    const validAttempts = attempts.filter(
      attempt => now - attempt.timestamp < this.config.windowMs
    );
    
    if (validAttempts.length === 0) {
      this.attempts.delete(identifier);
    } else {
      this.attempts.set(identifier, validAttempts);
    }
  }

  // Verificar si una IP está bloqueada
  private isBlocked(identifier: string): boolean {
    const blockedUntil = this.blockedIPs.get(identifier);
    if (!blockedUntil) return false;

    const now = Date.now();
    if (now > blockedUntil) {
      this.blockedIPs.delete(identifier);
      return false;
    }

    return true;
  }

  // Registrar intento de login
  public recordAttempt(identifier?: string): { allowed: boolean; remainingAttempts: number; blockedUntil?: number } {
    const clientIP = identifier || this.getClientIP();
    
    // Verificar si está bloqueado
    if (this.isBlocked(clientIP)) {
      const blockedUntil = this.blockedIPs.get(clientIP);
      return {
        allowed: false,
        remainingAttempts: 0,
        blockedUntil
      };
    }

    // Limpiar intentos antiguos
    this.cleanOldAttempts(clientIP);

    // Obtener intentos actuales
    const attempts = this.attempts.get(clientIP) || [];
    const now = Date.now();

    // Verificar si excede el límite
    if (attempts.length >= this.config.maxAttempts) {
      // Bloquear IP
      this.blockedIPs.set(clientIP, now + this.config.blockDurationMs);
      
      return {
        allowed: false,
        remainingAttempts: 0,
        blockedUntil: now + this.config.blockDurationMs
      };
    }

    // Registrar nuevo intento
    const newAttempt: LoginAttempt = {
      timestamp: now,
      ip: clientIP
    };

    attempts.push(newAttempt);
    this.attempts.set(clientIP, attempts);

    const remainingAttempts = this.config.maxAttempts - attempts.length;

    return {
      allowed: true,
      remainingAttempts
    };
  }

  // Resetear intentos para una IP (útil después de login exitoso)
  public resetAttempts(identifier?: string): void {
    const clientIP = identifier || this.getClientIP();
    this.attempts.delete(clientIP);
    this.blockedIPs.delete(clientIP);
  }

  // Obtener estadísticas de rate limiting
  public getStats(identifier?: string): { attempts: number; blocked: boolean; blockedUntil?: number } {
    const clientIP = identifier || this.getClientIP();
    const attempts = this.attempts.get(clientIP) || [];
    const blockedUntil = this.blockedIPs.get(clientIP);
    
    return {
      attempts: attempts.length,
      blocked: this.isBlocked(clientIP),
      blockedUntil
    };
  }
}

// Instancia global del rate limiter
export const loginRateLimiter = new RateLimiter({
  maxAttempts: 5,        // 5 intentos por minuto
  windowMs: 60000,       // 1 minuto
  blockDurationMs: 300000 // 5 minutos de bloqueo
});

export default RateLimiter;
