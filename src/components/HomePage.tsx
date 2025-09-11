import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Search, AlertTriangle, HelpCircle, Calendar, BookOpen, TrendingUp, TreePine, Wine, Heart, Plus, Settings, Send } from 'lucide-react';
import { testSupabaseConnection, checkEnvironmentVariables } from '../utils/testSupabase';
import { verifySupabaseSetup, verifyProductionSetup } from '../utils/verifySupabase';
import { debugSupabaseData } from '../utils/debugSupabase';
import { simpleSupabaseTest } from '../utils/simpleTest';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const AdminButton = styled.button`
  position: fixed;
  top: 120px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 500;
  transition: all 0.3s ease;
  z-index: 1001;
  
  &:hover {
    background: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// Banner Section
const BannerSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px 0;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const BannerText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const BannerTextLine = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BannerCTA = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;



// Hero Section
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  text-align: center;
  margin-top: 120px; /* Compensar el banner fijo */
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 20px;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 1rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }
`;

const NavigationIndicator = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 40px;
  border: 2px solid white;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8px;
  color: white;
  animation: bounce 2s infinite;
  
  &::after {
    content: '';
    width: 4px;
    height: 12px;
    background: white;
    border-radius: 9999px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40%, 43% {
      transform: translateX(-50%) translateY(-8px);
    }
    70% {
      transform: translateX(-50%) translateY(-4px);
    }
    90% {
      transform: translateX(-50%) translateY(-2px);
    }
  }
`;

// Problem Section
const ProblemSection = styled.section`
  padding: 80px 20px;
  background: #F8F6F3;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2C3E50;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #5D6D7E;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 3rem;
`;

const ProblemCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #E8E8E8;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const PlatformName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2C3E50;
  margin: 0;
`;

const ProblemIcon = styled.div`
  color: #E74C3C;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProblemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProblemItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: #5D6D7E;
  font-size: 0.95rem;
  line-height: 1.4;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const WarningIcon = styled.div`
  color: #F39C12;
  flex-shrink: 0;
`;

// Solution Section Styles
const SolutionSection = styled.section`
  padding: 80px 20px;
  background: white;
`;

const SolutionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 3rem;
`;

const SolutionCard = styled.div`
  text-align: center;
  padding: 32px 24px;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SolutionIcon = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: ${props => props.color};
`;

const SolutionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 16px;
`;

const SolutionDescription = styled.p`
  font-size: 1rem;
  color: #5D6D7E;
  line-height: 1.6;
`;

// Market Section Styles
const MarketSection = styled.section`
  padding: 80px 20px;
  background: #F8F6F3;
`;

const MarketContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const MarketLeft = styled.div`
  text-align: center;
`;

const MarketNumber = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const MarketSubtitle = styled.p`
  font-size: 1.2rem;
  color: #5D6D7E;
  margin-bottom: 32px;
`;

const MarketIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const MarketIconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #5D6D7E;
`;

const MarketRight = styled.div`
  display: flex;
  align-items: center;
`;

const GrowthCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
`;

const GrowthHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 24px;
`;

const GrowthBar = styled.div`
  position: relative;
  height: 80px;
  margin: 16px 0 40px 0;
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;

const GrowthBarItem = styled.div<{ height: number; color: string; label: string }>`
  position: relative;
  width: 60px;
  height: ${props => props.height}px;
  background: ${props => props.color};
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 8px;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  
  &::after {
    content: '${props => props.label}';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    color: #7F8C8D;
    white-space: nowrap;
  }
`;

const GrowthCurve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
    border-radius: 1px;
  }
`;

const PricingSection = styled.section`
  background: #f8f9fa;
  padding: 80px 20px;
`;

const PricingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const PricingTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
  color: #2c3e50;
  
  span {
    color: #4CAF50;
  }
`;

const PricingSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 60px;
  color: #7F8C8D;
`;

const PricingCards = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
`;

const PricingCard = styled.div<{ featured?: boolean }>`
  background: ${props => props.featured ? '#4CAF50' : 'white'};
  color: ${props => props.featured ? 'white' : '#2c3e50'};
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.featured && `
    &::before {
      content: 'Más Popular';
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: #FFD700;
      color: #2c3e50;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `}
