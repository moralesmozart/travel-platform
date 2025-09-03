-- Crear tabla masias
CREATE TABLE masias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(500) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  capacity INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  image TEXT,
  url TEXT,
  recommendations TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  activities TEXT[] DEFAULT '{}',
  seasonality TEXT[] DEFAULT '{}',
  pet_friendly BOOLEAN DEFAULT false,
  family_friendly BOOLEAN DEFAULT false,
  romantic BOOLEAN DEFAULT false,
  group_friendly BOOLEAN DEFAULT false,
  owner_name VARCHAR(255) NOT NULL,
  owner_surname VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  owner_phone VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_by VARCHAR(255) NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_masias_status ON masias(status);
CREATE INDEX idx_masias_created_at ON masias(created_at DESC);
CREATE INDEX idx_masias_location ON masias USING GIN(to_tsvector('spanish', location));
CREATE INDEX idx_masias_name ON masias USING GIN(to_tsvector('spanish', name));

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_masias_updated_at 
    BEFORE UPDATE ON masias 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE masias ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
-- Permitir lectura de masías aprobadas a todos
CREATE POLICY "Allow public read access to approved masias" ON masias
  FOR SELECT USING (status = 'approved');

-- Permitir inserción de nuevas masías
CREATE POLICY "Allow insert of new masias" ON masias
  FOR INSERT WITH CHECK (true);

-- Permitir actualización solo a admins (esto se configurará después)
CREATE POLICY "Allow admin update" ON masias
  FOR UPDATE USING (true);

-- Insertar datos de ejemplo
INSERT INTO masias (
  name, location, description, price, capacity, rating,
  image, url, recommendations, features, amenities, activities, seasonality,
  pet_friendly, family_friendly, romantic, group_friendly,
  owner_name, owner_surname, owner_email, owner_phone,
  status, submitted_by
) VALUES 
(
  'Masia Can Solà',
  'Carrer de la Pau, 123, Barcelona, Cataluña, España',
  'Hermosa masía restaurada en el corazón de Barcelona, perfecta para una escapada romántica o familiar. Disfruta de la tranquilidad del campo con todas las comodidades de la ciudad.',
  150.00,
  6,
  4.8,
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  'https://masia-cansola.com',
  ARRAY['Visita al Parque Güell', 'Paseo por Las Ramblas', 'Cena en el Born'],
  ARRAY['Piscina', 'Jardín privado', 'Terraza con vistas'],
  ARRAY['WiFi gratuito', 'Cocina equipada', 'Parking gratuito'],
  ARRAY['Senderismo', 'Ciclismo', 'Visitas culturales'],
  ARRAY['Primavera', 'Verano', 'Otoño'],
  true,
  true,
  true,
  true,
  'María',
  'García',
  'maria@masia-cansola.com',
  '+34 600 123 456',
  'approved',
  'Sistema'
),
(
  'Masia El Molí',
  'Carrer de Gràcia, 456, Barcelona, Cataluña, España',
  'Antiguo molino restaurado con encanto rústico y moderno. Ideal para grupos grandes que buscan una experiencia única en Barcelona.',
  200.00,
  12,
  4.6,
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
  'https://masia-elmolí.com',
  ARRAY['Tour por el Barrio Gótico', 'Visita a la Sagrada Familia', 'Tapas en el Raval'],
  ARRAY['Molino histórico', 'Sala de eventos', 'Barbacoa'],
  ARRAY['WiFi gratuito', 'Cocina profesional', 'Sala de juegos'],
  ARRAY['Fiestas', 'Eventos corporativos', 'Reuniones familiares'],
  ARRAY['Verano', 'Otoño'],
  false,
  true,
  false,
  true,
  'Carlos',
  'López',
  'carlos@masia-elmolí.com',
  '+34 600 789 012',
  'approved',
  'Sistema'
),
(
  'Masia La Torre',
  'Carrer de Sants, 789, Barcelona, Cataluña, España',
  'Torre medieval con vistas espectaculares a la ciudad. Perfecta para parejas que buscan una experiencia romántica y exclusiva.',
  300.00,
  4,
  4.9,
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
  'https://masia-latorre.com',
  ARRAY['Cena romántica en la terraza', 'Masaje en la habitación', 'Tour privado por Barcelona'],
  ARRAY['Terraza privada', 'Jacuzzi', 'Chimenea'],
  ARRAY['Servicio de habitaciones', 'Concierge 24h', 'Traslados'],
  ARRAY['Yoga', 'Meditación', 'Fotografía'],
  ARRAY['Primavera', 'Verano', 'Otoño', 'Invierno'],
  false,
  false,
  true,
  false,
  'Ana',
  'Martínez',
  'ana@masia-latorre.com',
  '+34 600 345 678',
  'approved',
  'Sistema'
);
