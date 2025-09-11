import { createClient } from '@supabase/supabase-js';
import { convertToDatabaseFormat, convertFromDatabaseFormat } from '../utils/fieldConverter';
import { getSupabaseConfig, isConfigValid } from './config';

// Verificar que la configuración esté completa
if (!isConfigValid()) {
  console.error('❌ Configuración de Supabase incompleta. Verifica las variables de entorno.');
}

// Obtener configuración de Supabase
const { url, anonKey } = getSupabaseConfig();

// Crear cliente de Supabase
export const supabase = createClient(url, anonKey);

// Tipos para la base de datos
export interface Masia {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  capacity: number;
  rating: number;
  image: string;
  url: string;
  recommendations: string[];
  features: string[];
  amenities: string[];
  activities: string[];
  seasonality: string[];
  petFriendly: boolean;
  familyFriendly: boolean;
  romantic: boolean;
  groupFriendly: boolean;
  ownerName: string;
  ownerSurname: string;
  ownerEmail: string;
  ownerPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  created_at?: string;
  updated_at?: string;
}

// Funciones de la base de datos
export const masiasDB = {
  // Obtener todas las masías aprobadas
  async getApprovedMasias(): Promise<Masia[]> {
    const { data, error } = await supabase
      .from('masias')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching approved masias:', error);
      return [];
    }

    // Convertir datos de la base de datos al formato de la aplicación
    return (data || []).map(convertFromDatabaseFormat);
  },

  // Obtener todas las masías (para admin)
  async getAllMasias(): Promise<Masia[]> {
    const { data, error } = await supabase
      .from('masias')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all masias:', error);
      return [];
    }

    // Convertir datos de la base de datos al formato de la aplicación
    return (data || []).map(convertFromDatabaseFormat);
  },

  // Agregar nueva masía
  async addMasia(masia: Omit<Masia, 'id' | 'created_at' | 'updated_at'>): Promise<Masia | null> {
    // Convertir datos del formulario al formato de la base de datos
    const dbData = convertToDatabaseFormat(masia);
    
    const { data, error } = await supabase
      .from('masias')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Error adding masia:', error);
      return null;
    }

    // Convertir respuesta de la base de datos al formato de la aplicación
    return convertFromDatabaseFormat(data);
  },

  // Actualizar masía
  async updateMasia(masia: Masia): Promise<Masia | null> {
    // Convertir datos del formulario al formato de la base de datos
    const dbData = convertToDatabaseFormat(masia);
    
    const { data, error } = await supabase
      .from('masias')
      .update(dbData)
      .eq('id', masia.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating masia:', error);
      return null;
    }

    // Convertir respuesta de la base de datos al formato de la aplicación
    return convertFromDatabaseFormat(data);
  },

  // Aprobar masía
  async approveMasia(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('masias')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      console.error('Error approving masia:', error);
      return false;
    }

    return true;
  },

  // Rechazar masía
  async rejectMasia(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('masias')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) {
      console.error('Error rejecting masia:', error);
      return false;
    }

    return true;
  },

  // Eliminar masía
  async deleteMasia(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('masias')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting masia:', error);
      return false;
    }

    return true;
  }
};
