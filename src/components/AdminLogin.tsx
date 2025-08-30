import React, { useState } from 'react';
import styled from 'styled-components';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { getDemoCredentials } from '../config/auth';
import { loginRateLimiter } from '../utils/rateLimiter';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
  error?: string;
}

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const LoginHeader = styled.div`
  margin-bottom: 30px;
`;

const LoginIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  
  svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;

const LoginTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 8px;
`;

const LoginSubtitle = styled.p`
  color: #7F8C8D;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #E8E8E8;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #FAFAFA;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #BDC3C7;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #7F8C8D;
  padding: 4px;
  
  &:hover {
    color: #667eea;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 20px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(102, 126, 234, 0.1);
  }
`;

const ErrorMessage = styled.div`
  background: #FEE;
  color: #E74C3C;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const DemoCredentials = styled.div`
  background: #F8F9FA;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  font-size: 0.8rem;
  color: #7F8C8D;
  
  strong {
    color: #2C3E50;
  }
`;

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Verificar rate limiting antes de intentar login
    const stats = loginRateLimiter.getStats();
    if (stats.blocked) {
      const remainingTime = stats.blockedUntil ? Math.ceil((stats.blockedUntil - Date.now()) / 1000 / 60) : 0;
      setRateLimitInfo(`Cuenta bloqueada. Intenta de nuevo en ${remainingTime} minutos.`);
      setIsLoading(false);
      return;
    }
    
    // Mostrar información de intentos restantes
    if (stats.attempts > 0) {
      const remainingAttempts = 5 - stats.attempts;
      setRateLimitInfo(`Intentos restantes: ${remainingAttempts}`);
    }
    
    // Simular delay de autenticación
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginIcon>
            <Lock size={24} />
          </LoginIcon>
          <LoginTitle>Acceso Administrador</LoginTitle>
          <LoginSubtitle>Gestiona las masias de la plataforma</LoginSubtitle>
        </LoginHeader>

        {error && (
          <ErrorMessage>
            <AlertCircle size={16} />
            {error}
          </ErrorMessage>
        )}

        {rateLimitInfo && (
          <ErrorMessage style={{ backgroundColor: '#FFF3CD', color: '#856404', borderColor: '#FFEAA7' }}>
            <AlertCircle size={16} />
            {rateLimitInfo}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email de administrador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </PasswordToggle>
          </InputGroup>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </LoginButton>
        </Form>

        {getDemoCredentials() && (
          <DemoCredentials>
            <strong>Credenciales de prueba:</strong><br />
            Email: {getDemoCredentials()?.email}<br />
            Contraseña: {getDemoCredentials()?.password}
          </DemoCredentials>
        )}

        <BackButton onClick={onBack}>
          ← Volver al sitio principal
        </BackButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;
