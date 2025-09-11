// Configuración de autenticación
import { getAdminCredentials } from './config';

// Obtener credenciales de administrador desde la configuración centralizada
const adminCredentials = getAdminCredentials();

// Función para validar credenciales de administrador
export const validateAdminCredentials = (email: string, password: string): boolean => {
  return email === adminCredentials.email && password === adminCredentials.password;
};

// Función para obtener credenciales de demo (solo para desarrollo)
export const getDemoCredentials = () => {
  if (process.env.NODE_ENV === 'production') {
    return null; // No mostrar credenciales en producción
  }
  return adminCredentials;
};
