import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Plus, 
  MapPin,
  Star,
  Users,
  Heart,
  Sun,
  Snowflake,
  Flower,
  Leaf,
  Settings
} from 'lucide-react';
import { Masia } from '../data/masiasDatabase';

interface MasiaEditorProps {
  masia: Masia;
  onSave: (updatedMasia: Masia) => void;
  onCancel: () => void;
}

const EditorContainer = styled.div`
  min-height: 100vh;
  background: #F8F9FA;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #E8E8E8;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7F8C8D;
  transition: all 0.2s;
  
  &:hover {
    background: #F8F9FA;
    color: #667eea;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2C3E50;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const SaveButton = styled.button`
  background: #28A745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: #218838;
    transform: translateY(-1px);
  }
`;

const CancelButton = styled.button`
  background: #DC3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: #C82333;
    transform: translateY(-1px);
  }
`;

const OwnerInfoSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #E8E8E8;
`;

const OwnerInfoTitle = styled.h3`
  font-size: 1.2rem;
  color: #2C3E50;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OwnerInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const OwnerInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OwnerInfoLabel = styled.label`
  font-weight: 600;
  color: #2C3E50;
  font-size: 0.9rem;
`;

const OwnerInfoValue = styled.div`
  color: #7F8C8D;
  font-size: 0.9rem;
  padding: 8px 12px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E8E8E8;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const EditorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #E8E8E8;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;


