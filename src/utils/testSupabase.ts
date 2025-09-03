import { supabase } from '../config/supabase';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Probando conexión con Supabase...');
    
    // Probar conexión básica
    const { data, error } = await supabase
      .from('masias')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error);
      return false;
    }
    
    console.log('✅ Conexión exitosa con Supabase');
    console.log('📊 Datos recibidos:', data);
    return true;
  } catch (error) {
    console.error('❌ Error inesperado:', error);
    return false;
  }
};

// Función para verificar las variables de entorno
export const checkEnvironmentVariables = () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  
  console.log('🔧 Verificando variables de entorno...');
  console.log('URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante');
  console.log('Key:', supabaseKey ? '✅ Configurada' : '❌ Faltante');
  
  return !!(supabaseUrl && supabaseKey);
};
