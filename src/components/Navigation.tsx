import React, { useState } from 'react';
import styled from 'styled-components';
import HomePage from './HomePage';
import SeasonSelector from './SeasonSelector';
import ResultsPage from './ResultsPage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import MasiaSubmissionForm from './MasiaSubmissionForm';
import { filterMasiasByPreferences, addMasiaToDatabase } from '../data/masiasDatabase';
import { validateAdminCredentials } from '../config/auth';
import { loginRateLimiter } from '../utils/rateLimiter';
import RateLimitMonitor from './RateLimitMonitor';

const NavigationContainer = styled.div`
  min-height: 100vh;
`;

const Navigation: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'season-selector' | 'results' | 'admin-login' | 'admin-dashboard' | 'masia-submission'>('home');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [allSelections, setAllSelections] = useState<{[key: number]: string[]}>({});
  const [loginError, setLoginError] = useState<string>('');

  const handleFindMasia = () => {
    setCurrentPage('season-selector');
    setCurrentStep(1);
    setSelectedSeason('');
    setAllSelections({});
  };

  const handleSubmitMasia = () => {
    setCurrentPage('masia-submission');
  };

  const handleAdminLogin = () => {
    setCurrentPage('admin-login');
    setLoginError('');
  };

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
    console.log(`Opción seleccionada en paso ${currentStep}:`, season);
  };

  const handleContinue = () => {
    if (selectedSeason) {
      // Guardar selección actual
      setAllSelections(prev => ({
        ...prev,
        [currentStep]: prev[currentStep] ? [...prev[currentStep], selectedSeason] : [selectedSeason]
      }));
      
      setCurrentStep(prev => prev + 1);
      setSelectedSeason(''); // Reset selection for next step
      console.log('Continuando al siguiente paso...');
      
      if (currentStep >= 5) {
        // Quiz completado - ir a resultados
        console.log('Todas las selecciones:', allSelections);
        
        // Filtrar masias según las preferencias
        const preferences = {
          seasons: allSelections[1],
          experiences: allSelections[2],
          companions: allSelections[3],
          duration: allSelections[4]?.[0],
          budget: allSelections[5]?.[0]
        };
        
        console.log('Preferencias para filtrado:', preferences);
        setCurrentPage('results');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setSelectedSeason('');
    } else {
      setCurrentPage('home');
    }
  };

  const handleNewSearch = () => {
    setCurrentPage('home');
    setCurrentStep(1);
    setSelectedSeason('');
    setAllSelections({});
  };

  const handleBookNow = (masiaId: string) => {
    console.log('Reservando masia:', masiaId);
    // Aquí puedes agregar la lógica para ir a la página de reserva
  };

  const handleAdminAuth = (email: string, password: string) => {
    // Verificar rate limiting
    const rateLimitResult = loginRateLimiter.recordAttempt();
    
    if (!rateLimitResult.allowed) {
      const blockedUntil = rateLimitResult.blockedUntil;
      const remainingTime = blockedUntil ? Math.ceil((blockedUntil - Date.now()) / 1000 / 60) : 0;
      setLoginError(`Demasiados intentos fallidos. Intenta de nuevo en ${remainingTime} minutos.`);
      return;
    }

    // Validar credenciales usando la función de configuración
    if (validateAdminCredentials(email, password)) {
      // Login exitoso - resetear intentos
      loginRateLimiter.resetAttempts();
      setCurrentPage('admin-dashboard');
      setLoginError('');
    } else {
      // Login fallido - mostrar intentos restantes
      const remainingAttempts = rateLimitResult.remainingAttempts;
      setLoginError(`Credenciales incorrectas. Intentos restantes: ${remainingAttempts}.`);
    }
  };

  const handleAdminLogout = () => {
    setCurrentPage('home');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleMasiaSubmission = (masiaData: any) => {
    // Agregar la masia a la base de datos como pendiente
    addMasiaToDatabase({
      ...masiaData,
      status: 'pending',
      submittedBy: `${masiaData.ownerName} ${masiaData.ownerSurname}`,
      submittedAt: new Date().toISOString()
    });
    
    alert('¡Tu masia ha sido enviada para aprobación! Te contactaremos pronto.');
    setCurrentPage('home');
  };

  return (
    <NavigationContainer>
      {currentPage === 'home' ? (
        <HomePage onFindMasia={handleFindMasia} onAdminLogin={handleAdminLogin} onSubmitMasia={handleSubmitMasia} />
      ) : currentPage === 'season-selector' ? (
        <SeasonSelector
          currentStep={currentStep}
          totalSteps={5}
          onSeasonSelect={handleSeasonSelect}
          onContinue={handleContinue}
          onBack={handleBack}
          title="Quiz de Masias"
          subtitle="Encuentra tu masia perfecta"
          continueText="Continuar"
        />
      ) : currentPage === 'results' ? (
        <ResultsPage
          onNewSearch={handleNewSearch}
          onBookNow={handleBookNow}
          resultsCount={6}
        />
      ) : currentPage === 'admin-login' ? (
        <AdminLogin
          onLogin={handleAdminAuth}
          onBack={handleBackToHome}
          error={loginError}
        />
      ) : currentPage === 'admin-dashboard' ? (
        <AdminDashboard
          onLogout={handleAdminLogout}
          onBack={handleBackToHome}
        />
      ) : currentPage === 'masia-submission' ? (
        <MasiaSubmissionForm
          onBack={handleBackToHome}
          onSubmit={handleMasiaSubmission}
        />
      ) : null}
      
      {/* Monitor de Rate Limiting (solo en desarrollo) */}
      <RateLimitMonitor />
    </NavigationContainer>
  );
};

export default Navigation;
