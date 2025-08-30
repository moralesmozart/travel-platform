import React, { useState } from 'react';
import styled from 'styled-components';
import SeasonSelector from './SeasonSelector';

const ExampleContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ExampleSection = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
`;

const ExampleTitle = styled.h2`
  color: #333;
  margin-bottom: 16px;
`;

const LanguageSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const LanguageButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.isActive ? '#4CAF50' : '#e0e0e0'};
  background: ${props => props.isActive ? '#4CAF50' : 'white'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isActive ? '#45a049' : '#f5f5f5'};
  }
`;

// Configuraciones para diferentes idiomas
const configurations = {
  portuguese: {
    title: "Quando você quer viajar?",
    subtitle: "Escolha a estação ideal para sua escapada",
    continueText: "Continuar",
    seasons: {
      spring: { name: "Primavera", description: "Flores e clima ameno" },
      summer: { name: "Verão", description: "Sol e piscinas" },
      autumn: { name: "Outono", description: "Vindimas e cores" },
      winter: { name: "Inverno", description: "Lareira e aconchego" }
    }
  },
  spanish: {
    title: "¿Cuándo quieres viajar?",
    subtitle: "Elige la estación ideal para tu escapada",
    continueText: "Continuar",
    seasons: {
      spring: { name: "Primavera", description: "Flores y clima templado" },
      summer: { name: "Verano", description: "Sol y piscinas" },
      autumn: { name: "Otoño", description: "Vendimia y colores" },
      winter: { name: "Invierno", description: "Chimenea y acogida" }
    }
  },
  english: {
    title: "When do you want to travel?",
    subtitle: "Choose the ideal season for your getaway",
    continueText: "Continue",
    seasons: {
      spring: { name: "Spring", description: "Flowers and mild weather" },
      summer: { name: "Summer", description: "Sun and pools" },
      autumn: { name: "Autumn", description: "Harvest and colors" },
      winter: { name: "Winter", description: "Fireplace and coziness" }
    }
  }
};

const SeasonSelectorExample: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'portuguese' | 'spanish' | 'english'>('portuguese');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  const config = configurations[currentLanguage];

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
    console.log(`Estación seleccionada (${currentLanguage}):`, season);
  };

  const handleContinue = () => {
    if (selectedSeason) {
      setCurrentStep(prev => prev + 1);
      console.log(`Continuando al paso ${currentStep + 1}...`);
      alert(`¡Perfecto! Has seleccionado ${config.seasons[selectedSeason as keyof typeof config.seasons]?.name}. Continuando al paso ${currentStep + 1}`);
    } else {
      alert('Por favor selecciona una estación antes de continuar');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      console.log('Volviendo al paso anterior...');
    }
  };

  return (
    <ExampleContainer>
      <ExampleSection>
        <ExampleTitle>Selector de Estaciones - Ejemplo Multiidioma</ExampleTitle>
        
        <LanguageSelector>
          <LanguageButton 
            isActive={currentLanguage === 'portuguese'}
            onClick={() => setCurrentLanguage('portuguese')}
          >
            Português
          </LanguageButton>
          <LanguageButton 
            isActive={currentLanguage === 'spanish'}
            onClick={() => setCurrentLanguage('spanish')}
          >
            Español
          </LanguageButton>
          <LanguageButton 
            isActive={currentLanguage === 'english'}
            onClick={() => setCurrentLanguage('english')}
          >
            English
          </LanguageButton>
        </LanguageSelector>

        <SeasonSelector
          currentStep={currentStep}
          totalSteps={5}
          onSeasonSelect={handleSeasonSelect}
          onContinue={handleContinue}
          onBack={handleBack}
          title={config.title}
          subtitle={config.subtitle}
          continueText={config.continueText}
        />
      </ExampleSection>

      <ExampleSection>
        <ExampleTitle>Información del Componente</ExampleTitle>
        <p><strong>Idioma actual:</strong> {currentLanguage}</p>
        <p><strong>Paso actual:</strong> {currentStep}/5</p>
        <p><strong>Estación seleccionada:</strong> {selectedSeason || 'Ninguna'}</p>
        <p><strong>Barra de progreso:</strong> {Math.round((currentStep / 5) * 100)}%</p>
      </ExampleSection>
    </ExampleContainer>
  );
};

export default SeasonSelectorExample;
