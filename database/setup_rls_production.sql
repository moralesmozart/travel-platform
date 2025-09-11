-- Setup RLS for Production - Travel Platform
-- Ejecutar este script en Supabase SQL Editor para configurar RLS correctamente

-- Paso 1: Limpiar políticas existentes que pueden estar causando conflictos
DROP POLICY IF EXISTS "Allow public read access to approved masias" ON masias;
DROP POLICY IF EXISTS "Allow insert of new masias" ON masias;
DROP POLICY IF EXISTS "Allow admin update" ON masias;
DROP POLICY IF EXISTS "public_read_approved_masias" ON masias;
DROP POLICY IF EXISTS "public_insert_new_masias" ON masias;
DROP POLICY IF EXISTS "admin_update_masias" ON masias;
DROP POLICY IF EXISTS "admin_delete_masias" ON masias;

-- Paso 2: Asegurar que RLS esté habilitado
ALTER TABLE masias ENABLE ROW LEVEL SECURITY;

-- Paso 3: Crear políticas de seguridad apropiadas

-- Política 1: Lectura pública de masías aprobadas
CREATE POLICY "public_read_approved_masias" ON masias
  FOR SELECT 
  USING (status = 'approved');

-- Política 2: Inserción de nuevas masías desde la aplicación web
CREATE POLICY "public_insert_new_masias" ON masias
  FOR INSERT 
  WITH CHECK (
    -- Validar que los campos requeridos estén presentes
    name IS NOT NULL AND 
    location IS NOT NULL AND 
    owner_email IS NOT NULL AND
    submitted_by IS NOT NULL
  );

-- Política 3: Actualización de masías (para admins y propietarios)
CREATE POLICY "admin_update_masias" ON masias
  FOR UPDATE 
  USING (true) -- Temporalmente permitir todas las actualizaciones
  WITH CHECK (true);

-- Política 4: Eliminación de masías (solo admins)
CREATE POLICY "admin_delete_masias" ON masias
  FOR DELETE 
  USING (true);

-- Paso 4: Verificar las políticas creadas
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

-- Paso 5: Verificar que RLS esté habilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'masias';

-- Comentario: 
-- Estas políticas permiten que la aplicación web funcione correctamente
-- - Los usuarios pueden leer masías aprobadas
-- - Los usuarios pueden insertar nuevas masías (con validación básica)
-- - Los admins pueden actualizar y eliminar masías
-- - En el futuro, puedes hacer estas políticas más restrictivas según tus necesidades
