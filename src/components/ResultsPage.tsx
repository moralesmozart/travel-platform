import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, MapPin, Star, Users, Car, Calendar, ExternalLink } from 'lucide-react';
import { Masia, masiasDatabase } from '../data/masiasDatabase';

interface ResultsPageProps {
  onNewSearch?: () => void;
  onBookNow?: (masiaId: string) => void;
  resultsCount?: number;
  masias?: Masia[];
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: #F8F6F3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.div`
  background: white;
  padding: 20px;
  border-bottom: 1px solid #E8E8E8;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ResultsCount = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: 500;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2C3E50;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: #5D6D7E;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const MasiaCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const MasiaContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MasiaImage = styled.div<{ image: string }>`
  height: 400px;
  background: url(${props => props.image}) center/cover;
  position: relative;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const MasiaInfo = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MasiaHeader = styled.div`
  margin-bottom: 24px;
`;

const MasiaTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 8px;
  line-height: 1.2;
`;

const MasiaLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 16px;
`;

const PriceContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
`;

const PriceText = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const MasiaDescription = styled.p`
  color: #5D6D7E;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;

const RecommendationsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 12px;
`;

const RecommendationsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const RecommendationTag = styled.span`
  background: #E8F5E8;
  color: #4CAF50;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const MasiaFeatures = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: #666;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BookButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  align-self: flex-end;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }
`;

const ViewDetailsButton = styled.a`
  background: transparent;
  color: #4CAF50;
  border: 2px solid #4CAF50;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  margin-right: 12px;
  
  &:hover {
    background: #4CAF50;
    color: white;
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

// Usar la base de datos de masias
const sampleMasias = masiasDatabase;

const ResultsPage: React.FC<ResultsPageProps> = ({
  onNewSearch,
  onBookNow,
  resultsCount = 6,
  masias = sampleMasias
}) => {
  const handleNewSearch = () => {
    onNewSearch?.();
  };

  const handleBookNow = (masiaId: string) => {
    onBookNow?.(masiaId);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleNewSearch}>
          <ArrowLeft size={20} />
          Nueva búsqueda
        </BackButton>
        <ResultsCount>{resultsCount} masias encontradas</ResultsCount>
      </Header>

      <Content>
        <PageTitle>Masias Perfectas para Ti</PageTitle>
        <PageSubtitle>
          Seleccionadas especialmente basadas en tus preferencias
        </PageSubtitle>

        {masias.map((masia) => (
          <MasiaCard key={masia.id}>
            <MasiaContent>
              <MasiaImage image={masia.image}>
                <PriceContainer>
                  <Price>€{masia.price}</Price>
                  <PriceText>por noche</PriceText>
                </PriceContainer>
              </MasiaImage>
              
              <MasiaInfo>
                <MasiaHeader>
                  <MasiaTitle>{masia.name}</MasiaTitle>
                  <MasiaLocation>
                    <MapPin size={16} />
                    {masia.location}
                  </MasiaLocation>
                  
                  <MasiaDescription>{masia.description}</MasiaDescription>
                  
                  <RecommendationsTitle>Por qué recomendamos:</RecommendationsTitle>
                  <RecommendationsList>
                    {masia.recommendations.map((rec, index) => (
                      <RecommendationTag key={index}>{rec}</RecommendationTag>
                    ))}
                  </RecommendationsList>
                  
                  <MasiaFeatures>
                    <Feature>
                      <Star size={16} color="#FFD700" />
                      {masia.rating}
                    </Feature>
                    <Feature>
                      <Users size={16} />
                      Hasta {masia.capacity} personas
                    </Feature>
                    {masia.features.map((feature, index) => (
                      <Feature key={index}>
                        <Car size={16} />
                        {feature}
                      </Feature>
                    ))}
                  </MasiaFeatures>
                </MasiaHeader>
                
                <ButtonContainer>
                  <ViewDetailsButton href={masia.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    Ver Detalles
                  </ViewDetailsButton>
                  <BookButton onClick={() => handleBookNow(masia.id)}>
                    <Calendar size={20} />
                    Reservar Ahora
                  </BookButton>
                </ButtonContainer>
              </MasiaInfo>
            </MasiaContent>
          </MasiaCard>
        ))}
      </Content>
    </Container>
  );
};

export default ResultsPage;
