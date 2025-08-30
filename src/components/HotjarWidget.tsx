import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MessageCircle, X } from 'lucide-react';
import { trackEvent } from '../config/hotjar';

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeedbackButton = styled.button`
  background: #ff6b35;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: #e55a2b;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
  }
`;

const SurveyButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #666;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #555;
  }
`;

const WidgetWrapper = styled.div`
  position: relative;
`;

interface HotjarWidgetProps {
  onClose?: () => void;
}

const HotjarWidget: React.FC<HotjarWidgetProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    // Solo mostrar en producción
    if (process.env.NODE_ENV !== 'production') {
      setIsVisible(false);
    }
  }, []);

  const handleFeedback = () => {
    trackEvent('feedback_widget_clicked', {
      action: 'feedback',
      timestamp: new Date().toISOString()
    });
    
    // Trigger Hotjar feedback
    if (typeof window !== 'undefined' && window.hj) {
      window.hj!('trigger', 'feedback');
    }
  };



  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
    
    trackEvent('widget_closed', {
      timestamp: new Date().toISOString()
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <WidgetContainer>
      <WidgetWrapper>
        <CloseButton onClick={handleClose}>
          <X size={12} />
        </CloseButton>
        
        <FeedbackButton onClick={handleFeedback}>
          <MessageCircle size={16} />
          Danos tu opinión
        </FeedbackButton>
        

      </WidgetWrapper>
    </WidgetContainer>
  );
};

export default HotjarWidget;
