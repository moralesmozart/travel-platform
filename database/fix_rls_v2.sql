-- Script para arreglar las políticas RLS - Versión 2
-- Ejecutar esto en Supabase SQL Editor

-- 1. Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Allow public read access to approved masias" ON masias;
DROP POLICY IF EXISTS "Allow insert of new masias" ON masias;
DROP POLICY IF EXISTS "Allow admin update" ON masias;
DROP POLICY IF EXISTS "Allow admin delete" ON masias;

-- 2. Deshabilitar RLS completamente
ALTER TABLE masias DISABLE ROW LEVEL SECURITY;

-- 3. Verificar que RLS está deshabilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'masias';

-- 4. Probar inserción directa para verificar que funciona
INSERT INTO masias (
  name, location, description, price, capacity, rating,
  image, url, recommendations, features, amenities, activities, seasonality,
  pet_friendly, family_friendly, romantic, group_friendly,
  owner_name, owner_surname, owner_email, owner_phone,
  status, submitted_by
) VALUES (
  'Test Masia RLS Fix',
  'Test Location',
  'Test Description',
  100,
  4,
  4.5,
  'https://example.com/image.jpg',
  'https://example.com',
  ARRAY['Test'],
  ARRAY['Test'],
  ARRAY['Test'],
  ARRAY['Test'],
  ARRAY['Test'],
  false,
  true,
  false,
  true,
  'Test Owner',
  'Test Surname',
  'test@example.com',
  '+1234567890',
  'pending',
  'Test User'
);

-- 5. Verificar que se insertó correctamente
SELECT id, name, status FROM masias WHERE name = 'Test Masia RLS Fix';

-- 6. Limpiar la masía de prueba
DELETE FROM masias WHERE name = 'Test Masia RLS Fix';

-- 7. Si todo funciona, habilitar RLS con políticas muy permisivas
ALTER TABLE masias ENABLE ROW LEVEL SECURITY;

-- 8. Crear políticas muy permisivas
CREATE POLICY "Allow all operations for development" ON masias
  FOR ALL USING (true) WITH CHECK (true);

-- 9. Verificar las políticas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'masias';
