import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Shield, AlertTriangle, Clock, Users } from 'lucide-react';
import { loginRateLimiter } from '../utils/rateLimiter';

const MonitorContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #1a1a1a;
  color: white;
  padding: 16px;
  border-radius: 8px;
  font-size: 0.8rem;
  z-index: 1000;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const MonitorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 0.75rem;
`;

const StatValue = styled.span<{ color?: string }>`
  color: ${props => props.color || '#fff'};
  font-weight: 600;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    color: #fff;
  }
`;

interface RateLimitMonitorProps {
  onClose?: () => void;
}

const RateLimitMonitor: React.FC<RateLimitMonitorProps> = ({ onClose }) => {
  const [stats, setStats] = useState(loginRateLimiter.getStats());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(loginRateLimiter.getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible || process.env.NODE_ENV === 'production') {
    return null;
  }

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    const remaining = Math.ceil((timestamp - Date.now()) / 1000);
    return `${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')}`;
  };

  return (
    <MonitorContainer>
      <CloseButton onClick={handleClose}>×</CloseButton>
      
      <MonitorHeader>
        <Shield size={14} />
        Rate Limiter Monitor
      </MonitorHeader>

      <StatItem>
        <Users size={12} />
        Intentos actuales: 
        <StatValue color={stats.attempts > 3 ? '#ff6b6b' : '#51cf66'}>
          {stats.attempts}/5
        </StatValue>
      </StatItem>

      <StatItem>
        <AlertTriangle size={12} />
        Estado: 
        <StatValue color={stats.blocked ? '#ff6b6b' : '#51cf66'}>
          {stats.blocked ? 'BLOQUEADO' : 'ACTIVO'}
        </StatValue>
      </StatItem>

      {stats.blocked && stats.blockedUntil && (
        <StatItem>
          <Clock size={12} />
          Desbloqueo en: 
          <StatValue color="#ffa726">
            {formatTime(stats.blockedUntil)}
          </StatValue>
        </StatItem>
      )}
    </MonitorContainer>
  );
};

export default RateLimitMonitor;
