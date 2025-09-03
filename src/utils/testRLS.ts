import { supabase } from '../config/supabase';

export const testRLSPolicies = async () => {
  console.log('🔒 Probando políticas RLS...');
  
  try {
    // Prueba 1: Intentar leer sin autenticación
    console.log('1️⃣ Probando lectura sin autenticación...');
    const { data: publicData, error: publicError } = await supabase
      .from('masias')
      .select('*')
      .eq('status', 'approved');
    
    if (publicError) {
      console.error('❌ Error leyendo masías aprobadas:', publicError);
      console.log('🔍 Código de error:', publicError.code);
      console.log('🔍 Mensaje:', publicError.message);
    } else {
      console.log('✅ Lectura pública exitosa');
      console.log('📊 Masías aprobadas encontradas:', publicData?.length || 0);
    }
    
    // Prueba 2: Intentar leer todas las masías
    console.log('2️⃣ Probando lectura de todas las masías...');
    const { data: allData, error: allError } = await supabase
      .from('masias')
      .select('*');
    
    if (allError) {
      console.error('❌ Error leyendo todas las masías:', allError);
      console.log('🔍 Código de error:', allError.code);
      console.log('🔍 Mensaje:', allError.message);
    } else {
      console.log('✅ Lectura completa exitosa');
      console.log('📊 Total de masías encontradas:', allData?.length || 0);
    }
    
    // Prueba 3: Intentar insertar una masía de prueba
    console.log('3️⃣ Probando inserción...');
    const testMasia = {
      name: 'Test Masia',
      location: 'Test Location',
      description: 'Test Description',
      price: 100,
      capacity: 4,
      rating: 4.5,
      image: 'https://example.com/image.jpg',
      url: 'https://example.com',
      recommendations: ['Test'],
      features: ['Test'],
      amenities: ['Test'],
      activities: ['Test'],
      seasonality: ['Test'],
      pet_friendly: false,
      family_friendly: true,
      romantic: false,
      group_friendly: true,
      owner_name: 'Test Owner',
      owner_surname: 'Test Surname',
      owner_email: 'test@example.com',
      owner_phone: '+1234567890',
      status: 'pending',
      submitted_by: 'Test User'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('masias')
      .insert([testMasia])
      .select();
    
    if (insertError) {
      console.error('❌ Error insertando masía:', insertError);
      console.log('🔍 Código de error:', insertError.code);
      console.log('🔍 Mensaje:', insertError.message);
    } else {
      console.log('✅ Inserción exitosa');
      console.log('📊 Masía insertada:', insertData);
      
      // Limpiar la masía de prueba
      if (insertData && insertData[0]) {
        await supabase
          .from('masias')
          .delete()
          .eq('id', insertData[0].id);
        console.log('🧹 Masía de prueba eliminada');
      }
    }
    
    return {
      publicRead: !publicError,
      allRead: !allError,
      insert: !insertError,
      publicCount: publicData?.length || 0,
      allCount: allData?.length || 0
    };
    
  } catch (error) {
    console.error('❌ Error en prueba RLS:', error);
    return null;
  }
};
