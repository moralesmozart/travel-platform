-- Script para arreglar las políticas RLS
-- Ejecutar esto en Supabase SQL Editor

-- Primero, eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Allow public read access to approved masias" ON masias;
DROP POLICY IF EXISTS "Allow insert of new masias" ON masias;
DROP POLICY IF EXISTS "Allow admin update" ON masias;

-- Deshabilitar RLS temporalmente
ALTER TABLE masias DISABLE ROW LEVEL SECURITY;

-- Habilitar RLS nuevamente
ALTER TABLE masias ENABLE ROW LEVEL SECURITY;

-- Crear políticas más permisivas para desarrollo
-- Política 1: Permitir lectura de masías aprobadas a todos
CREATE POLICY "Allow public read access to approved masias" ON masias
  FOR SELECT USING (status = 'approved');

-- Política 2: Permitir inserción de nuevas masías (más permisiva)
CREATE POLICY "Allow insert of new masias" ON masias
  FOR INSERT WITH CHECK (true);

-- Política 3: Permitir actualización de todas las masías (para admin)
CREATE POLICY "Allow admin update" ON masias
  FOR UPDATE USING (true);

-- Política 4: Permitir eliminación de masías (para admin)
CREATE POLICY "Allow admin delete" ON masias
  FOR DELETE USING (true);

-- Verificar que las políticas se crearon correctamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'masias';
