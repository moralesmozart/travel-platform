import { supabase, masiasDB } from '../config/supabase';

export const verifySupabaseSetup = async () => {
  console.log('🔍 Verificando configuración de Supabase...');
  
  try {
    // 1. Verificar variables de entorno
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    
    console.log('📋 Variables de entorno:');
    console.log('  - URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante');
    console.log('  - Key:', supabaseKey ? '✅ Configurada' : '❌ Faltante');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Variables de entorno no configuradas');
    }
    
    // 2. Verificar conexión básica
    console.log('🔌 Probando conexión...');
    const { error: testError } = await supabase
      .from('masias')
      .select('count')
      .limit(1);
    
    if (testError) {
      throw new Error(`Error de conexión: ${testError.message}`);
    }
    
    console.log('✅ Conexión exitosa');
    
    // 3. Obtener todas las masías
    console.log('📊 Obteniendo masías...');
    const allMasias = await masiasDB.getAllMasias();
    console.log(`✅ ${allMasias.length} masías encontradas en total`);
    
    // 4. Obtener masías aprobadas
    const approvedMasias = await masiasDB.getApprovedMasias();
    console.log(`✅ ${approvedMasias.length} masías aprobadas`);
    
    // 5. Mostrar estadísticas
    const stats = {
      total: allMasias.length,
      approved: approvedMasias.length,
      pending: allMasias.filter(m => m.status === 'pending').length,
      rejected: allMasias.filter(m => m.status === 'rejected').length
    };
    
    console.log('📈 Estadísticas:');
    console.log('  - Total:', stats.total);
    console.log('  - Aprobadas:', stats.approved);
    console.log('  - Pendientes:', stats.pending);
    console.log('  - Rechazadas:', stats.rejected);
    
    // 6. Verificar estructura de datos
    if (allMasias.length > 0) {
      const sampleMasia = allMasias[0];
      console.log('🔍 Estructura de datos (primer registro):');
      console.log('  - ID:', sampleMasia.id);
      console.log('  - Nombre:', sampleMasia.name);
      console.log('  - Estado:', sampleMasia.status);
      console.log('  - Precio:', sampleMasia.price);
    }
    
    console.log('🎉 Verificación completada exitosamente');
    return {
      success: true,
      stats,
      allMasias,
      approvedMasias
    };
    
  } catch (error) {
    console.error('❌ Error en la verificación:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

// Función para verificar en producción
export const verifyProductionSetup = () => {
  console.log('🌐 Verificando configuración de producción...');
  
  const isProduction = window.location.hostname !== 'localhost';
  console.log('  - Entorno:', isProduction ? 'Producción' : 'Desarrollo');
  console.log('  - URL actual:', window.location.href);
  
  // Verificar que las variables de entorno están disponibles
  const hasEnvVars = !!(process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY);
  console.log('  - Variables de entorno:', hasEnvVars ? '✅ Disponibles' : '❌ No disponibles');
  
  return {
    isProduction,
    hasEnvVars,
    currentUrl: window.location.href
  };
};
