export interface Masia {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  recommendations: string[];
  rating: number;
  capacity: number;
  features: string[];
  image: string;
  url: string;
  amenities: string[];
  activities: string[];
  seasonality: string[];
  petFriendly: boolean;
  familyFriendly: boolean;
  romantic: boolean;
  groupFriendly: boolean;
  // Información del propietario para masias pendientes
  ownerName?: string;
  ownerSurname?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  status?: 'pending' | 'approved' | 'rejected';
  submittedBy?: string;
  submittedAt?: string;
}

export const masiasDatabase: Masia[] = [
  {
    id: '1',
    name: 'Masia Can Torrents - El Refugio de los Abuelos',
    location: 'Penedès, 45min de Barcelona',
    price: 120,
    description: 'Construida en 1847 por los bisabuelos de María, esta masia preserva la esencia catalana. La familia Torrents cultivó viñedos durante cinco generaciones, y hoy María mantiene viva la tradición, ofreciendo catas de los vinos de la casa y contando historias junto a la chimenea centenaria.',
    recommendations: [
      'Época ideal para vendimias',
      'Viñedo propio',
      'Cocina completa'
    ],
    rating: 4.8,
    capacity: 8,
    features: ['Aparcamiento'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    url: 'https://masias-catalunya.com/can-torrents',
    amenities: ['Cocina completa', 'Chimenea', 'Terraza', 'Jardín', 'WiFi', 'Aparcamiento privado'],
    activities: ['Cata de vinos', 'Visita al viñedo', 'Cocina tradicional', 'Senderismo'],
    seasonality: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
    petFriendly: true,
    familyFriendly: true,
    romantic: true,
    groupFriendly: true
  },
  {
    id: '2',
    name: 'Masia El Celler - Tradición Familiar',
    location: 'Priorat, 1h de Barcelona',
    price: 95,
    description: 'Una masia centenaria que combina la tradición catalana con el confort moderno. Situada en el corazón del Priorat, ofrece vistas deslumbrantes de los viñedos y montañas.',
    recommendations: [
      'Vistas panorámicas',
      'Productos locales',
      'Jardín privado'
    ],
    rating: 4.9,
    capacity: 6,
    features: ['WiFi', 'Aparcamiento'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    url: 'https://masias-catalunya.com/el-celler',
    amenities: ['Piscina', 'Terraza panorámica', 'Cocina equipada', 'WiFi', 'Aparcamiento'],
    activities: ['Rutas en bici', 'Visitas a bodegas', 'Gastronomía local', 'Fotografía'],
    seasonality: ['Primavera', 'Verano', 'Otoño'],
    petFriendly: false,
    familyFriendly: true,
    romantic: true,
    groupFriendly: false
  },
  {
    id: '3',
    name: 'Masia La Finca - Naturaleza y Paz',
    location: 'Montseny, 50min de Barcelona',
    price: 85,
    description: 'Rodeada por la naturaleza del Parque Natural del Montseny, esta masia ofrece tranquilidad y conexión con la naturaleza. Ideal para familias que buscan paz y aventura.',
    recommendations: [
      'Parque natural',
      'Actividades al aire libre',
      'Pet-friendly'
    ],
    rating: 4.7,
    capacity: 10,
    features: ['Aparcamiento', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    url: 'https://masias-catalunya.com/la-finca',
    amenities: ['Jardín grande', 'Barbacoa', 'Zona de juegos', 'WiFi', 'Aparcamiento'],
    activities: ['Senderismo', 'Bicicleta', 'Observación de aves', 'Picnics'],
    seasonality: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
    petFriendly: true,
    familyFriendly: true,
    romantic: false,
    groupFriendly: true
  },
  {
    id: '4',
    name: 'Masia Can Soler - Romance en el Valle',
    location: 'Vallès Oriental, 35min de Barcelona',
    price: 150,
    description: 'Una masia romántica perfecta para parejas. Con vistas al valle y un ambiente íntimo, es el lugar ideal para una escapada romántica inolvidable.',
    recommendations: [
      'Vistas al valle',
      'Ambiente romántico',
      'Desayuno incluido'
    ],
    rating: 4.9,
    capacity: 2,
    features: ['Terraza privada', 'Jacuzzi'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    url: 'https://masias-catalunya.com/can-soler',
    amenities: ['Jacuzzi', 'Terraza privada', 'Chimenea', 'WiFi', 'Desayuno incluido'],
    activities: ['Masajes', 'Yoga', 'Cenas románticas', 'Paseos por el valle'],
    seasonality: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
    petFriendly: false,
    familyFriendly: false,
    romantic: true,
    groupFriendly: false
  },
  {
    id: '5',
    name: 'Masia El Molí - Historia Viva',
    location: 'Baix Llobregat, 25min de Barcelona',
    price: 110,
    description: 'Antiguo molino restaurado que mantiene su encanto histórico. Perfecto para grupos que quieren experimentar la autenticidad catalana cerca de Barcelona.',
    recommendations: [
      'Historia centenaria',
      'Cerca de Barcelona',
      'Ideal para grupos'
    ],
    rating: 4.6,
    capacity: 12,
    features: ['Sala común', 'Cocina industrial'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    url: 'https://masias-catalunya.com/el-moli',
    amenities: ['Sala de eventos', 'Cocina industrial', 'Jardín', 'WiFi', 'Aparcamiento grande'],
    activities: ['Eventos corporativos', 'Celebraciones', 'Cocina en grupo', 'Visitas culturales'],
    seasonality: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
    petFriendly: true,
    familyFriendly: true,
    romantic: false,
    groupFriendly: true
  },
  {
    id: '6',
    name: 'Masia Can Roca - Gastronomía y Tradición',
    location: 'Girona, 1h 30min de Barcelona',
    price: 180,
    description: 'Masía gourmet en el corazón de la Costa Brava. Famosa por su cocina tradicional catalana y su proximidad a algunos de los mejores restaurantes del mundo.',
    recommendations: [
      'Gastronomía excepcional',
      'Costa Brava',
      'Experiencia premium'
    ],
    rating: 5.0,
    capacity: 6,
    features: ['Cocina profesional', 'Bodega'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    url: 'https://masias-catalunya.com/can-roca',
    amenities: ['Cocina profesional', 'Bodega', 'Terraza gourmet', 'WiFi', 'Aparcamiento'],
    activities: ['Clases de cocina', 'Cata de vinos', 'Visitas a restaurantes', 'Playa'],
    seasonality: ['Primavera', 'Verano', 'Otoño'],
    petFriendly: false,
    familyFriendly: true,
    romantic: true,
    groupFriendly: false
  }
];

// Función para filtrar masias según las preferencias del usuario
export const filterMasiasByPreferences = (
  preferences: {
    seasons?: string[];
    experiences?: string[];
    companions?: string[];
    duration?: string;
    budget?: string;
  }
): Masia[] => {
  let filteredMasias = [...masiasDatabase];

  // Filtrar por presupuesto
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
  if (preferences.companions) {
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
  if (preferences.experiences) {
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

  return filteredMasias;
};

// Función para actualizar una masia en la base de datos
export const updateMasiaInDatabase = (updatedMasia: Masia): void => {
  const index = masiasDatabase.findIndex(masia => masia.id === updatedMasia.id);
  if (index !== -1) {
    masiasDatabase[index] = updatedMasia;
    console.log('Masia actualizada en la base de datos:', updatedMasia);
    
    // En un entorno real, aquí se haría una llamada a la API
    // fetch('/api/masias/' + updatedMasia.id, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedMasia)
    // });
  }
};

// Función para agregar una nueva masia a la base de datos
export const addMasiaToDatabase = (newMasia: Masia): void => {
  masiasDatabase.push(newMasia);
  console.log('Nueva masia agregada a la base de datos:', newMasia);
  
  // En un entorno real, aquí se haría una llamada a la API
  // fetch('/api/masias', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(newMasia)
  // });
};
