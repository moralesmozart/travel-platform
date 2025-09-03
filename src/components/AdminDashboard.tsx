import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  LogOut, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Plus,
  Users,
  Home,
  AlertTriangle
} from 'lucide-react';
import { Masia, updateMasiaInDatabase } from '../data/masiasDatabase';
import { masiasDB } from '../config/supabase';
import MasiaEditor from './MasiaEditor';

interface AdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

interface PendingMasia extends Masia {
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
}

const DashboardContainer = styled.div`
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

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #E8E8E8;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7F8C8D;
  transition: all 0.2s;
  
  &:hover {
    background: #F8F9FA;
    color: #E74C3C;
    border-color: #E74C3C;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #E8E8E8;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StatTitle = styled.h3`
  font-size: 0.9rem;
  color: #7F8C8D;
  margin: 0;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2C3E50;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E8E8E8;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : '#7F8C8D'};
  border: none;
  padding: 12px 24px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#667eea' : '#F8F9FA'};
  }
`;

const MasiasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const MasiaCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #E8E8E8;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const MasiaImage = styled.div<{ image: string }>`
  height: 200px;
  background: url(${props => props.image}) center/cover;
  position: relative;
`;

const StatusBadge = styled.div<{ status: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'pending': return '#FFF3CD';
      case 'approved': return '#D4EDDA';
      case 'rejected': return '#F8D7DA';
      default: return '#E8E8E8';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#856404';
      case 'approved': return '#155724';
      case 'rejected': return '#721C24';
      default: return '#7F8C8D';
    }
  }};
`;

const MasiaContent = styled.div`
  padding: 20px;
`;

const MasiaTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 8px;
`;

const MasiaLocation = styled.p`
  color: #7F8C8D;
  font-size: 0.9rem;
  margin-bottom: 12px;
