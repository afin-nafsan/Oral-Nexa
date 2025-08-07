import React, { useState, useEffect } from 'react';
import { Bell, Search, User, LogOut, Users, Calendar, Stethoscope, UserCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePatients, useAppointments, useTreatments, useStaff } from '../../hooks/useSupabase';

interface HeaderProps {
  activeTab: string;
}

interface SearchResult {
  id: string;
  type: 'patient' | 'appointment' | 'treatment' | 'staff';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tab: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { patients } = usePatients();
  const { appointments } = useAppointments({ includeClosed: true });
  const { treatments } = useTreatments();
  const { staff } = useStaff();

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();

    const results: SearchResult[] = [];

    // Search patients
    patients.forEach(patient => {
      const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
      const phone = patient.phone?.toLowerCase() || '';
      const email = patient.email?.toLowerCase() || '';
      
      if (fullName.includes(query) || phone.includes(query) || email.includes(query)) {
        results.push({
          id: patient.id,
          type: 'patient',
          title: `${patient.first_name} ${patient.last_name}`,
          subtitle: `${patient.phone || 'No phone'} • ${patient.email || 'No email'}`,
          icon: <Users className="h-4 w-4" />,
          tab: 'patients'
        });
      }
    });

    // Search appointments
    appointments.forEach(appointment => {
      const patientName = appointment.patients ? 
        `${appointment.patients.first_name} ${appointment.patients.last_name}`.toLowerCase() : '';
      const treatmentName = appointment.treatments?.name?.toLowerCase() || '';
      const staffName = appointment.staff ? 
        `${appointment.staff.first_name} ${appointment.staff.last_name}`.toLowerCase() : '';
      
      if (patientName.includes(query) || treatmentName.includes(query) || staffName.includes(query)) {
        results.push({
          id: appointment.id,
          type: 'appointment',
          title: `${appointment.patients?.first_name || 'Unknown'} ${appointment.patients?.last_name || 'Patient'}`,
          subtitle: `${appointment.treatments?.name || 'No treatment'} • ${new Date(appointment.appointment_date).toLocaleDateString()}`,
          icon: <Calendar className="h-4 w-4" />,
          tab: 'appointments'
        });
      }
    });

    // Search treatments
    treatments.forEach(treatment => {
      const name = treatment.name.toLowerCase();
      const description = treatment.description?.toLowerCase() || '';
      
      if (name.includes(query) || description.includes(query)) {
        results.push({
          id: treatment.id,
          type: 'treatment',
          title: treatment.name,
          subtitle: `₹${treatment.price} • ${treatment.description || 'No description'}`,
          icon: <Stethoscope className="h-4 w-4" />,
          tab: 'treatments'
        });
      }
    });

    // Search staff
    staff.forEach(staffMember => {
      const fullName = `${staffMember.first_name} ${staffMember.last_name}`.toLowerCase();
      const role = staffMember.role?.toLowerCase() || '';
      const email = staffMember.email?.toLowerCase() || '';
      
      if (fullName.includes(query) || role.includes(query) || email.includes(query)) {
        results.push({
          id: staffMember.id,
          type: 'staff',
          title: `${staffMember.first_name} ${staffMember.last_name}`,
          subtitle: `${staffMember.role || 'No role'} • ${staffMember.email || 'No email'}`,
          icon: <UserCheck className="h-4 w-4" />,
          tab: 'staff'
        });
      }
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowResults(true);
    setIsSearching(false);
  }, [searchQuery, patients, appointments, treatments, staff]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleSearchResultClick = (result: SearchResult) => {
    // Navigate to the appropriate tab
    const event = new CustomEvent('navigateToTab', { detail: result.tab });
    window.dispatchEvent(event);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSearchClick = () => {
    setShowResults(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
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
              placeholder="Search patients, appointments, treatments, staff..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 bg-white text-gray-900 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchClick}
              onBlur={handleSearchBlur}
            />
            
            {/* Search Results Dropdown */}
            {showResults && (searchQuery.trim().length > 0 || isSearching) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((result, index) => (
                      <button
                        key={`${result.type}-${result.id}-${index}`}
                        className="w-full p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-left flex items-center space-x-3"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="text-gray-400">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {result.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {result.subtitle}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {result.type}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
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