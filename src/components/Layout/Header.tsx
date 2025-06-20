import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HeaderProps {
  activeTab: string;
}

const tabTitles: { [key: string]: string } = {
  dashboard: 'Dashboard Overview',
  patients: 'Patient Management',
  appointments: 'Appointment Scheduling',
  treatments: 'Treatment Plans',
  prescriptions: 'Prescription Management',
  staff: 'Staff Management',
  expenses: 'Expense Tracking',
  reports: 'Analytics & Reports',
  settings: 'System Settings',
};

export default function Header({ activeTab }: HeaderProps) {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {tabTitles[activeTab] || 'Oral Nexa Dashboard'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your dental practice efficiently
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user ? user.email : 'Not logged in'}</p>
              <p className="text-xs text-gray-500">{user ? 'Logged in' : ''}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}