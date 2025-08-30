import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight, Check, Flower, Sun, Leaf, Snowflake, TreePine, BookOpen, Wine, Heart, Calendar, AlertTriangle } from 'lucide-react';

// Tipos TypeScript
interface Season {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface SeasonSelectorProps {
  currentStep?: number;
  totalSteps?: number;
  onSeasonSelect?: (season: string) => void;
  onContinue?: () => void;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  continueText?: string;
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ProgressContainer = styled.div`
  flex: 1;
  margin: 0 20px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #4CAF50;
    transition: width 0.3s ease;
  }
`;

const StepIndicator = styled.span`
  color: #666;
  font-size: 14px;
  font-weight: 500;
`;

const Content = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.4;
`;

const SeasonCard = styled.div<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? '#f8fff8' : 'white'};
  border: 2px solid ${props => props.isSelected ? '#4CAF50' : '#e0e0e0'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  position: relative;
  
  &:hover {
    border-color: ${props => props.isSelected ? '#4CAF50' : '#4CAF50'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
`;

const SeasonInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const SeasonName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const SeasonDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const CheckIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #4CAF50;
`;

const ContinueButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 32px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Datos del quiz por pasos
const quizSteps = [
  {
    step: 1,
    title: '¿Cuándo quieres viajar?',
    subtitle: 'Elige la estación ideal para tu escapada',
    multiple: false,
    options: [
      {
        id: 'spring',
        name: '🌸 Primavera',
        description: 'Flores y clima suave',
        icon: <Flower size={20} color="#FF69B4" />,
        color: '#FF69B4'
      },
      {
        id: 'summer',
        name: '☀️ Verano',
        description: 'Sol y piscina',
        icon: <Sun size={20} color="#FFD700" />,
        color: '#FFD700'
      },
      {
        id: 'autumn',
        name: '🍂 Otoño',
        description: 'Vendimias y colores',
        icon: <Leaf size={20} color="#8B4513" />,
        color: '#8B4513'
      },
      {
        id: 'winter',
        name: '❄️ Invierno',
        description: 'Chimenea y calidez',
        icon: <Snowflake size={20} color="#87CEEB" />,
        color: '#87CEEB'
      }
    ]
  },
  {
    step: 2,
    title: '¿Qué tipo de experiencia prefieres?',
    subtitle: 'Selecciona el tipo de aventura que buscas',
    multiple: true,
    options: [
      {
        id: 'nature',
        name: '🏞️ Naturaleza',
        description: 'Montañas, ríos y aire fresco',
        icon: <TreePine size={20} color="#4CAF50" />,
        color: '#4CAF50'
      },
      {
        id: 'relax',
        name: '🏖️ Relax',
        description: 'Playa, sol y tranquilidad',
        icon: <Sun size={20} color="#FF9800" />,
        color: '#FF9800'
      },
      {
        id: 'culture',
        name: '🏙️ Cultura',
        description: 'Museos, historia y arte',
        icon: <BookOpen size={20} color="#9C27B0" />,
        color: '#9C27B0'
      },
      {
        id: 'gourmet',
        name: '🍷 Gourmet',
        description: 'Vinos y gastronomía local',
        icon: <Wine size={20} color="#E74C3C" />,
        color: '#E74C3C'
      }
    ]
  },
  {
    step: 3,
    title: '¿Con quién viajas?',
    subtitle: 'Selecciona todos los que se aplican',
    multiple: true,
    options: [
      {
        id: 'solo',
        name: '🧘 Solo/a',
        description: 'Paz y tranquilidad',
        icon: <div style={{ fontSize: '20px' }}>🧘</div>,
        color: '#9C27B0'
      },
      {
        id: 'couple',
        name: '💑 En pareja',
        description: 'Momentos románticos',
        icon: <div style={{ fontSize: '20px' }}>💑</div>,
        color: '#FF69B4'
      },
      {
        id: 'family',
        name: '👨‍👩‍👧 En familia',
        description: 'Diversión para todos',
        icon: <div style={{ fontSize: '20px' }}>👨‍👩‍👧</div>,
        color: '#4CAF50'
      },
      {
        id: 'children',
        name: '😊 Con niños',
        description: 'Espacio seguro para jugar',
        icon: <div style={{ fontSize: '20px' }}>👶</div>,
        color: '#FF9800'
      },
      {
        id: 'pets',
        name: '🐕 Con mascotas',
        description: 'Pet-friendly',
        icon: <div style={{ fontSize: '20px' }}>🐕</div>,
        color: '#795548'
      },
      {
        id: 'friends',
        name: '👥 Con amigos',
        description: 'Celebración y diversión',
        icon: <div style={{ fontSize: '20px' }}>👥</div>,
        color: '#2196F3'
      }
    ]
  },
  {
    step: 4,
    title: '¿Cuánto tiempo quieres viajar?',
    subtitle: 'Selecciona la duración de tu escapada',
    multiple: false,
    options: [
      {
        id: 'short',
        name: '⏳ Escapada corta',
        description: '2-3 días',
        icon: <Calendar size={20} color="#4CAF50" />,
        color: '#4CAF50'
      },
      {
        id: 'week',
        name: '📅 Una semana',
        description: 'Lo justo para desconectar',
        icon: <Calendar size={20} color="#2196F3" />,
        color: '#2196F3'
      },
      {
        id: 'long',
        name: '🗓️ Más de 10 días',
        description: 'Sumergirse de lleno',
        icon: <Calendar size={20} color="#9C27B0" />,
        color: '#9C27B0'
      }
    ]
  },
  {
    step: 5,
    title: '¿Cuál es tu presupuesto aproximado?',
    subtitle: 'Elige el rango de presupuesto que te sienta cómodo',
    multiple: false,
    options: [
      {
        id: 'budget',
        name: '💸 Económico',
        description: 'Disfrutar sin gastar demasiado',
        icon: <AlertTriangle size={20} color="#4CAF50" />,
        color: '#4CAF50'
      },
      {
        id: 'medium',
        name: '💳 Medio',
        description: 'Buen equilibrio',
        icon: <AlertTriangle size={20} color="#FF9800" />,
        color: '#FF9800'
      },
      {
        id: 'premium',
        name: '💎 Premium',
        description: 'Experiencia sin límites',
        icon: <AlertTriangle size={20} color="#9C27B0" />,
        color: '#9C27B0'
      }
    ]
  }
];

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  currentStep = 1,
  totalSteps = 5,
  onSeasonSelect,
  onContinue,
  onBack,
  title = "¿Cuándo quieres viajar?",
  subtitle = "Elige la estación ideal para tu escapada",
  continueText = "Continuar"
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (optionId: string) => {
    const currentStepData = quizSteps[currentStep - 1];
    
    if (currentStepData?.multiple) {
      // Selección múltiple
      setSelectedOptions(prev => {
        if (prev.includes(optionId)) {
          return prev.filter(id => id !== optionId);
        } else {
          return [...prev, optionId];
        }
      });
    } else {
      // Selección única
      setSelectedOptions([optionId]);
    }
    
    onSeasonSelect?.(optionId);
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      onContinue?.();
    }
  };

  const handleBack = () => {
    onBack?.();
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={24} color="#333" />
        </BackButton>
        
        <ProgressContainer>
          <ProgressBar progress={progress} />
        </ProgressContainer>
        
        <StepIndicator>{currentStep}/{totalSteps}</StepIndicator>
      </Header>

      <Content>
        <Title>{quizSteps[currentStep - 1]?.title || title}</Title>
        <Subtitle>{quizSteps[currentStep - 1]?.subtitle || subtitle}</Subtitle>

        {quizSteps[currentStep - 1]?.options.map((option) => (
          <SeasonCard
            key={option.id}
            isSelected={selectedOptions.includes(option.id)}
            onClick={() => handleOptionSelect(option.id)}
          >
            <IconContainer color={option.color}>
              {option.icon}
            </IconContainer>
            
            <SeasonInfo>
              <SeasonName>{option.name}</SeasonName>
              <SeasonDescription>{option.description}</SeasonDescription>
            </SeasonInfo>
            
            {selectedOptions.includes(option.id) && (
              <CheckIcon>
                <Check size={20} />
              </CheckIcon>
            )}
          </SeasonCard>
        ))}

        <ContinueButton onClick={handleContinue} disabled={selectedOptions.length === 0}>
          {continueText}
          <ArrowRight size={20} />
        </ContinueButton>
      </Content>
    </Container>
  );
};

export default SeasonSelector;
