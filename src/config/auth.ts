// Configuración de autenticación
// En producción, estas credenciales deberían venir de variables de entorno
// o de un sistema de autenticación seguro

export const ADMIN_CREDENTIALS = {
  email: process.env.REACT_APP_ADMIN_EMAIL || 'admin@masiaconnect.com',
  password: process.env.REACT_APP_ADMIN_PASSWORD || 'admin123'
};

// Función para validar credenciales de administrador
export const validateAdminCredentials = (email: string, password: string): boolean => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

// Función para obtener credenciales de demo (solo para desarrollo)
export const getDemoCredentials = () => {
  if (process.env.NODE_ENV === 'production') {
    return null; // No mostrar credenciales en producción
  }
  return {
    email: ADMIN_CREDENTIALS.email,
    password: ADMIN_CREDENTIALS.password
  };
};
