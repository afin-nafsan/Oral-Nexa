import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  Settings, 
  Activity,
  Stethoscope,
  BarChart3,
  UserCheck,
  Newspaper
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems: Array<{ id: string; label: string; icon: any; href?: string }> = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'treatments', label: 'Treatments', icon: Stethoscope },
  { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
  { id: 'staff', label: 'Staff', icon: UserCheck },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'blog', label: 'Blog', icon: Newspaper, href: '/blog' },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Oral Nexa</h1>
            <p className="text-sm text-gray-500">Dental Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const common = `w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
            activeTab === item.id
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`;
          return item.href ? (
            <a key={item.id} href={item.href} className={common}>
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ) : (
            <button key={item.id} onClick={() => onTabChange(item.id)} className={common}>
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="font-semibold text-sm">Need Help?</h3>
          <p className="text-xs opacity-90 mt-1">Contact our support team</p>
          <button className="mt-2 text-xs bg-white bg-opacity-20 px-3 py-1 rounded hover:bg-opacity-30 transition-colors">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
}