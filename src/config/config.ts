// Configuración centralizada de la aplicación
export const config = {
  // Supabase Configuration
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL || '',
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || ''
  },
  
  // Admin Configuration
  admin: {
    email: process.env.REACT_APP_ADMIN_EMAIL || '',
    password: process.env.REACT_APP_ADMIN_PASSWORD || ''
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
  const hasSupabaseConfig = !!(config.supabase.url && config.supabase.anonKey);
  const hasAdminConfig = !!(config.admin.email && config.admin.password);
  
  if (!hasSupabaseConfig) {
    console.error('❌ Configuración de Supabase incompleta. Verifica REACT_APP_SUPABASE_URL y REACT_APP_SUPABASE_ANON_KEY');
  }
  
  if (!hasAdminConfig) {
    console.error('❌ Configuración de Admin incompleta. Verifica REACT_APP_ADMIN_EMAIL y REACT_APP_ADMIN_PASSWORD');
  }
  
  return hasSupabaseConfig && hasAdminConfig;
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
