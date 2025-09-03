import { supabase } from '../config/supabase';

export const testMasiaSubmission = async () => {
  console.log('🧪 Probando envío de masía...');
  
  try {
    // Datos de prueba que coinciden exactamente con el esquema
    const testMasia = {
      name: 'Test Masia Submission',
      location: 'Test Location',
      description: 'Test Description',
      price: 100,
      capacity: 4,
      rating: 4.5,
      image: 'https://example.com/image.jpg',
      url: 'https://example.com',
      recommendations: ['Test Recommendation'],
      features: ['Test Feature'],
      amenities: ['Test Amenity'],
      activities: ['Test Activity'],
      seasonality: ['Test Season'],
      pet_friendly: false,
      family_friendly: true,
      romantic: false,
      group_friendly: true,
      owner_name: 'Test Owner',
      owner_surname: 'Test Surname',
      owner_email: 'test@example.com',
      owner_phone: '+1234567890',
      status: 'pending',
      submitted_by: 'Test User',
      submitted_at: new Date().toISOString()
    };

    console.log('📝 Datos de prueba:', testMasia);
    
    // Prueba directa con Supabase
    console.log('🔗 Enviando a Supabase...');
    const { data, error } = await supabase
      .from('masias')
      .insert([testMasia])
      .select()
      .single();

    if (error) {
      console.error('❌ Error en inserción:', error);
      console.log('🔍 Detalles del error:');
      console.log('  - Código:', error.code);
      console.log('  - Mensaje:', error.message);
      console.log('  - Detalles:', error.details);
      console.log('  - Hint:', error.hint);
      return false;
    }

    console.log('✅ Inserción exitosa');
    console.log('📊 Masía insertada:', data);
    
    // Limpiar la masía de prueba
    if (data) {
      await supabase
        .from('masias')
        .delete()
        .eq('id', data.id);
      console.log('🧹 Masía de prueba eliminada');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Error inesperado:', error);
    return false;
  }
};

export const testMasiaSubmissionWithFormData = async (formData: any) => {
  console.log('🧪 Probando envío con datos del formulario...');
  console.log('📝 Datos del formulario:', formData);
  
  try {
    // Convertir datos del formulario al formato de la base de datos
    const dbData = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      capacity: parseInt(formData.capacity) || 0,
      rating: parseFloat(formData.rating) || 0,
      image: formData.image || '',
      url: formData.url || '',
      recommendations: Array.isArray(formData.recommendations) ? formData.recommendations : [],
      features: Array.isArray(formData.features) ? formData.features : [],
      amenities: Array.isArray(formData.amenities) ? formData.amenities : [],
      activities: Array.isArray(formData.activities) ? formData.activities : [],
      seasonality: Array.isArray(formData.seasonality) ? formData.seasonality : [],
      pet_friendly: Boolean(formData.petFriendly),
      family_friendly: Boolean(formData.familyFriendly),
      romantic: Boolean(formData.romantic),
      group_friendly: Boolean(formData.groupFriendly),
      owner_name: formData.ownerName,
      owner_surname: formData.ownerSurname,
      owner_email: formData.ownerEmail,
      owner_phone: formData.ownerPhone,
      status: 'pending',
      submitted_by: `${formData.ownerName} ${formData.ownerSurname}`,
      submitted_at: new Date().toISOString()
    };

    console.log('🔄 Datos convertidos para DB:', dbData);
    
    const { data, error } = await supabase
      .from('masias')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('❌ Error en inserción con datos del formulario:', error);
      console.log('🔍 Detalles del error:');
      console.log('  - Código:', error.code);
      console.log('  - Mensaje:', error.message);
      console.log('  - Detalles:', error.details);
      console.log('  - Hint:', error.hint);
      return false;
    }

    console.log('✅ Inserción con datos del formulario exitosa');
    console.log('📊 Masía insertada:', data);
    
    // Limpiar la masía de prueba
    if (data) {
      await supabase
        .from('masias')
        .delete()
        .eq('id', data.id);
      console.log('🧹 Masía de prueba eliminada');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Error inesperado:', error);
    return false;
  }
};
