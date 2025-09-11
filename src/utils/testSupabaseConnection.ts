// Test Supabase Connection and RLS Policies
// Usar en la consola del navegador para diagnosticar problemas

import { supabase } from '../config/supabase';

export const testSupabaseConnection = async () => {
  console.log('🔍 Probando conexión a Supabase...');
  
  try {
    // Test 1: Conexión básica
    console.log('📡 Test 1: Verificando conexión...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('masias')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      console.error('❌ Error de conexión:', connectionError);
      return false;
    }
    
    console.log('✅ Conexión exitosa a Supabase');
    
    // Test 2: Lectura de masías aprobadas
    console.log('📖 Test 2: Probando lectura de masías...');
    const { data: readTest, error: readError } = await supabase
      .from('masias')
      .select('*')
      .eq('status', 'approved')
      .limit(1);
    
    if (readError) {
      console.error('❌ Error de lectura:', readError);
      console.log('💡 Posible problema de RLS - políticas de SELECT');
    } else {
      console.log('✅ Lectura exitosa:', readTest?.length || 0, 'masías encontradas');
    }
    
    // Test 3: Inserción de prueba (masía temporal)
    console.log('✏️  Test 3: Probando inserción...');
    const testMasia = {
      name: 'Test Masia - ' + new Date().toISOString(),
      location: 'Test Location',
      description: 'Test Description',
      price: 100,
      capacity: 4,
      rating: 4.0,
      image: 'https://via.placeholder.com/400x300',
      url: 'https://test.com',
      recommendations: ['Test'],
      features: ['Test Feature'],
      amenities: ['Test Amenity'],
      activities: ['Test Activity'],
      seasonality: ['Test Season'],
      pet_friendly: true,
      family_friendly: true,
      romantic: false,
      group_friendly: true,
      owner_name: 'Test Owner',
      owner_surname: 'Test Surname',
      owner_email: 'test@test.com',
      owner_phone: '+34 600 000 000',
      status: 'pending',
      submitted_by: 'Test User',
      submitted_at: new Date().toISOString()
    };
    
    const { data: insertTest, error: insertError } = await supabase
      .from('masias')
      .insert([testMasia])
      .select();
    
    if (insertError) {
      console.error('❌ Error de inserción:', insertError);
      
      if (insertError.code === '42501') {
        console.log('🚨 PROBLEMA DE RLS DETECTADO!');
        console.log('💡 Solución: Ejecutar script SQL para corregir políticas de RLS');
        console.log('📁 Ver archivo: RLS_FIX_INSTRUCTIONS.md');
      }
    } else {
      console.log('✅ Inserción exitosa:', insertTest);
      
      // Limpiar masía de prueba
      if (insertTest && insertTest[0]) {
        const { error: deleteError } = await supabase
          .from('masias')
          .delete()
          .eq('id', insertTest[0].id);
        
        if (deleteError) {
          console.log('⚠️  No se pudo limpiar masía de prueba:', deleteError);
        } else {
          console.log('🧹 Masía de prueba limpiada');
        }
      }
    }
    
    return true;
    
  } catch (error) {
    console.error('💥 Error general:', error);
    return false;
  }
};

// Función para ejecutar desde la consola del navegador
export const runSupabaseTest = () => {
  console.log('🚀 Ejecutando test completo de Supabase...');
  testSupabaseConnection().then(success => {
    if (success) {
      console.log('🎉 Test completado exitosamente');
    } else {
      console.log('❌ Test falló - Revisar errores arriba');
    }
  });
};

// Función para probar solo la conexión
export const testConnectionOnly = async () => {
  try {
    const { data, error } = await supabase
      .from('masias')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error);
      return false;
    }
    
    console.log('✅ Conexión exitosa a Supabase');
    return true;
  } catch (error) {
    console.error('💥 Error:', error);
    return false;
  }
};

// Exportar para uso en consola del navegador
if (typeof window !== 'undefined') {
  (window as any).testSupabase = {
    testConnection: testSupabaseConnection,
    testConnectionOnly,
    runTest: runSupabaseTest
  };
  
  console.log('🔧 Test de Supabase disponible en: window.testSupabase');
  console.log('📝 Comandos disponibles:');
  console.log('   - window.testSupabase.testConnection()');
  console.log('   - window.testSupabase.testConnectionOnly()');
  console.log('   - window.testSupabase.runTest()');
}
