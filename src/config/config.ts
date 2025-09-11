// Configuración centralizada de la aplicación
export const config = {
  // Supabase Configuration
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL || 'https://dltnprnfqnvugbtwptam.supabase.co',
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdG5wcm5mcW52dWdidHdwdGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NzQzNjksImV4cCI6MjA3MjI1MDM2OX0.jhSyKbSWT8_f8hh8I55Q8Kys1MtjndHtr5--akrCuA4'
  },
  
  // Admin Configuration
  admin: {
    email: process.env.REACT_APP_ADMIN_EMAIL || 'admin@masiaconnect.com',
    password: process.env.REACT_APP_ADMIN_PASSWORD || 'admin123'
  },
  
  // App Configuration
  app: {
    name: 'Travel Platform',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development'
  }
};

// Función para verificar si la configuración está completa
export const isConfigValid = (): boolean => {
  return !!(config.supabase.url && config.supabase.anonKey);
};

// Función para obtener la configuración de Supabase
export const getSupabaseConfig = () => {
  return {
    url: config.supabase.url,
    anonKey: config.supabase.anonKey
  };
};

// Función para obtener credenciales de admin
export const getAdminCredentials = () => {
  return {
    email: config.admin.email,
    password: config.admin.password
  };
};
