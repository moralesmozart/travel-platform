import { masiasDB, Masia } from '../config/supabase';

// Función para filtrar masias según las preferencias del usuario
export const filterMasiasByPreferences = async (
  preferences: {
    seasons?: string[];
    experiences?: string[];
    companions?: string[];
    duration?: string;
    budget?: string;
  }
): Promise<Masia[]> => {
  try {
    // Obtener masías aprobadas de Supabase
    const approvedMasias = await masiasDB.getApprovedMasias();
    
    // Si no hay preferencias, devolver todas las masías aprobadas
    if (!preferences || Object.keys(preferences).length === 0) {
      return approvedMasias;
    }

    // Filtrar por presupuesto
    let filteredMasias = approvedMasias;

    if (preferences.budget) {
      switch (preferences.budget) {
        case 'budget':
          filteredMasias = filteredMasias.filter(masia => masia.price <= 100);
          break;
        case 'medium':
          filteredMasias = filteredMasias.filter(masia => masia.price > 100 && masia.price <= 150);
          break;
        case 'premium':
          filteredMasias = filteredMasias.filter(masia => masia.price > 150);
          break;
      }
    }

    // Filtrar por compañía
    if (preferences.companions && preferences.companions.length > 0) {
      if (preferences.companions.includes('solo')) {
        filteredMasias = filteredMasias.filter(masia => masia.capacity <= 4);
      }
      if (preferences.companions.includes('couple')) {
        filteredMasias = filteredMasias.filter(masia => masia.romantic);
      }
      if (preferences.companions.includes('family')) {
        filteredMasias = filteredMasias.filter(masia => masia.familyFriendly);
      }
      if (preferences.companions.includes('children')) {
        filteredMasias = filteredMasias.filter(masia => masia.familyFriendly);
      }
      if (preferences.companions.includes('pets')) {
        filteredMasias = filteredMasias.filter(masia => masia.petFriendly);
      }
      if (preferences.companions.includes('friends')) {
        filteredMasias = filteredMasias.filter(masia => masia.groupFriendly);
      }
    }

    // Filtrar por experiencias
    if (preferences.experiences && preferences.experiences.length > 0) {
      if (preferences.experiences.includes('nature')) {
        filteredMasias = filteredMasias.filter(masia => 
          masia.activities.some(activity => 
            ['Senderismo', 'Bicicleta', 'Observación de aves'].includes(activity)
          )
        );
      }
      if (preferences.experiences.includes('relax')) {
        filteredMasias = filteredMasias.filter(masia => 
          masia.amenities.some(amenity => 
            ['Jacuzzi', 'Terraza', 'Jardín'].includes(amenity)
          )
        );
      }
      if (preferences.experiences.includes('culture')) {
        filteredMasias = filteredMasias.filter(masia => 
          masia.activities.some(activity => 
            ['Visitas culturales', 'Visita al viñedo'].includes(activity)
          )
        );
      }
      if (preferences.experiences.includes('gourmet')) {
        filteredMasias = filteredMasias.filter(masia => 
          masia.activities.some(activity => 
            ['Cata de vinos', 'Clases de cocina', 'Gastronomía local'].includes(activity)
          )
        );
      }
    }

    // Si después del filtrado no hay masías, devolver todas las aprobadas como fallback
    if (filteredMasias.length === 0) {
      console.log('🔍 No se encontraron masías con las preferencias especificadas. Mostrando todas las masías aprobadas como fallback.');
      return approvedMasias;
    }

    return filteredMasias;
  } catch (error) {
    console.error('Error filtering masias:', error);
    // En caso de error, devolver todas las masías aprobadas como fallback
    try {
      const approvedMasias = await masiasDB.getApprovedMasias();
      return approvedMasias;
    } catch (fallbackError) {
      console.error('Error en fallback:', fallbackError);
      return [];
    }
  }
};

// Función para actualizar una masia en la base de datos
export const updateMasiaInDatabase = async (updatedMasia: Masia): Promise<boolean> => {
  try {
    const result = await masiasDB.updateMasia(updatedMasia);
    return result !== null;
  } catch (error) {
    console.error('Error updating masia:', error);
    return false;
  }
};

// Función para agregar una nueva masia a la base de datos
export const addMasiaToDatabase = async (newMasia: Omit<Masia, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
  try {
    const result = await masiasDB.addMasia(newMasia);
    return result !== null;
  } catch (error) {
    console.error('Error adding masia:', error);
    return false;
  }
};

// Exportar la interfaz Masia desde Supabase
export type { Masia } from '../config/supabase';
