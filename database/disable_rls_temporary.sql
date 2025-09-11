-- TEMPORARY: Disable RLS for development
-- ⚠️ ADVERTENCIA: Solo usar en desarrollo, NO en producción
-- Este script deshabilita temporalmente RLS para permitir que la aplicación funcione

-- Deshabilitar RLS temporalmente
ALTER TABLE masias DISABLE ROW LEVEL SECURITY;

-- Verificar que RLS esté deshabilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'masias';

-- Comentario: 
-- - RLS está deshabilitado temporalmente
-- - Esto permite que la aplicación funcione sin restricciones de seguridad
-- - RECUERDA: Habilitar RLS nuevamente en producción con políticas apropiadas
-- - Para habilitar RLS nuevamente, ejecuta: ALTER TABLE masias ENABLE ROW LEVEL SECURITY;
