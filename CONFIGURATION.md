# 🔧 Configuración del Proyecto - Travel Platform

## 🚨 Problema Resuelto: "No API key found in request"

### **¿Qué estaba pasando?**
El error `{"message":"No API key found in request","hint":"No `apikey` request header or url param was found."}` ocurría porque:

1. **GitHub Pages no puede acceder** a archivos `.env.local`
2. **Las variables de entorno** no se cargaban en producción
3. **Supabase client** se creaba con valores vacíos
4. **Las solicitudes fallaban** por falta de autenticación

### **✅ Solución Implementada**

Hemos implementado una **configuración híbrida** que funciona tanto en desarrollo como en producción:

#### **Para Desarrollo Local:**
- Usa variables de entorno del archivo `.env.local`
- Configuración flexible y segura

#### **Para Producción (GitHub Pages):**
- Credenciales hardcodeadas en `src/config/config.ts`
- Funciona inmediatamente sin configuración adicional

## 🛠️ Archivos de Configuración

### **1. `src/config/config.ts` (NUEVO)**
```typescript
export const config = {
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL || 'https://dltnprnfqnvugbtwptam.supabase.co',
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'your_key_here'
  },
  // ... más configuración
};
```

### **2. `src/config/supabase.ts` (ACTUALIZADO)**
```typescript
import { getSupabaseConfig, isConfigValid } from './config';

// Verificación automática de configuración
if (!isConfigValid()) {
  console.error('❌ Configuración de Supabase incompleta');
}

const { url, anonKey } = getSupabaseConfig();
export const supabase = createClient(url, anonKey);
```

### **3. `.env.local` (Desarrollo Local)**
```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
REACT_APP_ADMIN_EMAIL=admin@yourdomain.com
REACT_APP_ADMIN_PASSWORD=your_password_here
```

## 🚀 Cómo Configurar

### **Paso 1: Desarrollo Local**
```bash
# Copiar archivo de ejemplo
cp env.example .env.local

# Editar con tus credenciales reales
nano .env.local

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

### **Paso 2: Producción (GitHub Pages)**
```bash
# Las credenciales ya están en src/config/config.ts
# Solo necesitas hacer commit y push

git add .
git commit -m "Fix: Add Supabase credentials for production"
git push origin main

# El build se actualizará automáticamente
```

## 🔑 Credenciales Actuales

### **Supabase (Producción)**
- **URL**: `https://dltnprnfqnvugbtwptam.supabase.co`
- **Anon Key**: Configurado en `src/config/config.ts`

### **Admin (Producción)**
- **Email**: `admin@masiaconnect.com`
- **Password**: `admin123`

## ⚠️ Seguridad

### **✅ Lo que está bien:**
- Credenciales de desarrollo en `.env.local` (no se sube a GitHub)
- Configuración de producción hardcodeada (funciona en GitHub Pages)
- Validación automática de configuración

### **⚠️ Consideraciones:**
- Las credenciales de producción están visibles en el código
- Para proyectos muy sensibles, considera usar GitHub Secrets
- Las credenciales de admin son de demostración

## 🧪 Verificación

### **Verificar Configuración:**
```typescript
import { isConfigValid } from './config/config';

if (isConfigValid()) {
  console.log('✅ Configuración válida');
} else {
  console.log('❌ Configuración inválida');
}
```

### **Verificar Conexión Supabase:**
```typescript
import { supabase } from './config/supabase';

// Test de conexión
const { data, error } = await supabase.from('masias').select('count');
if (error) {
  console.error('❌ Error de conexión:', error);
} else {
  console.log('✅ Conexión exitosa');
}
```

## 🔄 Actualizar Credenciales

### **Si cambias de proyecto Supabase:**

1. **Actualizar `src/config/config.ts`:**
```typescript
supabase: {
  url: 'https://nuevo-proyecto.supabase.co',
  anonKey: 'nueva_key_aqui'
}
```

2. **Actualizar `.env.local` (desarrollo):**
```bash
REACT_APP_SUPABASE_URL=https://nuevo-proyecto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=nueva_key_aqui
```

3. **Commit y push:**
```bash
git add .
git commit -m "Update: New Supabase project credentials"
git push origin main
```

## 📚 Referencias

- [Documentación de Supabase](https://supabase.com/docs)
- [Variables de Entorno en React](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [GitHub Pages Deployment](https://docs.github.com/en/pages)

---

**¡El problema de la API key está resuelto! 🎉**

La plataforma ahora funciona tanto en desarrollo local como en producción en GitHub Pages.
