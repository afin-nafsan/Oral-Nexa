import React, { useState, useEffect } from 'react';
import { useStaff } from '../../hooks/useSupabase';
import { supabase } from '../../lib/supabase';
import StaffForm from './StaffForm';

const COMMON_STAFF = [
  { first_name: 'John', last_name: 'Doe', email: 'john.doe@clinic.com', phone: '1234567890', role: 'Dentist', specialization: 'General', license_number: 'DENT123' },
  { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@clinic.com', phone: '0987654321', role: 'Hygienist', specialization: 'Hygiene', license_number: 'HYG456' },
  { first_name: 'Emily', last_name: 'Brown', email: 'emily.brown@clinic.com', phone: '5551234567', role: 'Receptionist', specialization: '', license_number: '' },
  { first_name: 'Michael', last_name: 'Lee', email: 'michael.lee@clinic.com', phone: '5559876543', role: 'Orthodontist', specialization: 'Orthodontics', license_number: 'ORTH789' },
];

export default function StaffManagement() {
  const { staff, loading, error, refetch } = useStaff();
  const [showForm, setShowForm] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (!loading && staff.length === 0 && !seeded) {
      (async () => {
        await supabase.from('staff').insert(COMMON_STAFF);
        setSeeded(true);
        refetch();
      })();
    }
  }, [loading, staff, seeded, refetch]);

  const handleDelete = async (staffId: string) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    const { error } = await supabase.from('staff').delete().eq('id', staffId);
    if (error) {
      alert('Failed to delete staff member: ' + error.message);
    } else {
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span>Add Staff</span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">{member.first_name} {member.last_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.license_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <StaffForm
          onClose={() => setShowForm(false)}
          onSave={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
} 