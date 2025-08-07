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
ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for appearance_settings
CREATE POLICY "Users can view their own appearance settings" ON appearance_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own appearance settings" ON appearance_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appearance settings" ON appearance_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own appearance settings" ON appearance_settings
    FOR DELETE USING (auth.uid() = user_id); 