import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import PatientManagement from './components/Patients/PatientManagement';
import AppointmentManagement from './components/Appointments/AppointmentManagement';
import PrescriptionManagement from './components/Prescriptions/PrescriptionManagement';
import ExpenseManagement from './components/Expenses/ExpenseManagement';
import TreatmentManagement from './components/Treatments/TreatmentManagement';
import StaffManagement from './components/Staff/StaffManagement';
import { supabase } from './lib/supabase';
import Login from './components/Auth/Login';
import LandingPage from './components/LandingPage';

function DashboardApp({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'prescriptions':
        return <PrescriptionManagement />;
      case 'expenses':
        return <ExpenseManagement />;
      case 'treatments':
        return <TreatmentManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'reports':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports & Analytics</h3>
              <p className="text-gray-500">Coming soon - Detailed reports and analytics</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-500">Coming soon - System settings and configuration</p>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // If loading session, you can show a loader here if desired

  return (
    <Routes>
      <Route path="/" element={
        session ? <Navigate to="/dashboard" replace /> : <LandingPage />
      } />
      <Route path="/login" element={
        session ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => navigate('/dashboard', { replace: true })} />
      } />
      <Route path="/dashboard" element={
        session ? <DashboardApp activeTab={activeTab} setActiveTab={setActiveTab} /> : <Navigate to="/login" replace />
      } />
      {/* Optionally, catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}