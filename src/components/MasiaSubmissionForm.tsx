import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Save, X, Search, MapPin, Users, Settings } from 'lucide-react';

interface MasiaSubmissionFormProps {
  onBack: () => void;
  onSubmit: (masiaData: any) => void;
}

const FormContainer = styled.div`
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

const SubmitButton = styled.button`
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
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
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

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #2C3E50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 2px solid #F0F0F0;
`;



const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  min-height: 50px;
  align-items: center;
  
  &:focus-within {
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const Tag = styled.span`
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  display: flex;
  align-items: center;
`;

const TagInputField = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 100px;
  font-size: 0.9rem;
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #2c3e50;
  padding: 12px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: white;
  
  &:hover {
    border-color: #4CAF50;
    background: #f8fff8;
  }
  
  &.checked {
    border-color: #4CAF50;
    background: #f0fff0;
  }
`;

const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.checked ? '#4CAF50' : '#e8e8e8'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.checked ? '#4CAF50' : 'white'};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4CAF50;
  }
`;

const CheckboxIcon = styled.div<{ checked: boolean }>`
  color: white;
  font-size: 12px;
  font-weight: bold;
  opacity: ${props => props.checked ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const CheckboxText = styled.span`
  flex: 1;
  font-weight: 500;
`;

const CheckboxError = styled.div`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 8px;
  grid-column: 1 / -1;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #e8e8e8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7F8C8D;
  font-size: 0.9rem;
  margin-top: 10px;
  
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
`;



const PhoneInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CountrySelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #e8e8e8;
  border-right: none;
  border-radius: 8px 0 0 8px;
  background: #f8f9fa;
  cursor: pointer;
  min-width: 80px;
  
  &:hover {
    background: #e9ecef;
  }
`;

const CountryFlag = styled.span`
  font-size: 1.2rem;
`;

const CountryCode = styled.span`
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 500;
`;

const PhoneInput = styled.input`
  padding: 12px;
  border: 2px solid #e8e8e8;
  border-left: none;
  border-radius: 0 8px 8px 0;
  font-size: 1rem;
  flex: 1;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const CountryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const CountryOption = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const AddressAutocompleteContainer = styled.div`
  position: relative;
`;

const AddressInput = styled.input`
  padding: 12px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const AddressDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const AddressOption = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const AddressIcon = styled.div`
  color: #7F8C8D;
`;

const AddressText = styled.div`
  flex: 1;
`;

const AddressTitle = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
`;

const AddressSubtitle = styled.div`
  color: #7F8C8D;
  font-size: 0.8rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 4px;
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  font-size: 0.8rem;
  margin-top: 4px;
`;

// Datos de países para el selector de teléfono
const countries = [
  { code: 'ES', flag: '🇪🇸', dialCode: '+34', name: 'España' },
  { code: 'FR', flag: '🇫🇷', dialCode: '+33', name: 'Francia' },
  { code: 'IT', flag: '🇮🇹', dialCode: '+39', name: 'Italia' },
  { code: 'DE', flag: '🇩🇪', dialCode: '+49', name: 'Alemania' },
  { code: 'PT', flag: '🇵🇹', dialCode: '+351', name: 'Portugal' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44', name: 'Reino Unido' },
  { code: 'US', flag: '🇺🇸', dialCode: '+1', name: 'Estados Unidos' },
  { code: 'CA', flag: '🇨🇦', dialCode: '+1', name: 'Canadá' },
  { code: 'MX', flag: '🇲🇽', dialCode: '+52', name: 'México' },
  { code: 'AR', flag: '🇦🇷', dialCode: '+54', name: 'Argentina' },
  { code: 'BR', flag: '🇧🇷', dialCode: '+55', name: 'Brasil' },
  { code: 'CL', flag: '🇨🇱', dialCode: '+56', name: 'Chile' },
  { code: 'CO', flag: '🇨🇴', dialCode: '+57', name: 'Colombia' },
  { code: 'PE', flag: '🇵🇪', dialCode: '+51', name: 'Perú' },
  { code: 'VE', flag: '🇻🇪', dialCode: '+58', name: 'Venezuela' },
];

// Función para validar email con regex más estricto
const validateEmail = (email: string): boolean => {
  // Regex más estricto que previene inyecciones
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Función para validar teléfono con regex más estricto
const validatePhone = (phone: string): boolean => {
  // Limpiar el teléfono de caracteres especiales
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Validar formato internacional o nacional español
  const phoneRegex = /^(\+34|34)?[6789]\d{8}$/;
  return phoneRegex.test(cleanPhone);
};

// Función para sanitizar texto y prevenir XSS
const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, '') // Remover event handlers
    .trim()
    .substring(0, 1000); // Limitar longitud
};

// Función para validar URL
const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Función para simular búsqueda de direcciones
const searchAddresses = async (query: string): Promise<any[]> => {
  // Simulación de API de geocoding
  if (query.length < 3) return [];
  
  const mockAddresses = [
    {
      id: 1,
      title: 'Carrer de la Pau, Barcelona',
      subtitle: 'Barcelona, Cataluña, España',
      fullAddress: 'Carrer de la Pau, 08001 Barcelona, Cataluña, España'
    },
    {
      id: 2,
      title: 'Carrer de Gràcia, Barcelona',
      subtitle: 'Barcelona, Cataluña, España',
      fullAddress: 'Carrer de Gràcia, 08012 Barcelona, Cataluña, España'
    },
    {
      id: 3,
      title: 'Carrer de Sants, Barcelona',
      subtitle: 'Barcelona, Cataluña, España',
      fullAddress: 'Carrer de Sants, 08014 Barcelona, Cataluña, España'
    },
    {
      id: 4,
      title: 'Carrer de Provença, Barcelona',
      subtitle: 'Barcelona, Cataluña, España',
      fullAddress: 'Carrer de Provença, 08008 Barcelona, Cataluña, España'
    },
    {
      id: 5,
      title: 'Carrer de Balmes, Barcelona',
      subtitle: 'Barcelona, Cataluña, España',
      fullAddress: 'Carrer de Balmes, 08007 Barcelona, Cataluña, España'
    }
  ];
  
  // Filtrar por query
  return mockAddresses.filter(addr => 
    addr.title.toLowerCase().includes(query.toLowerCase()) ||
    addr.subtitle.toLowerCase().includes(query.toLowerCase())
  );
};

const MasiaSubmissionForm: React.FC<MasiaSubmissionFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Owner Information
    ownerName: '',
    ownerSurname: '',
    ownerEmail: '',
    ownerPhone: '',
    
    // Masia Information
    name: '',
    location: '',
    price: '',
    description: '',
    capacity: '',
    rating: '',
    image: '',
    url: '',
    
    // Features
    recommendations: [] as string[],
    features: [] as string[],
    amenities: [] as string[],
    activities: [] as string[],
    
    // Characteristics
    seasonality: [] as string[],
    petFriendly: false,
    familyFriendly: false,
    romantic: false,
    groupFriendly: false,
  });

  const [newRecommendation, setNewRecommendation] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newActivity, setNewActivity] = useState('');
  
  // Estados para validación
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');
  
  // Estados para selector de país
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  
  // Estados para autocompletado de dirección
  const [addressQuery, setAddressQuery] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    // Sanitizar texto para campos de texto
    if (typeof value === 'string' && ['name', 'description', 'location'].includes(field)) {
      value = sanitizeText(value);
    }
    
    // Validar URL
    if (field === 'url' && value && !validateUrl(value)) {
      return; // No actualizar si la URL no es válida
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddRecommendation = () => {
    if (newRecommendation.trim() && !formData.recommendations.includes(newRecommendation.trim())) {
      setFormData(prev => ({
        ...prev,
        recommendations: [...prev.recommendations, newRecommendation.trim()]
      }));
      setNewRecommendation('');
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleAddActivity = () => {
    if (newActivity.trim() && !formData.activities.includes(newActivity.trim())) {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, newActivity.trim()]
      }));
      setNewActivity('');
    }
  };

  const handleRemoveTag = (type: 'recommendations' | 'features' | 'amenities' | 'activities', tag: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(t => t !== tag)
    }));
  };

  const handleSubmit = () => {
    // Validaciones adicionales de seguridad
    if (!validateEmail(formData.ownerEmail)) {
      alert('Por favor, introduce un email válido');
      return;
    }
    
    if (!validatePhone(formData.ownerPhone)) {
      alert('Por favor, introduce un teléfono válido');
      return;
    }
    
    if (formData.url && !validateUrl(formData.url)) {
      alert('Por favor, introduce una URL válida');
      return;
    }
    
    // Procesar y limpiar todos los campos
    const processedData = {
      ...formData,
      // Limpiar y procesar campos de texto
      name: sanitizeText(formData.name?.trim() || ''),
      description: sanitizeText(formData.description?.trim() || ''),
      location: sanitizeText(formData.location?.trim() || ''),
      url: formData.url?.trim() || '',
      image: formData.image?.trim() || '',
      ownerName: sanitizeText(formData.ownerName?.trim() || ''),
      ownerSurname: sanitizeText(formData.ownerSurname?.trim() || ''),
      ownerEmail: formData.ownerEmail?.trim() || '',
      ownerPhone: formData.ownerPhone?.trim() || '',
      
      // Procesar campos numéricos
      price: parseFloat(formData.price) || 0,
      capacity: parseInt(formData.capacity) || 0,
      rating: parseFloat(formData.rating) || 0,
      
      // Procesar arrays y limpiar elementos vacíos
      recommendations: Array.isArray(formData.recommendations) 
        ? formData.recommendations.map(rec => sanitizeText(rec?.trim())).filter(Boolean)
        : [],
      features: Array.isArray(formData.features)
        ? formData.features.map(feat => sanitizeText(feat?.trim())).filter(Boolean)
        : [],
      amenities: Array.isArray(formData.amenities)
        ? formData.amenities.map(amenity => sanitizeText(amenity?.trim())).filter(Boolean)
        : [],
      activities: Array.isArray(formData.activities)
        ? formData.activities.map(activity => sanitizeText(activity?.trim())).filter(Boolean)
        : [],
      seasonality: Array.isArray(formData.seasonality)
        ? formData.seasonality.map(season => sanitizeText(season?.trim())).filter(Boolean)
        : [],
      
      // Procesar booleanos
      petFriendly: Boolean(formData.petFriendly),
      familyFriendly: Boolean(formData.familyFriendly),
      romantic: Boolean(formData.romantic),
      groupFriendly: Boolean(formData.groupFriendly),
      
      // Generar ID único
      id: `masia_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      
      // Establecer estado inicial como pendiente
      status: 'pending' as const
    };
    
    onSubmit(processedData);
  };

  // Función para validar email en tiempo real
  const handleEmailChange = (email: string) => {
    handleInputChange('ownerEmail', email);
    if (email && !validateEmail(email)) {
      setEmailError('Por favor, introduce un email válido');
    } else {
      setEmailError('');
    }
  };

  // Función para validar teléfono en tiempo real
  const handlePhoneChange = (phone: string) => {
    // Solo permitir números, +, espacios, guiones y paréntesis
    const cleanPhone = phone.replace(/[^\d\s\+\-\(\)]/g, '');
    handleInputChange('ownerPhone', cleanPhone);
    
    if (cleanPhone && !validatePhone(cleanPhone)) {
      setPhoneError('Por favor, introduce un teléfono válido');
    } else {
      setPhoneError('');
    }
  };

  // Función para manejar búsqueda de direcciones
  const handleAddressSearch = async (query: string) => {
    setAddressQuery(query);
    handleInputChange('location', query);
    
    if (query.length >= 3) {
      const suggestions = await searchAddresses(query);
      setAddressSuggestions(suggestions);
      setShowAddressDropdown(true);
    } else {
      setAddressSuggestions([]);
      setShowAddressDropdown(false);
    }
  };

  // Función para seleccionar dirección
  const handleAddressSelect = (address: any) => {
    setAddressQuery(address.fullAddress);
    handleInputChange('location', address.fullAddress);
    setShowAddressDropdown(false);
  };

  // Función para seleccionar país
  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const isFormValid = () => {
    const hasAtLeastOneSpecialFeature = formData.petFriendly || 
                                       formData.familyFriendly || 
                                       formData.romantic || 
                                       formData.groupFriendly;
    
    return formData.ownerName && 
           formData.ownerEmail && 
           validateEmail(formData.ownerEmail) &&
           formData.name && 
           formData.location &&
           hasAtLeastOneSpecialFeature;
  };

  return (
    <FormContainer>
      <Header>
        <HeaderLeft>
          <BackButton onClick={onBack}>
            <ArrowLeft size={20} />
            Volver
          </BackButton>
          <HeaderTitle>Registrar tu Masia</HeaderTitle>
        </HeaderLeft>
        <HeaderActions>
          <SubmitButton onClick={handleSubmit} disabled={!isFormValid()}>
            <Save size={20} />
            Enviar para Aprobación
          </SubmitButton>
          <CancelButton onClick={onBack}>
            <X size={20} />
            Cancelar
          </CancelButton>
        </HeaderActions>
      </Header>

      <MainContent>
        <EditorGrid>
          {/* Owner Information */}
          <Section>
            <SectionTitle>
              <Users size={20} />
              Información del Propietario
            </SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>Nombre *</Label>
            <Input
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleInputChange('ownerName', e.target.value)}
              placeholder="Tu nombre"
            />
          </FormGroup>
          <FormGroup>
            <Label>Apellidos *</Label>
            <Input
              type="text"
              value={formData.ownerSurname}
              onChange={(e) => handleInputChange('ownerSurname', e.target.value)}
              placeholder="Tus apellidos"
            />
          </FormGroup>
          <FormGroup>
            <Label>Email *</Label>
            <Input
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="tu@email.com"
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
            {formData.ownerEmail && !emailError && validateEmail(formData.ownerEmail) && (
              <SuccessMessage>✓ Email válido</SuccessMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Teléfono</Label>
            <PhoneInputContainer>
              <CountrySelector onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                <CountryFlag>{selectedCountry.flag}</CountryFlag>
                <CountryCode>{selectedCountry.dialCode}</CountryCode>
              </CountrySelector>
              <PhoneInput
                type="tel"
                value={formData.ownerPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="600 000 000"
              />
              {showCountryDropdown && (
                <CountryDropdown>
                  {countries.map((country) => (
                    <CountryOption
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                    >
                      <CountryFlag>{country.flag}</CountryFlag>
                      <CountryCode>{country.dialCode}</CountryCode>
                      <span>{country.name}</span>
                    </CountryOption>
                  ))}
                </CountryDropdown>
              )}
            </PhoneInputContainer>
            {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
            {formData.ownerPhone && !phoneError && validatePhone(formData.ownerPhone) && (
              <SuccessMessage>✓ Teléfono válido</SuccessMessage>
            )}
          </FormGroup>
                  </FormGrid>
        </Section>

        {/* Masia Basic Information */}
        <Section>
          <SectionTitle>
            <MapPin size={20} />
            Información de la Masia
          </SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>Nombre de la Masia *</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Nombre de tu masia"
            />
          </FormGroup>
          <FormGroup>
            <Label>Ubicación *</Label>
            <AddressAutocompleteContainer>
              <AddressInput
                type="text"
                value={addressQuery}
                onChange={(e) => handleAddressSearch(e.target.value)}
                placeholder="Buscar dirección..."
                onFocus={() => {
                  if (addressSuggestions.length > 0) {
                    setShowAddressDropdown(true);
                  }
                }}
                onBlur={() => {
                  // Delay para permitir hacer clic en las opciones
                  setTimeout(() => setShowAddressDropdown(false), 200);
                }}
              />
              {showAddressDropdown && addressSuggestions.length > 0 && (
                <AddressDropdown>
                  {addressSuggestions.map((address) => (
                    <AddressOption
                      key={address.id}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <AddressIcon>
                        <MapPin size={16} />
                      </AddressIcon>
                      <AddressText>
                        <AddressTitle>{address.title}</AddressTitle>
                        <AddressSubtitle>{address.subtitle}</AddressSubtitle>
                      </AddressText>
                    </AddressOption>
                  ))}
                </AddressDropdown>
              )}
            </AddressAutocompleteContainer>
          </FormGroup>
          <FormGroup>
            <Label>Precio por noche (€)</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="150"
            />
          </FormGroup>
          <FormGroup>
            <Label>Capacidad (personas)</Label>
            <Input
              type="number"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              placeholder="6"
            />
          </FormGroup>
          <FormGroup>
            <Label>URL de la web</Label>
            <Input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://tu-masia.com"
            />
          </FormGroup>
          <FormGroup>
            <Label>URL de imagen</Label>
            <Input
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </FormGroup>
        </FormGrid>
        
        <FormGroup style={{ marginTop: '20px' }}>
          <Label>Descripción</Label>
          <TextArea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe tu masia, su historia, características especiales..."
          />
        </FormGroup>
      </Section>
    </EditorGrid>

    <EditorGrid>
      {/* Features */}
      <Section>
        <SectionTitle>
          <Settings size={20} />
          Características y Servicios
        </SectionTitle>
        
        <FormGroup>
          <Label>Recomendaciones</Label>
          <TagInput>
            {formData.recommendations.map((tag, index) => (
              <Tag key={index}>
                {tag}
                <RemoveTag onClick={() => handleRemoveTag('recommendations', tag)}>
                  <X size={12} />
                </RemoveTag>
              </Tag>
            ))}
            <TagInputField
              value={newRecommendation}
              onChange={(e) => setNewRecommendation(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRecommendation();
                }
              }}
              placeholder="Añadir recomendación..."
            />
          </TagInput>
        </FormGroup>

        <FormGroup>
          <Label>Características</Label>
          <TagInput>
            {formData.features.map((tag, index) => (
              <Tag key={index}>
                {tag}
                <RemoveTag onClick={() => handleRemoveTag('features', tag)}>
                  <X size={12} />
                </RemoveTag>
              </Tag>
            ))}
            <TagInputField
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              placeholder="Añadir característica..."
            />
          </TagInput>
        </FormGroup>

        <FormGroup>
          <Label>Servicios</Label>
          <TagInput>
            {formData.amenities.map((tag, index) => (
              <Tag key={index}>
                {tag}
                <RemoveTag onClick={() => handleRemoveTag('amenities', tag)}>
                  <X size={12} />
                </RemoveTag>
              </Tag>
            ))}
            <TagInputField
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddAmenity();
                }
              }}
              placeholder="Añadir servicio..."
            />
          </TagInput>
        </FormGroup>

        <FormGroup>
          <Label>Actividades</Label>
          <TagInput>
            {formData.activities.map((tag, index) => (
              <Tag key={index}>
                {tag}
                <RemoveTag onClick={() => handleRemoveTag('activities', tag)}>
                  <X size={12} />
                </RemoveTag>
              </Tag>
            ))}
            <TagInputField
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddActivity();
                }
              }}
              placeholder="Añadir actividad..."
            />
          </TagInput>
        </FormGroup>
      </Section>

      {/* Characteristics */}
      <Section>
        <SectionTitle>
          <Settings size={20} />
          Características Especiales
        </SectionTitle>
        
        <FormGroup>
          <Label>Temporada</Label>
          <CheckboxGroup>
            {[
              { name: 'Primavera', emoji: '🌸' },
              { name: 'Verano', emoji: '☀️' },
              { name: 'Otoño', emoji: '🍂' },
              { name: 'Invierno', emoji: '❄️' }
            ].map((season) => (
              <CheckboxItem 
                key={season.name}
                className={formData.seasonality.includes(season.name) ? 'checked' : ''}
                onClick={() => {
                  if (formData.seasonality.includes(season.name)) {
                    handleInputChange('seasonality', formData.seasonality.filter(s => s !== season.name));
                  } else {
                    handleInputChange('seasonality', [...formData.seasonality, season.name]);
                  }
                }}
              >
                <CustomCheckbox checked={formData.seasonality.includes(season.name)}>
                  <CheckboxIcon checked={formData.seasonality.includes(season.name)}>✓</CheckboxIcon>
                </CustomCheckbox>
                <CheckboxText>{season.emoji} {season.name}</CheckboxText>
              </CheckboxItem>
            ))}
          </CheckboxGroup>
        </FormGroup>

        <FormGroup>
          <Label>Características Especiales *</Label>
          <CheckboxGroup>
            <CheckboxItem 
              className={formData.petFriendly ? 'checked' : ''}
              onClick={() => handleInputChange('petFriendly', !formData.petFriendly)}
            >
              <CustomCheckbox checked={formData.petFriendly}>
                <CheckboxIcon checked={formData.petFriendly}>✓</CheckboxIcon>
              </CustomCheckbox>
              <CheckboxText>🐕 Pet Friendly</CheckboxText>
            </CheckboxItem>
            <CheckboxItem 
              className={formData.familyFriendly ? 'checked' : ''}
              onClick={() => handleInputChange('familyFriendly', !formData.familyFriendly)}
            >
              <CustomCheckbox checked={formData.familyFriendly}>
                <CheckboxIcon checked={formData.familyFriendly}>✓</CheckboxIcon>
              </CustomCheckbox>
              <CheckboxText>👨‍👩‍👧‍👦 Familiar</CheckboxText>
            </CheckboxItem>
            <CheckboxItem 
              className={formData.romantic ? 'checked' : ''}
              onClick={() => handleInputChange('romantic', !formData.romantic)}
            >
              <CustomCheckbox checked={formData.romantic}>
                <CheckboxIcon checked={formData.romantic}>✓</CheckboxIcon>
              </CustomCheckbox>
              <CheckboxText>💕 Romántico</CheckboxText>
            </CheckboxItem>
            <CheckboxItem 
              className={formData.groupFriendly ? 'checked' : ''}
              onClick={() => handleInputChange('groupFriendly', !formData.groupFriendly)}
            >
              <CustomCheckbox checked={formData.groupFriendly}>
                <CheckboxIcon checked={formData.groupFriendly}>✓</CheckboxIcon>
              </CustomCheckbox>
              <CheckboxText>👥 Grupos</CheckboxText>
            </CheckboxItem>
          </CheckboxGroup>
          {!formData.petFriendly && !formData.familyFriendly && !formData.romantic && !formData.groupFriendly && (
            <CheckboxError>⚠️ Debes seleccionar al menos una característica especial</CheckboxError>
          )}
        </FormGroup>
      </Section>
    </EditorGrid>

    {/* Image Preview */}
    {formData.image && (
      <Section>
        <SectionTitle>
          <MapPin size={20} />
          Vista Previa de la Imagen
        </SectionTitle>
        <ImagePreview>
          <img src={formData.image} alt="Preview" onError={(e) => {
            e.currentTarget.style.display = 'none';
          }} />
        </ImagePreview>
      </Section>
    )}
      </MainContent>
    </FormContainer>
  );
};

export default MasiaSubmissionForm;
