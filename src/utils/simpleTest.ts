import { supabase } from '../config/supabase';

export const simpleSupabaseTest = async () => {
  console.log('🧪 Prueba simple de Supabase...');
  
  try {
    // Prueba 1: Verificar variables de entorno
    console.log('1️⃣ Variables de entorno:');
    console.log('  - URL:', process.env.REACT_APP_SUPABASE_URL ? '✅' : '❌');
    console.log('  - KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY ? '✅' : '❌');
    
    // Prueba 2: Verificar cliente
    console.log('2️⃣ Cliente Supabase:');
    console.log('  - Cliente creado:', supabase ? '✅' : '❌');
    
    // Prueba 3: Consulta simple
    console.log('3️⃣ Consulta simple...');
    const { data, error } = await supabase
      .from('masias')
      .select('id, name, status')
      .limit(1);
    
    if (error) {
      console.error('❌ Error en consulta:', error);
      console.log('🔍 Detalles del error:');
      console.log('  - Código:', error.code);
      console.log('  - Mensaje:', error.message);
      console.log('  - Detalles:', error.details);
      return false;
    }
    
    console.log('✅ Consulta exitosa');
    console.log('📊 Datos recibidos:', data);
    console.log('📊 Número de registros:', data?.length || 0);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error inesperado:', error);
    return false;
  }
};
