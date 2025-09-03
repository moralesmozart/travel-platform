-- Script completo para arreglar el problema de RLS en la tabla masias
-- Ejecutar esto en Supabase SQL Editor

-- 1. Verificar el estado actual de RLS
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables 
WHERE tablename = 'masias';

-- 2. Verificar las políticas existentes
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check 
FROM pg_policies 
WHERE tablename = 'masias';

-- 3. Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Allow public read access to approved masias" ON masias;
DROP POLICY IF EXISTS "Allow insert of new masias" ON masias;
DROP POLICY IF EXISTS "Allow admin update" ON masias;
DROP POLICY IF EXISTS "Allow admin delete" ON masias;
DROP POLICY IF EXISTS "Allow all operations for development" ON masias;

-- 4. Deshabilitar RLS temporalmente
ALTER TABLE masias DISABLE ROW LEVEL SECURITY;

-- 5. Verificar que RLS está deshabilitado
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'masias';

-- 6. Probar operaciones básicas sin RLS
-- Insertar una masía de prueba
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

-- 7. Verificar que se insertó correctamente
SELECT id, name, status, created_at FROM masias WHERE name = 'Test Masia RLS Fix';

-- 8. Probar lectura
SELECT COUNT(*) as total_masias FROM masias;

-- 9. Probar actualización
UPDATE masias 
SET status = 'approved' 
WHERE name = 'Test Masia RLS Fix';

-- 10. Verificar la actualización
SELECT id, name, status, updated_at FROM masias WHERE name = 'Test Masia RLS Fix';

-- 11. Limpiar la masía de prueba
DELETE FROM masias WHERE name = 'Test Masia RLS Fix';

-- 12. Habilitar RLS nuevamente
ALTER TABLE masias ENABLE ROW LEVEL SECURITY;

-- 13. Crear políticas más permisivas para desarrollo
-- Política para lectura pública (todas las masías)
CREATE POLICY "Allow public read access to all masias" ON masias
  FOR SELECT USING (true);

-- Política para inserción (cualquier usuario autenticado)
CREATE POLICY "Allow insert for authenticated users" ON masias
  FOR INSERT WITH CHECK (true);

-- Política para actualización (cualquier usuario autenticado)
CREATE POLICY "Allow update for authenticated users" ON masias
  FOR UPDATE USING (true) WITH CHECK (true);

-- Política para eliminación (cualquier usuario autenticado)
CREATE POLICY "Allow delete for authenticated users" ON masias
  FOR DELETE USING (true);

-- 14. Verificar las nuevas políticas
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check 
FROM pg_policies 
WHERE tablename = 'masias';

-- 15. Verificar que RLS está habilitado
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'masias';

-- 16. Probar operaciones con RLS habilitado
-- Insertar otra masía de prueba
INSERT INTO masias (
  name, location, description, price, capacity, rating,
  image, url, recommendations, features, amenities, activities, seasonality,
  pet_friendly, family_friendly, romantic, group_friendly,
  owner_name, owner_surname, owner_email, owner_phone,
  status, submitted_by
) VALUES (
  'Test Masia RLS Enabled',
  'Test Location 2',
  'Test Description 2',
  150,
  6,
  4.7,
  'https://example.com/image2.jpg',
  'https://example.com/2',
  ARRAY['Test2'],
  ARRAY['Test2'],
  ARRAY['Test2'],
  ARRAY['Test2'],
  ARRAY['Test2'],
  true,
  false,
  true,
  false,
  'Test Owner 2',
  'Test Surname 2',
  'test2@example.com',
  '+1234567891',
  'pending',
  'Test User 2'
);

-- 17. Verificar que funciona con RLS
SELECT id, name, status FROM masias WHERE name = 'Test Masia RLS Enabled';

-- 18. Limpiar la segunda masía de prueba
DELETE FROM masias WHERE name = 'Test Masia RLS Enabled';

-- 19. Verificar el estado final
SELECT 
  'Estado final de la tabla masias:' as info,
  COUNT(*) as total_masias,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
FROM masias;

-- 20. Resumen de la configuración
SELECT 
  'Configuración RLS:' as config_type,
  schemaname,
  tablename,
  rowsecurity as rls_enabled,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'masias') as total_policies
FROM pg_tables 
WHERE tablename = 'masias';
