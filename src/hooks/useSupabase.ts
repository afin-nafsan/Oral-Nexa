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
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setPatients([]);
        setLoading(false);
        return;
      }
      const userId = user.data.user.id;
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPatients(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { patients, loading, error, refetch: fetchPatients };
}

export function useAppointments({ includeClosed = false } = {}) {
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
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setAppointments([]);
        setLoading(false);
        return;
      }
      const userId = user.data.user.id;
      let query = supabase
        .from('appointments')
        .select(`*, patients(first_name, last_name), staff(first_name, last_name, role), treatments(name, price)`)
        .eq('user_id', userId)
        .order('appointment_date', { ascending: true });
      if (!includeClosed) {
        query = query.is('closed_at', null);
      }
      const { data, error } = await query;
      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
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
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setPrescriptions([]);
        setLoading(false);
        return;
      }
      const userId = user.data.user.id;
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`*, patients(first_name, last_name), staff(first_name, last_name, role), prescription_medicines(medication_name, dosage, frequency, duration)`)
        .eq('user_id', userId)
        .order('prescribed_date', { ascending: false });
      if (error) throw error;
      setPrescriptions(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { prescriptions, loading, error, refetch: fetchPrescriptions };
}

export function useExpenses({ includeClosed = false } = {}) {
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
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setExpenses([]);
        setLoading(false);
        return;
      }
      const userId = user.data.user.id;
      let query = supabase
        .from('expenses')
        .select('*, patients(first_name, last_name)')
        .eq('user_id', userId)
        .order('expense_date', { ascending: false });
      if (!includeClosed) {
        query = query.is('closed_at', null);
      }
      const { data, error } = await query;
      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { expenses, loading, error, refetch: fetchExpenses };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError(null);
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setTransactions([]);
        setLoading(false);
        return;
      }
      const userId = user.data.user.id;
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { transactions, loading, error, refetch: fetchTransactions };
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
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setTreatments([]);
        setLoading(false);
        return;
      }
      const userId = user.data.user.id;
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('user_id', userId)
        .order('name', { ascending: true });
      if (error) throw error;
      setTreatments(data || []);
    } catch (error: any) {
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
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setStaff([]);
        setLoading(false);
        return;
      }
      const userId = user.data.user.id;
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('user_id', userId)
        .order('first_name', { ascending: true });
      if (error) throw error;
      setStaff(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { staff, loading, error, refetch: fetchStaff };
}