import { supabase } from '../config/supabase';

export const debugSupabaseData = async () => {
  console.log('🔍 Diagnóstico completo de Supabase...');
  
  try {
    // 1. Verificar conexión básica
    console.log('1️⃣ Probando conexión básica...');
    const { data: testData, error: testError } = await supabase
      .from('masias')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.error('❌ Error de conexión:', testError);
      return;
    }
    
    console.log('✅ Conexión exitosa');
    
    // 2. Obtener todas las masías
    console.log('2️⃣ Obteniendo todas las masías...');
    const { data: allMasias, error: allError } = await supabase
      .from('masias')
      .select('*');
    
    if (allError) {
      console.error('❌ Error obteniendo masías:', allError);
      return;
    }
    
    console.log(`✅ ${allMasias.length} masías encontradas`);
    
    // 3. Mostrar detalles de cada masía
    console.log('3️⃣ Detalles de cada masía:');
    allMasias.forEach((masia, index) => {
      console.log(`   Masía ${index + 1}:`);
      console.log(`     - ID: ${masia.id}`);
      console.log(`     - Nombre: ${masia.name}`);
      console.log(`     - Estado: ${masia.status}`);
      console.log(`     - Precio: ${masia.price}`);
      console.log(`     - Ubicación: ${masia.location}`);
      console.log(`     - Imagen: ${masia.image ? '✅' : '❌'}`);
      console.log(`     - URL: ${masia.url ? '✅' : '❌'}`);
      console.log(`     - Recomendaciones: ${Array.isArray(masia.recommendations) ? masia.recommendations.length : '❌'}`);
      console.log(`     - Actividades: ${Array.isArray(masia.activities) ? masia.activities.length : '❌'}`);
      console.log(`     - Amenities: ${Array.isArray(masia.amenities) ? masia.amenities.length : '❌'}`);
      console.log(`     - Características: ${Array.isArray(masia.features) ? masia.features.length : '❌'}`);
      console.log(`     - Temporada: ${Array.isArray(masia.seasonality) ? masia.seasonality.length : '❌'}`);
      console.log(`     - Pet Friendly: ${masia.pet_friendly}`);
      console.log(`     - Family Friendly: ${masia.family_friendly}`);
      console.log(`     - Romantic: ${masia.romantic}`);
      console.log(`     - Group Friendly: ${masia.group_friendly}`);
      console.log('');
    });
    
    // 4. Verificar masías aprobadas
    console.log('4️⃣ Verificando masías aprobadas...');
    const { data: approvedMasias, error: approvedError } = await supabase
      .from('masias')
      .select('*')
      .eq('status', 'approved');
    
    if (approvedError) {
      console.error('❌ Error obteniendo masías aprobadas:', approvedError);
      return;
    }
    
    console.log(`✅ ${approvedMasias.length} masías aprobadas`);
    
    // 5. Verificar si hay problemas con campos requeridos
    console.log('5️⃣ Verificando campos requeridos...');
    const problematicMasias = allMasias.filter(masia => 
      !masia.name || 
      !masia.location || 
      !masia.description ||
      !masia.image ||
      !Array.isArray(masia.recommendations) ||
      !Array.isArray(masia.activities) ||
      !Array.isArray(masia.amenities) ||
      !Array.isArray(masia.features) ||
      !Array.isArray(masia.seasonality)
    );
    
    if (problematicMasias.length > 0) {
      console.log(`⚠️ ${problematicMasias.length} masías tienen campos faltantes:`);
      problematicMasias.forEach((masia, index) => {
        console.log(`   Problema ${index + 1} - ID: ${masia.id}`);
        if (!masia.name) console.log('     ❌ Nombre faltante');
        if (!masia.location) console.log('     ❌ Ubicación faltante');
        if (!masia.description) console.log('     ❌ Descripción faltante');
        if (!masia.image) console.log('     ❌ Imagen faltante');
        if (!Array.isArray(masia.recommendations)) console.log('     ❌ Recomendaciones no es array');
        if (!Array.isArray(masia.activities)) console.log('     ❌ Actividades no es array');
        if (!Array.isArray(masia.amenities)) console.log('     ❌ Amenities no es array');
        if (!Array.isArray(masia.features)) console.log('     ❌ Características no es array');
        if (!Array.isArray(masia.seasonality)) console.log('     ❌ Temporada no es array');
      });
    } else {
      console.log('✅ Todas las masías tienen los campos requeridos');
    }
    
    return {
      total: allMasias.length,
      approved: approvedMasias.length,
      problematic: problematicMasias.length,
      masias: allMasias
    };
    
  } catch (error) {
    console.error('❌ Error en diagnóstico:', error);
    return null;
  }
};
