-- Create practice_settings table
CREATE TABLE IF NOT EXISTS practice_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    license TEXT,
    tax_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create billing_settings table
CREATE TABLE IF NOT EXISTS billing_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    currency TEXT DEFAULT 'INR',
    tax_rate DECIMAL(5,2) DEFAULT 18.00,
    auto_invoice BOOLEAN DEFAULT true,
    payment_methods TEXT[] DEFAULT ARRAY['Cash', 'Card', 'UPI', 'Bank Transfer'],
    invoice_prefix TEXT DEFAULT 'ON-',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create notification_settings table
CREATE TABLE IF NOT EXISTS notification_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT true,
    appointment_reminders BOOLEAN DEFAULT true,
    payment_reminders BOOLEAN DEFAULT true,
    system_alerts BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create appearance_settings table
CREATE TABLE IF NOT EXISTS appearance_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'light',
    color_scheme TEXT DEFAULT 'blue',
    show_sidebar BOOLEAN DEFAULT true,
    compact_tables BOOLEAN DEFAULT false,
    show_notification_badge BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE practice_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own practice settings" ON practice_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own practice settings" ON practice_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own practice settings" ON practice_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own practice settings" ON practice_settings
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own billing settings" ON billing_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own billing settings" ON billing_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own billing settings" ON billing_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own billing settings" ON billing_settings
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own notification settings" ON notification_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification settings" ON notification_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification settings" ON notification_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notification settings" ON notification_settings
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for appearance_settings
CREATE POLICY "Users can view their own appearance settings" ON appearance_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own appearance settings" ON appearance_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appearance settings" ON appearance_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own appearance settings" ON appearance_settings
    FOR DELETE USING (auth.uid() = user_id); 