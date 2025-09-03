// Función para convertir campos de camelCase a snake_case para la base de datos
export const convertToDatabaseFormat = (masia: any) => {
  return {
    name: masia.name,
    location: masia.location,
    description: masia.description,
    price: masia.price,
    capacity: masia.capacity,
    rating: masia.rating,
    image: masia.image,
    url: masia.url,
    recommendations: masia.recommendations,
    features: masia.features,
    amenities: masia.amenities,
    activities: masia.activities,
    seasonality: masia.seasonality,
    pet_friendly: masia.petFriendly,
    family_friendly: masia.familyFriendly,
    romantic: masia.romantic,
    group_friendly: masia.groupFriendly,
    owner_name: masia.ownerName,
    owner_surname: masia.ownerSurname,
    owner_email: masia.ownerEmail,
    owner_phone: masia.ownerPhone,
    status: masia.status,
    submitted_by: masia.submittedBy,
    submitted_at: masia.submittedAt
  };
};

// Función para convertir campos de snake_case a camelCase desde la base de datos
export const convertFromDatabaseFormat = (masia: any) => {
  return {
    id: masia.id,
    name: masia.name,
    location: masia.location,
    description: masia.description,
    price: masia.price,
    capacity: masia.capacity,
    rating: masia.rating,
    image: masia.image,
    url: masia.url,
    recommendations: masia.recommendations,
    features: masia.features,
    amenities: masia.amenities,
    activities: masia.activities,
    seasonality: masia.seasonality,
    petFriendly: masia.pet_friendly,
    familyFriendly: masia.family_friendly,
    romantic: masia.romantic,
    groupFriendly: masia.group_friendly,
    ownerName: masia.owner_name,
    ownerSurname: masia.owner_surname,
    ownerEmail: masia.owner_email,
    ownerPhone: masia.owner_phone,
    status: masia.status,
    submittedBy: masia.submitted_by,
    submittedAt: masia.submitted_at,
    created_at: masia.created_at,
    updated_at: masia.updated_at
  };
};
