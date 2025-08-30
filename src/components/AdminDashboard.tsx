import React, { useState } from 'react';
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
import { Masia, updateMasiaInDatabase, masiasDatabase } from '../data/masiasDatabase';
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

// Datos de ejemplo para masias pendientes
const pendingMasias: PendingMasia[] = [
  {
    id: 'pending-1',
    name: 'Masia Can Nou - Vista Panorámica',
    location: 'Girona, 1h 15min de Barcelona',
    price: 140,
    description: 'Nueva masia con vistas espectaculares a los Pirineos. Ideal para familias que buscan tranquilidad y naturaleza.',
    recommendations: ['Vistas panorámicas', 'Jardín privado', 'Cocina equipada'],
    rating: 0,
    capacity: 6,
    features: ['WiFi', 'Aparcamiento'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    url: 'https://masias-catalunya.com/can-nou',
    amenities: ['WiFi', 'Aparcamiento', 'Jardín', 'Terraza'],
    activities: ['Senderismo', 'Bicicleta', 'Observación de aves'],
    seasonality: ['Primavera', 'Verano', 'Otoño'],
    petFriendly: true,
    familyFriendly: true,
    romantic: false,
    groupFriendly: true,
    status: 'pending',
    submittedBy: 'maria.garcia@email.com',
    submittedAt: '2024-01-15T10:30:00Z',
    ownerName: 'María',
    ownerSurname: 'García',
    ownerEmail: 'maria.garcia@email.com',
    ownerPhone: '+34 600 123 456'
  },
  {
    id: 'pending-2',
    name: 'Masia El Rincón - Romance Rural',
    location: 'Tarragona, 45min de Barcelona',
    price: 180,
    description: 'Masía romántica perfecta para parejas. Ambiente íntimo con chimenea y terraza privada.',
    recommendations: ['Ambiente romántico', 'Chimenea', 'Terraza privada'],
    rating: 0,
    capacity: 2,
    features: ['Jacuzzi', 'Terraza privada'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    url: 'https://masias-catalunya.com/el-rincon',
    amenities: ['Jacuzzi', 'Terraza privada', 'Chimenea', 'WiFi'],
    activities: ['Masajes', 'Yoga', 'Cenas románticas'],
    seasonality: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
    petFriendly: false,
    familyFriendly: false,
    romantic: true,
    groupFriendly: false,
    status: 'pending',
    submittedBy: 'carlos.lopez@email.com',
    submittedAt: '2024-01-14T15:45:00Z',
    ownerName: 'Carlos',
    ownerSurname: 'López',
    ownerEmail: 'carlos.lopez@email.com',
    ownerPhone: '+34 600 789 012'
  }
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState<'total' | 'pending' | 'approved' | 'rejected'>('total');
  
  // Combinar masias de la base de datos con las pendientes de ejemplo
  const allMasias: PendingMasia[] = [
    ...pendingMasias, // Datos de ejemplo
    // Las masias de la base de datos principal que no tienen status se consideran como aprobadas
    ...masiasDatabase
      .filter(masia => !masia.status || masia.status === 'approved')
      .map(masia => ({
        ...masia,
        status: (masia.status as 'approved') || 'approved',
        submittedBy: masia.submittedBy || 'Sistema',
        submittedAt: masia.submittedAt || new Date().toISOString()
      })),
    // Agregar masias pendientes de la base de datos
    ...masiasDatabase
      .filter(masia => masia.status === 'pending')
      .map(masia => ({
        ...masia,
        status: 'pending' as const,
        submittedBy: masia.submittedBy || 'Usuario',
        submittedAt: masia.submittedAt || new Date().toISOString()
      }))
  ];
  
  const [masias, setMasias] = useState<PendingMasia[]>(allMasias);
  const [editingMasia, setEditingMasia] = useState<Masia | null>(null);

  const handleApprove = (masiaId: string) => {
    // Actualizar en la base de datos
    const masiaToUpdate = masias.find(m => m.id === masiaId);
    if (masiaToUpdate) {
      const updatedMasia = { ...masiaToUpdate, status: 'approved' as const };
      updateMasiaInDatabase(updatedMasia);
    }
    
    // Actualizar en el estado local
    setMasias(prev => prev.map(masia => 
      masia.id === masiaId ? { ...masia, status: 'approved' as const } : masia
    ));
    
    alert('Masia aprobada exitosamente');
  };

  const handleReject = (masiaId: string) => {
    // Actualizar en la base de datos
    const masiaToUpdate = masias.find(m => m.id === masiaId);
    if (masiaToUpdate) {
      const updatedMasia = { ...masiaToUpdate, status: 'rejected' as const };
      updateMasiaInDatabase(updatedMasia);
    }
    
    // Actualizar en el estado local
    setMasias(prev => prev.map(masia => 
      masia.id === masiaId ? { ...masia, status: 'rejected' as const } : masia
    ));
    
    alert('Masia rechazada');
  };

  const handleEdit = (masiaId: string) => {
    const masiaToEdit = masias.find(m => m.id === masiaId);
    if (masiaToEdit) {
      setEditingMasia(masiaToEdit);
    }
  };

  const handleSaveEdit = (updatedMasia: Masia) => {
    // Actualizar en la base de datos
    updateMasiaInDatabase(updatedMasia);
    
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

        {filteredMasias.length === 0 ? (
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
