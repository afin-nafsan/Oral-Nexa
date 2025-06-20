import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePatients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Fetched patients:', data, error);
      if (error) throw error;
      setPatients(data || []);
    } catch (error: any) {
      console.error('Error fetching patients:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { patients, loading, error, refetch: fetchPatients };
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patients(first_name, last_name),
          staff(first_name, last_name, role),
          treatments(name, price)
        `)
        .order('appointment_date', { ascending: true });
      
      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { appointments, loading, error, refetch: fetchAppointments };
}

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  async function fetchPrescriptions() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          patients(first_name, last_name),
          staff(first_name, last_name, role),
          prescription_medicines(medication_name, dosage, frequency, duration)
        `)
        .order('prescribed_date', { ascending: false });
      
      if (error) throw error;
      setPrescriptions(data || []);
    } catch (error: any) {
      console.error('Error fetching prescriptions:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { prescriptions, loading, error, refetch: fetchPrescriptions };
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('expense_date', { ascending: false });
      
      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      console.error('Error fetching expenses:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { expenses, loading, error, refetch: fetchExpenses };
}

export function useTreatments() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTreatments();
  }, []);

  async function fetchTreatments() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      setTreatments(data || []);
    } catch (error: any) {
      console.error('Error fetching treatments:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { treatments, loading, error, refetch: fetchTreatments };
}

export function useStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('first_name', { ascending: true });
      
      if (error) throw error;
      setStaff(data || []);
    } catch (error: any) {
      console.error('Error fetching staff:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { staff, loading, error, refetch: fetchStaff };
}