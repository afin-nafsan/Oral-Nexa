-- Ensure per-user multi-tenancy across all core data tables

-- 1) Add user_id to core tables if missing
ALTER TABLE patients ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE staff ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE treatments ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE treatment_records ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2) Tighten Row Level Security policies to per-user for each table
-- Drop permissive policies if they exist
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'patients' AND policyname = 'Users can manage all patients'
  ) THEN
    EXECUTE 'DROP POLICY "Users can manage all patients" ON patients';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'staff' AND policyname = 'Users can manage all staff'
  ) THEN
    EXECUTE 'DROP POLICY "Users can manage all staff" ON staff';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'treatments' AND policyname = 'Users can manage all treatments'
  ) THEN
    EXECUTE 'DROP POLICY "Users can manage all treatments" ON treatments';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'appointments' AND policyname = 'Users can manage all appointments'
  ) THEN
    EXECUTE 'DROP POLICY "Users can manage all appointments" ON appointments';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'prescriptions' AND policyname = 'Users can manage all prescriptions'
  ) THEN
    EXECUTE 'DROP POLICY "Users can manage all prescriptions" ON prescriptions';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'treatment_records' AND policyname = 'Users can manage all treatment records'
  ) THEN
    EXECUTE 'DROP POLICY "Users can manage all treatment records" ON treatment_records';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'expenses' AND policyname = 'Users can manage all expenses'
  ) THEN
    EXECUTE 'DROP POLICY "Users can manage all expenses" ON expenses';
  END IF;
END $$;

-- Per-user policies: SELECT/INSERT/UPDATE/DELETE only where user_id matches auth.uid()
CREATE POLICY IF NOT EXISTS "Users select own patients" ON patients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own patients" ON patients FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own patients" ON patients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own patients" ON patients FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users select own staff" ON staff FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own staff" ON staff FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own staff" ON staff FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own staff" ON staff FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users select own treatments" ON treatments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own treatments" ON treatments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own treatments" ON treatments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own treatments" ON treatments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users select own appointments" ON appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own appointments" ON appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own appointments" ON appointments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own appointments" ON appointments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users select own prescriptions" ON prescriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own prescriptions" ON prescriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own prescriptions" ON prescriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own prescriptions" ON prescriptions FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users select own treatment_records" ON treatment_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own treatment_records" ON treatment_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own treatment_records" ON treatment_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own treatment_records" ON treatment_records FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users select own expenses" ON expenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own expenses" ON expenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own expenses" ON expenses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own expenses" ON expenses FOR DELETE USING (auth.uid() = user_id);

-- 3) Prescription medicines helper table (if not already present)
CREATE TABLE IF NOT EXISTS prescription_medicines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id uuid REFERENCES prescriptions(id) ON DELETE CASCADE,
  medication_name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  duration text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prescription_medicines ENABLE ROW LEVEL SECURITY;

-- Policies to ensure only owner of parent prescription can access medicines
CREATE POLICY IF NOT EXISTS "Users select own prescription medicines"
  ON prescription_medicines
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM prescriptions p
      WHERE p.id = prescription_medicines.prescription_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY IF NOT EXISTS "Users insert own prescription medicines"
  ON prescription_medicines
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM prescriptions p
      WHERE p.id = prescription_medicines.prescription_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY IF NOT EXISTS "Users update own prescription medicines"
  ON prescription_medicines
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM prescriptions p
      WHERE p.id = prescription_medicines.prescription_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY IF NOT EXISTS "Users delete own prescription medicines"
  ON prescription_medicines
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM prescriptions p
      WHERE p.id = prescription_medicines.prescription_id AND p.user_id = auth.uid()
    )
  );


