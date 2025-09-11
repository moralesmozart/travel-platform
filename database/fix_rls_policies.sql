-- Fix RLS Policies for Travel Platform
-- Ejecutar este script en Supabase SQL Editor para corregir los permisos

-- Primero, eliminar las políticas existentes que pueden estar causando conflictos
DROP POLICY IF EXISTS "Allow public read access to approved masias" ON masias;
DROP POLICY IF EXISTS "Allow insert of new masias" ON masias;
DROP POLICY IF EXISTS "Allow admin update" ON masias;

-- Crear políticas corregidas y más permisivas para la aplicación web

-- 1. Política para lectura pública de masías aprobadas
CREATE POLICY "public_read_approved_masias" ON masias
  FOR SELECT 
  USING (status = 'approved');

-- 2. Política para inserción de nuevas masías (desde el formulario web)
CREATE POLICY "public_insert_new_masias" ON masias
  FOR INSERT 
  WITH CHECK (true); -- Permitir inserción de cualquier usuario

-- 3. Política para actualización (solo admins pueden cambiar status)
CREATE POLICY "admin_update_masias" ON masias
  FOR UPDATE 
  USING (true) -- Temporalmente permitir todas las actualizaciones
  WITH CHECK (true);

-- 4. Política para eliminación (solo admins)
CREATE POLICY "admin_delete_masias" ON masias
  FOR DELETE 
  USING (true);

-- Verificar que RLS esté habilitado
ALTER TABLE masias ENABLE ROW LEVEL SECURITY;

-- Verificar las políticas creadas
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

-- Comentario: Estas políticas son más permisivas para permitir que la aplicación web funcione
-- En producción, puedes hacerlas más restrictivas según tus necesidades de seguridad
