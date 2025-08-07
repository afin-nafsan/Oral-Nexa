import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email?: string;
          phone: string;
          date_of_birth?: string;
          address?: string;
          emergency_contact?: string;
          emergency_phone?: string;
          medical_history?: string;
          allergies?: string;
          insurance_info?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['patients']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['patients']['Insert']>;
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          staff_id?: string;
          treatment_id?: string;
          appointment_date: string;
          duration_minutes: number;
          status: string;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['appointments']['Insert']>;
      };
      treatments: {
        Row: {
          id: string;
          name: string;
          description?: string;
          duration_minutes: number;
          price: number;
          category: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['treatments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['treatments']['Insert']>;
      };
      prescriptions: {
        Row: {
          id: string;
          patient_id: string;
          staff_id?: string;
          medication_name: string;
          dosage: string;
          frequency: string;
          duration: string;
          instructions?: string;
          prescribed_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['prescriptions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['prescriptions']['Insert']>;
      };
      expenses: {
        Row: {
          id: string;
          category: string;
          description: string;
          amount: number;
          expense_date: string;
          payment_method: string;
          receipt_number?: string;
          vendor?: string;
          notes?: string;
          created_at: string;
          closed_at?: string | null;
        };
        Insert: Omit<Database['public']['Tables']['expenses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['expenses']['Insert']>;
      };
      staff: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string;
          role: string;
          specialization?: string;
          license_number?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['staff']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['staff']['Insert']>;
      };
    };
  };
};