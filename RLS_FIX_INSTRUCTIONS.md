# 🚨 SOLUCIÓN: Error de Row Level Security (RLS) en Supabase

## 🔍 **Problema Actual:**
```
Error adding masia: {code: '42501', details: null, hint: null, message: 'new row violates row-level security policy for table "masias"'}
```

## ✅ **Diagnóstico:**
- ✅ **API key configurada** correctamente
- ✅ **Conexión a Supabase** establecida  
- ✅ **Solicitud POST** llega al servidor
- ❌ **Política de RLS** está bloqueando la inserción

## 🛠️ **SOLUCIÓN PASO A PASO:**

### **Opción 1: Solución Rápida (Desarrollo)**
Si quieres que la aplicación funcione inmediatamente:

1. **Ir a Supabase Dashboard**
2. **SQL Editor**
3. **Ejecutar este script:**
```sql
-- Deshabilitar RLS temporalmente
ALTER TABLE masias DISABLE ROW LEVEL SECURITY;
```

### **Opción 2: Solución Correcta (Producción)**
Para configurar RLS correctamente:

1. **Ir a Supabase Dashboard**
2. **SQL Editor**
3. **Ejecutar el script `setup_rls_production.sql`**

## 📁 **Archivos de Solución Disponibles:**

### **1. `database/disable_rls_temporary.sql`**
- **Uso**: Desarrollo temporal
- **Efecto**: Deshabilita RLS completamente
- **⚠️ Advertencia**: Solo para desarrollo

### **2. `database/fix_rls_policies.sql`**
- **Uso**: Corrección de políticas existentes
- **Efecto**: Actualiza políticas de RLS
- **✅ Recomendado**: Para desarrollo

### **3. `database/setup_rls_production.sql`**
- **Uso**: Configuración completa de producción
- **Efecto**: Configura RLS con políticas seguras
- **🎯 Ideal**: Para producción

## 🚀 **PASOS PARA IMPLEMENTAR:**

### **Paso 1: Acceder a Supabase**
1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto `dltnprnfqnvugbtwptam`
3. Ve a **SQL Editor**

### **Paso 2: Ejecutar Script de Solución**
Copia y pega uno de estos scripts:

#### **Script A: Solución Rápida**
```sql
-- Deshabilitar RLS temporalmente
ALTER TABLE masias DISABLE ROW LEVEL SECURITY;
```

#### **Script B: Configuración Completa**
```sql
-- Usar el contenido de database/setup_rls_production.sql
```

### **Paso 3: Verificar**
1. Ejecuta el script
2. Verifica que no haya errores
3. Prueba el formulario de envío de masías

## 🔒 **¿Qué hace cada script?**

### **`disable_rls_temporary.sql`:**
- Deshabilita RLS completamente
- Permite todas las operaciones sin restricciones
- **⚠️ Solo para desarrollo**

### **`fix_rls_policies.sql`:**
- Corrige políticas existentes
- Mantiene RLS habilitado
- Permite inserción de nuevas masías

### **`setup_rls_production.sql`:**
- Configuración completa y segura
- Políticas de RLS apropiadas
- **✅ Recomendado para producción**

## 🧪 **Verificación de la Solución:**

### **Después de ejecutar el script:**
1. **Probar formulario** de envío de masías
2. **Verificar en consola** que no haya errores de RLS
3. **Confirmar** que la masía se guarde en la base de datos

### **Mensajes de éxito esperados:**
- ✅ No más errores de "row violates row-level security policy"
- ✅ Masía guardada exitosamente
- ✅ Redirección a página de confirmación

## 🔄 **Para Revertir Cambios:**

### **Si usaste `disable_rls_temporary.sql`:**
```sql
-- Habilitar RLS nuevamente
ALTER TABLE masias ENABLE ROW LEVEL SECURITY;
```

### **Si usaste otros scripts:**
- Las políticas ya están configuradas correctamente
- No es necesario revertir nada

## 📚 **Recursos Adicionales:**

- **Documentación Supabase RLS**: [https://supabase.com/docs/guides/auth/row-level-security](https://supabase.com/docs/guides/auth/row-level-security)
- **Archivo de configuración**: `CONFIGURATION.md`
- **Scripts SQL**: Carpeta `database/`

---

## 🎯 **RECOMENDACIÓN:**

**Para desarrollo rápido**: Usa `disable_rls_temporary.sql`
**Para producción**: Usa `setup_rls_production.sql`

**¡El formulario de envío de masías debería funcionar después de ejecutar cualquiera de estos scripts! 🎉**