`;

const PlanIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const PlanPeriod = styled.div`
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 20px;
`;

const PlanTagline = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
  text-align: left;
`;

const PlanFeature = styled.li`
  padding: 8px 0;
  display: flex;
  align-items: center;
  
  &::before {
    content: '✓';
    color: #4CAF50;
    font-weight: bold;
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const PlanButton = styled.button<{ featured?: boolean }>`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.featured ? 'white' : '#4CAF50'};
  color: ${props => props.featured ? '#4CAF50' : 'white'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const GrowthText = styled.p`
  font-size: 1rem;
  color: #5D6D7E;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const GrowthLink = styled.a`
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
  
  &:hover {
    color: #45a049;
  }
`;

// Final CTA Section Styles
const FinalCTASection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const FinalTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FinalSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #FFD700;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FinalDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryCTAButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
`;

const SecondaryCTAButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
  }
`;

// Data for the solution features
const solutionFeatures: SolutionFeature[] = [
  {
    title: 'Cuestionario Visual',
    description: 'Iconos interactivos que ayudan a los viajeros a encontrar la masia perfecta',
    icon: <HelpCircle size={32} />,
    color: '#4CAF50'
  },
  {
    title: 'Gestión Completa',
    description: 'Calendario integrado y pagos seguros para propietarios',
    icon: <Calendar size={32} />,
    color: '#2196F3'
  },
  {
    title: 'Storytelling',
    description: 'Cada masia cuenta su historia única a través de contenido visual rico',
    icon: <BookOpen size={32} />,
    color: '#FF9800'
  }
];

// Data for the problem cards
const platformProblems = [
  {
    name: 'Booking.com',
    problems: [
      'Generalista',
      'Interfaz confusa',
      'Sin enfoque en masias'
    ]
  },
  {
    name: 'Airbnb',
    problems: [
      'Mezcla todo',
      'Difícil encontrar masias',
      'Sin storytelling'
    ]
  },
  {
    name: 'Escapada Rural',
    problems: [
      'Diseño desactualizado',
      'Poca personalización',
      'Experiencia básica'
    ]
  },
  {
    name: 'Club Rural',
    problems: [
      'Limitado',
      'Sin modernidad',
      'Falta visual'
    ]
  }
];

interface HomePageProps {
  onFindMasia?: () => void;
  onAdminLogin?: () => void;
  onSubmitMasia?: () => void;
}

interface SolutionFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const HomePage: React.FC<HomePageProps> = ({ onFindMasia, onAdminLogin, onSubmitMasia }) => {
  // Probar conexión con Supabase al cargar el componente
  useEffect(() => {
    const testConnection = async () => {
      console.log('🚀 Iniciando verificación completa de Supabase...');
      
      // Verificar configuración de producción
      const productionInfo = verifyProductionSetup();
      
      // Verificar variables de entorno
      const envOk = checkEnvironmentVariables();
      if (!envOk) {
        console.error('❌ Variables de entorno no configuradas correctamente');
        return;
      }
      
      // Verificación completa de Supabase
      const verification = await verifySupabaseSetup();
      if (verification.success) {
        console.log('🎉 ¡Todo listo! Supabase está funcionando correctamente');
        console.log('📊 Resumen:', verification.stats);
      } else {
        console.error('❌ Error en la verificación de Supabase:', verification.error);
      }
      
      // Prueba simple primero
      console.log('🧪 Ejecutando prueba simple...');
      const simpleTestResult = await simpleSupabaseTest();
      
      if (simpleTestResult) {
        // Diagnóstico detallado
        console.log('🔍 Ejecutando diagnóstico detallado...');
        await debugSupabaseData();
      } else {
        console.log('❌ Prueba simple falló, saltando diagnóstico detallado');
      }
    };
    
    testConnection();
  }, []);
  const handleFindMasia = () => {
    console.log('Buscar Masia clicked');
    onFindMasia?.();
  };

  const handleAdminLogin = () => {
    console.log('Admin Login clicked');
    // Navegar usando HashRouter
    window.location.href = '/travel-platform/#/admin/login';
  };

  const handleBannerCTA = () => {
    console.log('Banner CTA clicked - redirecting to masia submission');
    // Navegar al formulario de envío de masias
    window.location.href = '/travel-platform/#/submit-masia';
  };

    return (
    <HomeContainer>
      <AdminButton onClick={handleAdminLogin}>
        <Settings size={14} />
        Admin
      </AdminButton>
      
      {/* Banner Section */}
      <BannerSection>
        <BannerContent>
          <BannerText>
            <BannerTextLine>
              🎉 ¡Únete hoy por 3 meses gratis!
            </BannerTextLine>
            <BannerTextLine style={{ fontSize: '1rem', fontWeight: '400' }}>
              Después de 3 meses te contactaremos y explicaremos los siguientes pasos, tú decides si continuar o no, sin ningún costo
            </BannerTextLine>
            <BannerTextLine style={{ marginTop: '8px' }}>
              <BannerCTA onClick={handleBannerCTA}>
                <Send size={16} />
                Enviar mi Masia
              </BannerCTA>
            </BannerTextLine>
          </BannerText>
        </BannerContent>
      </BannerSection>
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Descubre el encanto de las</HeroTitle>
          <HeroSubtitle>Masias de Cataluña</HeroSubtitle>
          <HeroDescription>
            Una plataforma justa, visual y hecha para conectar viajeros con las masias auténticas
          </HeroDescription>
          <CTAButton onClick={handleFindMasia}>
            <Search size={20} />
            Encuentra tu Masia
          </CTAButton>
        </HeroContent>
        <NavigationIndicator />
      </HeroSection>

      {/* Problem Section */}
      <ProblemSection>
        <SectionContainer>
          <SectionTitle>El Problema de las Plataformas Actuales</SectionTitle>
          <SectionSubtitle>
            Las masias catalanas se pierden en plataformas generalistas que no valoran su autenticidad
          </SectionSubtitle>
          
          <CardsGrid>
            {platformProblems.map((platform, index) => (
              <ProblemCard key={index}>
                <CardHeader>
                  <PlatformName>{platform.name}</PlatformName>
                  <ProblemIcon>✕</ProblemIcon>
                </CardHeader>
                <ProblemList>
                  {platform.problems.map((problem, problemIndex) => (
                    <ProblemItem key={problemIndex}>
                      <WarningIcon>
                        <AlertTriangle size={16} />
                      </WarningIcon>
                      {problem}
                    </ProblemItem>
                  ))}
                </ProblemList>
              </ProblemCard>
            ))}
          </CardsGrid>
        </SectionContainer>
      </ProblemSection>

      {/* Solution Section */}
      <SolutionSection>
        <SectionContainer>
          <SectionTitle>
            Nuestra <span style={{ color: '#4CAF50' }}>Solución</span>
          </SectionTitle>
          <SectionSubtitle>
            Una plataforma especializada que conecta personas con las masias auténticas de Cataluña
          </SectionSubtitle>
          
          <SolutionGrid>
            {solutionFeatures.map((feature, index) => (
              <SolutionCard key={index}>
                <SolutionIcon color={feature.color}>
                  {feature.icon}
                </SolutionIcon>
                <SolutionTitle>{feature.title}</SolutionTitle>
                <SolutionDescription>{feature.description}</SolutionDescription>
              </SolutionCard>
            ))}
          </SolutionGrid>
        </SectionContainer>
      </SolutionSection>

      {/* Market & Opportunity Section */}
      <MarketSection>
        <SectionContainer>
          <SectionTitle>
            Mercado & <span style={{ color: '#4CAF50' }}>Oportunidad</span>
          </SectionTitle>
          
          <MarketContent>
            <MarketLeft>
              <MarketNumber>22,967</MarketNumber>
              <MarketSubtitle>Masias registradas en Cataluña</MarketSubtitle>
              <MarketIcons>
                <MarketIconItem>
                  <TreePine size={24} color="#4CAF50" />
                  <span>Natureza</span>
                </MarketIconItem>
                <MarketIconItem>
                  <Wine size={24} color="#E74C3C" />
                  <span>Vinhedos</span>
                </MarketIconItem>
                <MarketIconItem>
                  <Heart size={24} color="#FF69B4" />
                  <span>Pet Friendly</span>
                </MarketIconItem>
              </MarketIcons>
            </MarketLeft>
            
            <MarketRight>
              <GrowthCard>
                <GrowthHeader>
                  <TrendingUp size={20} color="#4CAF50" />
                  <span>Crecimiento Constante</span>
                </GrowthHeader>

                <GrowthText>
                  El turismo rural en Cataluña mantiene un crecimiento estable con búsquedas constantes por "masia", "masia catalonia" y "masia pet friendly".
                </GrowthText>
                <GrowthLink 
                  href="https://trends.google.com/trends/explore?geo=ES-CT&q=masia,masia%20catalonia,masia%20alquiler,masia%20pet%20friendly&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Google Trends →
                </GrowthLink>
              </GrowthCard>
            </MarketRight>
          </MarketContent>
        </SectionContainer>
      </MarketSection>

      {/* Pricing Section */}
      <PricingSection>
        <PricingContainer>
          <PricingTitle>
            Planes de <span>Negocio</span>
          </PricingTitle>
          <PricingSubtitle>
            Elige el plan ideal para destacar tu masia
          </PricingSubtitle>
          
          <PricingCards>
            <PricingCard>
              <PlanIcon>🏠</PlanIcon>
              <PlanName>Masia Basic</PlanName>
              <PlanPrice>€19,99</PlanPrice>
              <PlanPeriod>/mes</PlanPeriod>
              <PlanTagline>Para empezar simple</PlanTagline>
              <PlanFeatures>
                <PlanFeature>Perfil básico de la masia</PlanFeature>
                <PlanFeature>Galería de fotos</PlanFeature>
                <PlanFeature>Información de contacto</PlanFeature>
                <PlanFeature>Sin calendario integrado</PlanFeature>
              </PlanFeatures>
              <PlanButton onClick={onSubmitMasia || handleFindMasia}>
                Quiero ese Plan
              </PlanButton>
            </PricingCard>
            
            <PricingCard featured>
              <PlanIcon>⭐</PlanIcon>
              <PlanName>Masia Flex</PlanName>
              <PlanPrice>€39,99</PlanPrice>
              <PlanPeriod>/mes</PlanPeriod>
              <PlanTagline>Destacado y funcionalidades completas</PlanTagline>
              <PlanFeatures>
                <PlanFeature>Destacado en el cuestionario</PlanFeature>
                <PlanFeature>Calendario integrado</PlanFeature>
                <PlanFeature>Pagos online</PlanFeature>
                <PlanFeature>Storytelling visual</PlanFeature>
                <PlanFeature>Analytics avanzados</PlanFeature>
              </PlanFeatures>
              <PlanButton featured onClick={onSubmitMasia || handleFindMasia}>
                Quiero ese Plan
              </PlanButton>
            </PricingCard>
          </PricingCards>
        </PricingContainer>
      </PricingSection>

      {/* Final CTA Section */}
      <FinalCTASection>
        <SectionContainer>
          <FinalTitle>
            Las masias son historia, cultura y <span style={{ color: '#FFD700' }}>autenticidad</span>
          </FinalTitle>
          <FinalSubtitle>
            Ahora también tienen una casa digital
          </FinalSubtitle>
          <FinalDescription>
            Únete a la revolución del turismo rural catalán. Conecta tu masia con viajeros que buscan experiencias auténticas.
          </FinalDescription>
          
          <CTAButtonsContainer>
            <PrimaryCTAButton onClick={onSubmitMasia || handleFindMasia}>
              <Plus size={20} />
              Registra tu Masia
            </PrimaryCTAButton>
            <SecondaryCTAButton onClick={handleFindMasia}>
              <Search size={20} />
              Explorar Masias
            </SecondaryCTAButton>
          </CTAButtonsContainer>
        </SectionContainer>
      </FinalCTASection>
    </HomeContainer>
  );
};

export default HomePage;
