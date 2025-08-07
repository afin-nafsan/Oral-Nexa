import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface PracticeInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  license: string;
  taxId: string;
}

interface BillingSettings {
  currency: string;
  taxRate: number;
  autoInvoice: boolean;
  paymentMethods: string[];
  invoicePrefix: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  paymentReminders: boolean;
  systemAlerts: boolean;
}

interface AppearanceSettings {
  colorScheme: string;
  showSidebar: boolean;
  compactTables: boolean;
  showNotificationBadge: boolean;
}

interface SettingsContextType {
  practiceInfo: PracticeInfo;
  billingSettings: BillingSettings;
  notificationSettings: NotificationSettings;
  appearanceSettings: AppearanceSettings;
  updatePracticeInfo: (info: PracticeInfo) => Promise<void>;
  updateBillingSettings: (settings: BillingSettings) => Promise<void>;
  updateNotificationSettings: (settings: NotificationSettings) => Promise<void>;
  updateAppearanceSettings: (settings: AppearanceSettings) => Promise<void>;
  loading: boolean;
}

const defaultPracticeInfo: PracticeInfo = {
  name: 'Oral Nexa Dental Clinic',
  address: '123 Dental Street, Medical District, City - 12345',
  phone: '+1 (555) 123-4567',
  email: 'info@oralnexa.com',
  website: 'www.oralnexa.com',
  license: 'DENT-2024-001',
  taxId: '12-3456789'
};

const defaultBillingSettings: BillingSettings = {
  currency: 'INR',
  taxRate: 18,
  autoInvoice: true,
  paymentMethods: ['Cash', 'Card', 'UPI', 'Bank Transfer'],
  invoicePrefix: 'ON-'
};

const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  smsNotifications: true,
  appointmentReminders: true,
  paymentReminders: true,
  systemAlerts: true
};

const defaultAppearanceSettings: AppearanceSettings = {
  colorScheme: 'blue',
  showSidebar: true,
  compactTables: false,
  showNotificationBadge: true
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [practiceInfo, setPracticeInfo] = useState<PracticeInfo>(defaultPracticeInfo);
  const [billingSettings, setBillingSettings] = useState<BillingSettings>(defaultBillingSettings);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>(defaultAppearanceSettings);
  const [loading, setLoading] = useState(true);

  // Load settings from database on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        setLoading(false);
        return;
      }

      const userId = user.data.user.id;

      // Load practice info
      const { data: practiceData } = await supabase
        .from('practice_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (practiceData) {
        setPracticeInfo({
          name: practiceData.name || defaultPracticeInfo.name,
          address: practiceData.address || defaultPracticeInfo.address,
          phone: practiceData.phone || defaultPracticeInfo.phone,
          email: practiceData.email || defaultPracticeInfo.email,
          website: practiceData.website || defaultPracticeInfo.website,
          license: practiceData.license || defaultPracticeInfo.license,
          taxId: practiceData.tax_id || defaultPracticeInfo.taxId
        });
      }

      // Load billing settings
      const { data: billingData } = await supabase
        .from('billing_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (billingData) {
        setBillingSettings({
          currency: billingData.currency || defaultBillingSettings.currency,
          taxRate: billingData.tax_rate || defaultBillingSettings.taxRate,
          autoInvoice: billingData.auto_invoice || defaultBillingSettings.autoInvoice,
          paymentMethods: billingData.payment_methods || defaultBillingSettings.paymentMethods,
          invoicePrefix: billingData.invoice_prefix || defaultBillingSettings.invoicePrefix
        });
      }

      // Load notification settings
      const { data: notificationData } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (notificationData) {
        setNotificationSettings({
          emailNotifications: notificationData.email_notifications || defaultNotificationSettings.emailNotifications,
          smsNotifications: notificationData.sms_notifications || defaultNotificationSettings.smsNotifications,
          appointmentReminders: notificationData.appointment_reminders || defaultNotificationSettings.appointmentReminders,
          paymentReminders: notificationData.payment_reminders || defaultNotificationSettings.paymentReminders,
          systemAlerts: notificationData.system_alerts || defaultNotificationSettings.systemAlerts
        });
      }

      // Load appearance settings
      const { data: appearanceData } = await supabase
        .from('appearance_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (appearanceData) {
        setAppearanceSettings({
          colorScheme: appearanceData.color_scheme || defaultAppearanceSettings.colorScheme,
          showSidebar: appearanceData.show_sidebar !== undefined ? appearanceData.show_sidebar : defaultAppearanceSettings.showSidebar,
          compactTables: appearanceData.compact_tables !== undefined ? appearanceData.compact_tables : defaultAppearanceSettings.compactTables,
          showNotificationBadge: appearanceData.show_notification_badge !== undefined ? appearanceData.show_notification_badge : defaultAppearanceSettings.showNotificationBadge
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePracticeInfo = async (info: PracticeInfo) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const userId = user.data.user.id;

      const { error } = await supabase
        .from('practice_settings')
        .upsert({
          user_id: userId,
          name: info.name,
          address: info.address,
          phone: info.phone,
          email: info.email,
          website: info.website,
          license: info.license,
          tax_id: info.taxId,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setPracticeInfo(info);
    } catch (error) {
      console.error('Error updating practice info:', error);
      throw error;
    }
  };

  const updateBillingSettings = async (settings: BillingSettings) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const userId = user.data.user.id;

      const { error } = await supabase
        .from('billing_settings')
        .upsert({
          user_id: userId,
          currency: settings.currency,
          tax_rate: settings.taxRate,
          auto_invoice: settings.autoInvoice,
          payment_methods: settings.paymentMethods,
          invoice_prefix: settings.invoicePrefix,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setBillingSettings(settings);
    } catch (error) {
      console.error('Error updating billing settings:', error);
      throw error;
    }
  };

  const updateNotificationSettings = async (settings: NotificationSettings) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const userId = user.data.user.id;

      const { error } = await supabase
        .from('notification_settings')
        .upsert({
          user_id: userId,
          email_notifications: settings.emailNotifications,
          sms_notifications: settings.smsNotifications,
          appointment_reminders: settings.appointmentReminders,
          payment_reminders: settings.paymentReminders,
          system_alerts: settings.systemAlerts,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setNotificationSettings(settings);
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  };

  const updateAppearanceSettings = async (settings: AppearanceSettings) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const userId = user.data.user.id;

      const { error } = await supabase
        .from('appearance_settings')
        .upsert({
          user_id: userId,
          color_scheme: settings.colorScheme,
          show_sidebar: settings.showSidebar,
          compact_tables: settings.compactTables,
          show_notification_badge: settings.showNotificationBadge,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setAppearanceSettings(settings);
    } catch (error) {
      console.error('Error updating appearance settings:', error);
      throw error;
    }
  };

  const value: SettingsContextType = {
    practiceInfo,
    billingSettings,
    notificationSettings,
    appearanceSettings,
    updatePracticeInfo,
    updateBillingSettings,
    updateNotificationSettings,
    updateAppearanceSettings,
    loading
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 