`;

const MasiaDescription = styled.p`
  color: #5D6D7E;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const MasiaMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.8rem;
  color: #7F8C8D;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: auto;
  padding-right: 4px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const ActionButton = styled.button<{ variant: 'approve' | 'reject' | 'edit' | 'view' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  
  ${props => {
    switch (props.variant) {
      case 'approve':
        return `
          background: #28A745;
          color: white;
          &:hover { background: #218838; }
        `;
      case 'reject':
        return `
          background: #DC3545;
          color: white;
          &:hover { background: #C82333; }
        `;
      case 'edit':
        return `
          background: #FFC107;
          color: #212529;
          &:hover { background: #E0A800; }
        `;
      case 'view':
        return `
          background: #17A2B8;
          color: white;
          &:hover { background: #138496; }
        `;
    }
  }}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #7F8C8D;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const OwnerInfo = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
  border-left: 4px solid #4CAF50;
`;

const OwnerInfoTitle = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const OwnerInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 0.8rem;
`;

const OwnerInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #7F8C8D;
`;

const OwnerInfoLabel = styled.span`
  font-weight: 500;
  color: #2c3e50;
`;

const ContactButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #45a049;
  }
`;

// Los datos ahora vienen completamente de Supabase

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState<'total' | 'pending' | 'approved' | 'rejected'>('total');
  const [masias, setMasias] = useState<PendingMasia[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar masías desde Supabase
  useEffect(() => {
    const loadMasias = async () => {
      try {
        setLoading(true);
        const allMasiasFromDB = await masiasDB.getAllMasias();
        console.log('📊 Masías cargadas desde Supabase en AdminDashboard:', allMasiasFromDB.length);
        
        const processedMasias = allMasiasFromDB.map(masia => ({
          ...masia,
          status: masia.status || 'approved',
          submittedBy: masia.submittedBy || 'Sistema',
          submittedAt: masia.submittedAt || new Date().toISOString()
        }));
        
        setMasias(processedMasias);
      } catch (error) {
        console.error('❌ Error loading masias from Supabase:', error);
        setMasias([]); // Sin fallback a datos de ejemplo
      } finally {
        setLoading(false);
      }
    };

    loadMasias();
  }, []);
  const [editingMasia, setEditingMasia] = useState<Masia | null>(null);

  const handleApprove = async (masiaId: string) => {
    // Encontrar la masía pendiente
    const masiaToUpdate = masias.find(m => m.id === masiaId);
    if (masiaToUpdate) {
      // Procesar y limpiar todos los campos
      const processedMasia = {
        ...masiaToUpdate,
        // Limpiar y procesar campos de texto
        name: masiaToUpdate.name?.trim() || '',
        location: masiaToUpdate.location?.trim() || '',
        description: masiaToUpdate.description?.trim() || '',
        url: masiaToUpdate.url?.trim() || '',
        image: masiaToUpdate.image?.trim() || '',
        
        // Procesar campos numéricos
        price: Number(masiaToUpdate.price) || 0,
        capacity: Number(masiaToUpdate.capacity) || 0,
        rating: Number(masiaToUpdate.rating) || 0,
        
        // Procesar arrays
        recommendations: Array.isArray(masiaToUpdate.recommendations) 
          ? masiaToUpdate.recommendations.map(rec => rec?.trim()).filter(Boolean)
          : [],
        features: Array.isArray(masiaToUpdate.features)
          ? masiaToUpdate.features.map(feat => feat?.trim()).filter(Boolean)
          : [],
        amenities: Array.isArray(masiaToUpdate.amenities)
          ? masiaToUpdate.amenities.map(amenity => amenity?.trim()).filter(Boolean)
          : [],
        activities: Array.isArray(masiaToUpdate.activities)
          ? masiaToUpdate.activities.map(activity => activity?.trim()).filter(Boolean)
          : [],
        seasonality: Array.isArray(masiaToUpdate.seasonality)
          ? masiaToUpdate.seasonality.map(season => season?.trim()).filter(Boolean)
          : [],
        
        // Procesar booleanos
        petFriendly: Boolean(masiaToUpdate.petFriendly),
        familyFriendly: Boolean(masiaToUpdate.familyFriendly),
        romantic: Boolean(masiaToUpdate.romantic),
        groupFriendly: Boolean(masiaToUpdate.groupFriendly),
        
        // Cambiar estado a aprobado
        status: 'approved' as const,
        
        // Mantener información de envío
        submittedBy: masiaToUpdate.submittedBy || 'Usuario',
        submittedAt: masiaToUpdate.submittedAt || new Date().toISOString(),
        
        // Mantener información del propietario
        ownerName: masiaToUpdate.ownerName?.trim() || '',
        ownerSurname: masiaToUpdate.ownerSurname?.trim() || '',
        ownerEmail: masiaToUpdate.ownerEmail?.trim() || '',
        ownerPhone: masiaToUpdate.ownerPhone?.trim() || ''
      };
      
      // Actualizar en Supabase
      const success = await updateMasiaInDatabase(processedMasia);
      
      if (success) {
        // Actualizar en el estado local
        setMasias(prev => prev.map(masia => 
          masia.id === masiaId ? processedMasia : masia
        ));
        alert('Masia aprobada exitosamente. Todos los datos han sido procesados y guardados.');
      } else {
        alert('Error al aprobar la masía. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleReject = async (masiaId: string) => {
    // Encontrar la masía pendiente
    const masiaToUpdate = masias.find(m => m.id === masiaId);
    if (masiaToUpdate) {
      // Procesar y limpiar todos los campos antes de rechazar
      const processedMasia = {
        ...masiaToUpdate,
        // Limpiar y procesar campos de texto
        name: masiaToUpdate.name?.trim() || '',
        location: masiaToUpdate.location?.trim() || '',
        description: masiaToUpdate.description?.trim() || '',
        url: masiaToUpdate.url?.trim() || '',
        image: masiaToUpdate.image?.trim() || '',
        
        // Procesar campos numéricos
        price: Number(masiaToUpdate.price) || 0,
        capacity: Number(masiaToUpdate.capacity) || 0,
        rating: Number(masiaToUpdate.rating) || 0,
        
        // Procesar arrays
        recommendations: Array.isArray(masiaToUpdate.recommendations) 
          ? masiaToUpdate.recommendations.map(rec => rec?.trim()).filter(Boolean)
          : [],
        features: Array.isArray(masiaToUpdate.features)
          ? masiaToUpdate.features.map(feat => feat?.trim()).filter(Boolean)
          : [],
        amenities: Array.isArray(masiaToUpdate.amenities)
          ? masiaToUpdate.amenities.map(amenity => amenity?.trim()).filter(Boolean)
          : [],
        activities: Array.isArray(masiaToUpdate.activities)
          ? masiaToUpdate.activities.map(activity => activity?.trim()).filter(Boolean)
          : [],
        seasonality: Array.isArray(masiaToUpdate.seasonality)
          ? masiaToUpdate.seasonality.map(season => season?.trim()).filter(Boolean)
          : [],
        
        // Procesar booleanos
        petFriendly: Boolean(masiaToUpdate.petFriendly),
        familyFriendly: Boolean(masiaToUpdate.familyFriendly),
        romantic: Boolean(masiaToUpdate.romantic),
        groupFriendly: Boolean(masiaToUpdate.groupFriendly),
        
        // Cambiar estado a rechazado
        status: 'rejected' as const,
        
        // Mantener información de envío
        submittedBy: masiaToUpdate.submittedBy || 'Usuario',
        submittedAt: masiaToUpdate.submittedAt || new Date().toISOString(),
        
        // Mantener información del propietario
        ownerName: masiaToUpdate.ownerName?.trim() || '',
        ownerSurname: masiaToUpdate.ownerSurname?.trim() || '',
        ownerEmail: masiaToUpdate.ownerEmail?.trim() || '',
        ownerPhone: masiaToUpdate.ownerPhone?.trim() || ''
      };
      
      // Actualizar en Supabase
      const success = await updateMasiaInDatabase(processedMasia);
      
      if (success) {
        // Actualizar en el estado local
        setMasias(prev => prev.map(masia => 
          masia.id === masiaId ? processedMasia : masia
        ));
        alert('Masia rechazada. Los datos han sido procesados y guardados.');
      } else {
        alert('Error al rechazar la masía. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleEdit = (masiaId: string) => {
    const masiaToEdit = masias.find(m => m.id === masiaId);
    if (masiaToEdit) {
      setEditingMasia(masiaToEdit);
    }
  };

  const handleSaveEdit = async (updatedMasia: Masia) => {
    // Actualizar en Supabase
    const success = await updateMasiaInDatabase(updatedMasia);
    
    // Actualizar en el estado local
    setMasias(prev => prev.map(masia => 
      masia.id === updatedMasia.id ? { ...updatedMasia, status: masia.status, submittedBy: masia.submittedBy, submittedAt: masia.submittedAt } : masia
    ));
    setEditingMasia(null);
    
    // Mostrar confirmación
    alert('Masia actualizada exitosamente en la base de datos');
  };

  const handleCancelEdit = () => {
    setEditingMasia(null);
  };

  const handleContactOwner = (masia: PendingMasia) => {
    const contactInfo = `
Propietario: ${masia.ownerName} ${masia.ownerSurname}
Email: ${masia.ownerEmail}
Teléfono: ${masia.ownerPhone}
Masia: ${masia.name}
Ubicación: ${masia.location}
    `;
    
    // Copiar directamente al portapapeles
    navigator.clipboard.writeText(contactInfo).then(() => {
      alert('Información de contacto copiada al portapapeles:\n\n' + contactInfo);
    }).catch(() => {
      alert('Error al copiar al portapapeles. Información de contacto:\n\n' + contactInfo);
    });
  };

  const filteredMasias = activeTab === 'total' 
    ? masias 
    : masias.filter(masia => masia.status === activeTab);

  const stats = {
    total: masias.length,
    pending: masias.filter(m => m.status === 'pending').length,
    approved: masias.filter(m => m.status === 'approved').length,
    rejected: masias.filter(m => m.status === 'rejected').length
  };

  if (editingMasia) {
    return (
      <MasiaEditor
        masia={editingMasia}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderLeft>
          <Logo>🏠 MasiaConnect Admin</Logo>
        </HeaderLeft>
        <HeaderRight>
          <LogoutButton onClick={onLogout}>
            <LogOut size={16} />
            Cerrar Sesión
          </LogoutButton>
        </HeaderRight>
      </Header>

      <MainContent>
        <StatsGrid>
          <StatCard>
            <StatHeader>
              <StatIcon color="#667eea">
                <Home size={20} />
              </StatIcon>
              <div>
                <StatTitle>Total Masias</StatTitle>
                <StatValue>{stats.total}</StatValue>
              </div>
            </StatHeader>
          </StatCard>
          
          <StatCard>
            <StatHeader>
              <StatIcon color="#FFC107">
                <AlertTriangle size={20} />
              </StatIcon>
              <div>
                <StatTitle>Pendientes</StatTitle>
                <StatValue>{stats.pending}</StatValue>
              </div>
            </StatHeader>
          </StatCard>
          
          <StatCard>
            <StatHeader>
              <StatIcon color="#28A745">
                <CheckCircle size={20} />
              </StatIcon>
              <div>
                <StatTitle>Aprobadas</StatTitle>
                <StatValue>{stats.approved}</StatValue>
              </div>
            </StatHeader>
          </StatCard>
          
          <StatCard>
            <StatHeader>
              <StatIcon color="#DC3545">
                <XCircle size={20} />
              </StatIcon>
              <div>
                <StatTitle>Rechazadas</StatTitle>
                <StatValue>{stats.rejected}</StatValue>
              </div>
            </StatHeader>
          </StatCard>
        </StatsGrid>

        <SectionTitle>
          <Settings size={24} />
          Gestión de Masias
        </SectionTitle>

        <TabsContainer>
          <Tab 
            active={activeTab === 'total'} 
            onClick={() => setActiveTab('total')}
          >
            Total Masias ({stats.total})
          </Tab>
          <Tab 
            active={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')}
          >
            Pendientes ({stats.pending})
          </Tab>
          <Tab 
            active={activeTab === 'approved'} 
            onClick={() => setActiveTab('approved')}
          >
            Aprobadas ({stats.approved})
          </Tab>
          <Tab 
            active={activeTab === 'rejected'} 
            onClick={() => setActiveTab('rejected')}
          >
            Rechazadas ({stats.rejected})
          </Tab>
        </TabsContainer>

        {loading ? (
          <EmptyState>
            <EmptyStateIcon>⏳</EmptyStateIcon>
            <h3>Cargando masías desde Supabase...</h3>
            <p>Espera un momento mientras se cargan los datos.</p>
          </EmptyState>
        ) : filteredMasias.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>📭</EmptyStateIcon>
            <h3>No hay masias {activeTab === 'total' ? 'en total' : activeTab === 'pending' ? 'pendientes' : activeTab === 'approved' ? 'aprobadas' : 'rechazadas'}</h3>
            <p>Cuando lleguen nuevas solicitudes, aparecerán aquí.</p>
          </EmptyState>
        ) : (
          <MasiasGrid>
            {filteredMasias.map((masia) => (
              <MasiaCard key={masia.id}>
                <MasiaImage image={masia.image}>
                  <StatusBadge status={masia.status}>
                    {masia.status === 'pending' ? 'Pendiente' : 
                     masia.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                  </StatusBadge>
                </MasiaImage>
                
                <MasiaContent>
                  <MasiaTitle>{masia.name}</MasiaTitle>
                  <MasiaLocation>{masia.location}</MasiaLocation>
                  <MasiaDescription>{masia.description}</MasiaDescription>
                  
                  <MasiaMeta>
                    <span>€{masia.price}/noche</span>
                    <span>Enviado por: {masia.submittedBy}</span>
                  </MasiaMeta>
                  
                  {/* Mostrar información simplificada del propietario solo para masias pendientes */}
                  {masia.status === 'pending' && masia.ownerName && (
                    <OwnerInfo>
                      <OwnerInfoTitle>📞 Información de Contacto</OwnerInfoTitle>
                      <OwnerInfoGrid>
                        <OwnerInfoItem>
                          <OwnerInfoLabel>Email:</OwnerInfoLabel>
                          {masia.ownerEmail}
                        </OwnerInfoItem>
                        <OwnerInfoItem>
                          <OwnerInfoLabel>Teléfono:</OwnerInfoLabel>
                          {masia.ownerPhone}
                        </OwnerInfoItem>
                        <OwnerInfoItem>
                          <OwnerInfoLabel>Enviado:</OwnerInfoLabel>
                          {new Date(masia.submittedAt).toLocaleDateString('es-ES')}
                        </OwnerInfoItem>
                      </OwnerInfoGrid>
                      <ContactButton onClick={() => handleContactOwner(masia)}>
                        📋 Copiar Información de Contacto
                      </ContactButton>
                    </OwnerInfo>
                  )}
                  
                  <ActionButtons>
                    {masia.status === 'pending' && (
                      <>
                        <ActionButton variant="approve" onClick={() => handleApprove(masia.id)}>
                          <CheckCircle size={14} />
                          Aprobar
                        </ActionButton>
                        <ActionButton variant="reject" onClick={() => handleReject(masia.id)}>
                          <XCircle size={14} />
                          Rechazar
                        </ActionButton>
                      </>
                    )}
                                         <ActionButton variant="edit" onClick={() => handleEdit(masia.id)}>
                       <Edit size={14} />
                       Editar
                     </ActionButton>
                  </ActionButtons>
                </MasiaContent>
              </MasiaCard>
            ))}
          </MasiasGrid>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
