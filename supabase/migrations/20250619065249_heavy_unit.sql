/*
  # Oral Nexa - Dental Management System Database Schema

  1. New Tables
    - `patients` - Store patient information including personal details and medical history
    - `appointments` - Manage appointment scheduling with patients and treatments
    - `treatments` - Define available dental treatments and procedures
    - `prescriptions` - Track prescriptions given to patients
    - `expenses` - Manage clinic expenses and financial transactions
    - `staff` - Store staff/doctor information
    - `treatment_records` - Track treatments performed on patients

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their clinic data
*/

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE,
  phone text NOT NULL,
  date_of_birth date,
  address text,
  emergency_contact text,
  emergency_phone text,
  medical_history text,
  allergies text,
  insurance_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role text DEFAULT 'dentist',
  specialization text,
  license_number text,
  created_at timestamptz DEFAULT now()
);

-- Create treatments table
CREATE TABLE IF NOT EXISTS treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration_minutes integer DEFAULT 30,
  price decimal(10,2) NOT NULL,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  staff_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  treatment_id uuid REFERENCES treatments(id) ON DELETE SET NULL,
  appointment_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 30,
  status text DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  staff_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  medication_name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  duration text NOT NULL,
  instructions text,
  prescribed_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create treatment_records table
CREATE TABLE IF NOT EXISTS treatment_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  staff_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  treatment_id uuid REFERENCES treatments(id) ON DELETE SET NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  treatment_date timestamptz DEFAULT now(),
  notes text,
  cost decimal(10,2),
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  description text NOT NULL,
  amount decimal(10,2) NOT NULL,
  expense_date timestamptz DEFAULT now(),
  payment_method text DEFAULT 'cash',
  receipt_number text,
  vendor text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage all patients"
  ON patients
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage all staff"
  ON staff
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage all treatments"
  ON treatments
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage all appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage all prescriptions"
  ON prescriptions
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage all treatment records"
  ON treatment_records
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage all expenses"
  ON expenses
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO treatments (name, description, duration_minutes, price, category) VALUES
  ('Dental Cleaning', 'Regular dental cleaning and checkup', 60, 150.00, 'preventive'),
  ('Teeth Whitening', 'Professional teeth whitening treatment', 90, 300.00, 'cosmetic'),
  ('Cavity Filling', 'Composite filling for cavities', 45, 200.00, 'restorative'),
  ('Root Canal', 'Root canal therapy', 120, 800.00, 'endodontic'),
  ('Crown Placement', 'Dental crown installation', 90, 1200.00, 'restorative'),
  ('Tooth Extraction', 'Simple tooth extraction', 30, 250.00, 'surgical'),
  ('Dental Implant', 'Single dental implant placement', 150, 2500.00, 'surgical'),
  ('Orthodontic Consultation', 'Initial orthodontic evaluation', 45, 100.00, 'orthodontic');

INSERT INTO staff (first_name, last_name, email, phone, role, specialization, license_number) VALUES
  ('Dr. Sarah', 'Johnson', 'sarah.johnson@oralnexa.com', '+1-555-0101', 'dentist', 'General Dentistry', 'DDS-12345'),
  ('Dr. Michael', 'Chen', 'michael.chen@oralnexa.com', '+1-555-0102', 'dentist', 'Orthodontics', 'DDS-12346'),
  ('Jessica', 'Martinez', 'jessica.martinez@oralnexa.com', '+1-555-0103', 'hygienist', 'Dental Hygiene', 'RDH-67890'),
  ('Dr. Emily', 'Thompson', 'emily.thompson@oralnexa.com', '+1-555-0104', 'dentist', 'Oral Surgery', 'DDS-12347');