const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #5D6D7E;
  
  input[type="checkbox"] {
    width: auto;
    margin: 0;
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Tag = styled.span`
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  line-height: 1;
  
  &:hover {
    opacity: 0.8;
  }
`;

const AddTagInput = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const TagInputField = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #E8E8E8;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const AddTagButton = styled.button`
  background: #28A745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  
  &:hover {
    background: #218838;
  }
`;

const ImagePreview = styled.div<{ image: string }>`
  width: 100%;
  height: 200px;
  background: url(${props => props.image}) center/cover;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 2px solid #E8E8E8;
`;

const MasiaEditor: React.FC<MasiaEditorProps> = ({ masia, onSave, onCancel }) => {
  const [editedMasia, setEditedMasia] = useState<Masia>(masia);
  const [newRecommendation, setNewRecommendation] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newActivity, setNewActivity] = useState('');

  const handleInputChange = (field: keyof Masia, value: any) => {
    setEditedMasia(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: keyof Masia, value: string[]) => {
    setEditedMasia(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = (field: keyof Masia, newItem: string) => {
    if (newItem.trim()) {
      const currentArray = editedMasia[field] as string[];
      if (!currentArray.includes(newItem.trim())) {
        handleArrayChange(field, [...currentArray, newItem.trim()]);
      }
    }
  };

  const removeTag = (field: keyof Masia, itemToRemove: string) => {
    const currentArray = editedMasia[field] as string[];
    handleArrayChange(field, currentArray.filter(item => item !== itemToRemove));
  };

  const handleSave = () => {
    onSave(editedMasia);
  };

  const seasonOptions = [
    { value: 'Primavera', icon: <Flower size={16} /> },
    { value: 'Verano', icon: <Sun size={16} /> },
    { value: 'Otoño', icon: <Leaf size={16} /> },
    { value: 'Invierno', icon: <Snowflake size={16} /> }
  ];

  return (
    <EditorContainer>
      <Header>
        <HeaderLeft>
          <BackButton onClick={onCancel}>
            <ArrowLeft size={20} />
            Volver
          </BackButton>
          <HeaderTitle>Editar Masia: {editedMasia.name}</HeaderTitle>
        </HeaderLeft>
        <HeaderActions>
          <SaveButton onClick={handleSave}>
            <Save size={16} />
            Guardar Cambios
          </SaveButton>
          <CancelButton onClick={onCancel}>
            <X size={16} />
            Cancelar
          </CancelButton>
        </HeaderActions>
      </Header>

      <MainContent>
        {/* Información del Propietario - Solo mostrar si existe */}
        {editedMasia.ownerName && (
          <OwnerInfoSection>
            <OwnerInfoTitle>
              <Users size={20} />
              Información del Propietario
            </OwnerInfoTitle>
            <OwnerInfoGrid>
              <OwnerInfoItem>
                <OwnerInfoLabel>Nombre Completo</OwnerInfoLabel>
                <OwnerInfoValue>
                  {editedMasia.ownerName} {editedMasia.ownerSurname}
                </OwnerInfoValue>
              </OwnerInfoItem>
              <OwnerInfoItem>
                <OwnerInfoLabel>Email</OwnerInfoLabel>
                <OwnerInfoValue>{editedMasia.ownerEmail}</OwnerInfoValue>
              </OwnerInfoItem>
              <OwnerInfoItem>
                <OwnerInfoLabel>Teléfono</OwnerInfoLabel>
                <OwnerInfoValue>{editedMasia.ownerPhone}</OwnerInfoValue>
              </OwnerInfoItem>
              <OwnerInfoItem>
                <OwnerInfoLabel>Fecha de Envío</OwnerInfoLabel>
                <OwnerInfoValue>
                  {editedMasia.submittedAt ? new Date(editedMasia.submittedAt).toLocaleDateString('es-ES') : 'N/A'}
                </OwnerInfoValue>
              </OwnerInfoItem>
            </OwnerInfoGrid>
          </OwnerInfoSection>
        )}

        <EditorGrid>
          {/* Información Básica */}
          <Section>
            <SectionTitle>
              <MapPin size={20} />
              Información Básica
            </SectionTitle>
            
            <FormGroup>
              <Label>Nombre de la Masia</Label>
              <Input
                type="text"
                value={editedMasia.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Ubicación</Label>
              <Input
                type="text"
                value={editedMasia.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Precio por noche (€)</Label>
              <NumberInput
                type="number"
                value={editedMasia.price}
                onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
              />
            </FormGroup>

            <FormGroup>
              <Label>Capacidad (personas)</Label>
              <NumberInput
                type="number"
                value={editedMasia.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
              />
            </FormGroup>

            <FormGroup>
              <Label>URL de la Masia</Label>
              <Input
                type="url"
                value={editedMasia.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>URL de la Imagen</Label>
              <Input
                type="url"
                value={editedMasia.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
              />
              <ImagePreview image={editedMasia.image} />
            </FormGroup>
          </Section>

          {/* Descripción y Detalles */}
          <Section>
            <SectionTitle>
              <Star size={20} />
              Descripción y Detalles
            </SectionTitle>
            
            <FormGroup>
              <Label>Descripción</Label>
              <TextArea
                value={editedMasia.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe la masia..."
              />
            </FormGroup>

            <FormGroup>
              <Label>Recomendaciones</Label>
              <TagInput>
                {editedMasia.recommendations.map((rec, index) => (
                  <Tag key={index}>
                    {rec}
                    <RemoveTagButton onClick={() => removeTag('recommendations', rec)}>
                      ×
                    </RemoveTagButton>
                  </Tag>
                ))}
              </TagInput>
              <AddTagInput>
                <TagInputField
                  type="text"
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  placeholder="Nueva recomendación"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTag('recommendations', newRecommendation);
                      setNewRecommendation('');
                    }
                  }}
                />
                <AddTagButton onClick={() => {
                  addTag('recommendations', newRecommendation);
                  setNewRecommendation('');
                }}>
                  <Plus size={14} />
                </AddTagButton>
              </AddTagInput>
            </FormGroup>

            <FormGroup>
              <Label>Características</Label>
              <TagInput>
                {editedMasia.features.map((feature, index) => (
                  <Tag key={index}>
                    {feature}
                    <RemoveTagButton onClick={() => removeTag('features', feature)}>
                      ×
                    </RemoveTagButton>
                  </Tag>
                ))}
              </TagInput>
              <AddTagInput>
                <TagInputField
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Nueva característica"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTag('features', newFeature);
                      setNewFeature('');
                    }
                  }}
                />
                <AddTagButton onClick={() => {
                  addTag('features', newFeature);
                  setNewFeature('');
                }}>
                  <Plus size={14} />
                </AddTagButton>
              </AddTagInput>
            </FormGroup>
          </Section>

          {/* Amenities y Actividades */}
          <Section>
            <SectionTitle>
              <Users size={20} />
              Amenities y Actividades
            </SectionTitle>
            
            <FormGroup>
              <Label>Amenities</Label>
              <TagInput>
                {editedMasia.amenities.map((amenity, index) => (
                  <Tag key={index}>
                    {amenity}
                    <RemoveTagButton onClick={() => removeTag('amenities', amenity)}>
                      ×
                    </RemoveTagButton>
                  </Tag>
                ))}
              </TagInput>
              <AddTagInput>
                <TagInputField
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Nuevo amenity"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTag('amenities', newAmenity);
                      setNewAmenity('');
                    }
                  }}
                />
                <AddTagButton onClick={() => {
                  addTag('amenities', newAmenity);
                  setNewAmenity('');
                }}>
                  <Plus size={14} />
                </AddTagButton>
              </AddTagInput>
            </FormGroup>

            <FormGroup>
              <Label>Actividades</Label>
              <TagInput>
                {editedMasia.activities.map((activity, index) => (
                  <Tag key={index}>
                    {activity}
                    <RemoveTagButton onClick={() => removeTag('activities', activity)}>
                      ×
                    </RemoveTagButton>
                  </Tag>
                ))}
              </TagInput>
              <AddTagInput>
                <TagInputField
                  type="text"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Nueva actividad"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTag('activities', newActivity);
                      setNewActivity('');
                    }
                  }}
                />
                <AddTagButton onClick={() => {
                  addTag('activities', newActivity);
                  setNewActivity('');
                }}>
                  <Plus size={14} />
                </AddTagButton>
              </AddTagInput>
            </FormGroup>
          </Section>

          {/* Configuración y Preferencias */}
          <Section>
            <SectionTitle>
              <Settings size={20} />
              Configuración y Preferencias
            </SectionTitle>
            
            <FormGroup>
              <Label>Temporadas Disponibles</Label>
              <CheckboxGroup>
                {seasonOptions.map((season) => (
                  <CheckboxLabel key={season.value}>
                    <input
                      type="checkbox"
                      checked={editedMasia.seasonality.includes(season.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          addTag('seasonality', season.value);
                        } else {
                          removeTag('seasonality', season.value);
                        }
                      }}
                    />
                    {season.icon}
                    {season.value}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </FormGroup>

            <FormGroup>
              <Label>Características Especiales</Label>
              <CheckboxGroup>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={editedMasia.petFriendly}
                    onChange={(e) => handleInputChange('petFriendly', e.target.checked)}
                  />
                  <Heart size={16} />
                  Pet Friendly
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={editedMasia.familyFriendly}
                    onChange={(e) => handleInputChange('familyFriendly', e.target.checked)}
                  />
                  <Users size={16} />
                  Familiar
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={editedMasia.romantic}
                    onChange={(e) => handleInputChange('romantic', e.target.checked)}
                  />
                  <Heart size={16} />
                  Romántico
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={editedMasia.groupFriendly}
                    onChange={(e) => handleInputChange('groupFriendly', e.target.checked)}
                  />
                  <Users size={16} />
                  Grupos
                </CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>
          </Section>
        </EditorGrid>
      </MainContent>
    </EditorContainer>
  );
};

export default MasiaEditor;
