import React, { useState, useEffect } from 'react';
import { useTreatments } from '../../hooks/useSupabase';
import { supabase } from '../../lib/supabase';
import TreatmentForm from './TreatmentForm';
import { Pencil } from 'lucide-react';

const COMMON_TREATMENTS = [
  { name: 'Cleaning', description: 'Routine dental cleaning', duration_minutes: 30, price: 50, category: 'Preventive' },
  { name: 'Fillings', description: 'Dental cavity fillings', duration_minutes: 45, price: 80, category: 'Restorative' },
  { name: 'Whitening', description: 'Teeth whitening procedure', duration_minutes: 60, price: 120, category: 'Cosmetic' },
  { name: 'Root Canal', description: 'Root canal therapy', duration_minutes: 90, price: 250, category: 'Endodontics' },
  { name: 'Extraction', description: 'Tooth extraction', duration_minutes: 30, price: 100, category: 'Surgical' },
  { name: 'Braces', description: 'Orthodontic braces', duration_minutes: 60, price: 1500, category: 'Orthodontics' },
  { name: 'Crowns', description: 'Dental crowns', duration_minutes: 60, price: 800, category: 'Restorative' },
];

export default function TreatmentManagement() {
  const { treatments, loading, error, refetch } = useTreatments();
  const [showForm, setShowForm] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [editTreatment, setEditTreatment] = useState<any>(null);

  useEffect(() => {
    if (!loading && treatments.length === 0 && !seeded) {
      // Seed the database with common treatments if empty
      (async () => {
        await supabase.from('treatments').insert(COMMON_TREATMENTS);
        setSeeded(true);
        refetch();
      })();
    }
  }, [loading, treatments, seeded, refetch]);

  const handleDelete = async (treatmentId: string) => {
    if (!window.confirm('Are you sure you want to delete this treatment?')) return;
    const { error } = await supabase.from('treatments').delete().eq('id', treatmentId);
    if (error) {
      alert('Failed to delete treatment: ' + error.message);
    } else {
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Treatment Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span>Add Treatment</span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {treatments.map((treatment) => (
              <tr key={treatment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">{treatment.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{treatment.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{treatment.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{treatment.duration_minutes} min</td>
                <td className="px-6 py-4 whitespace-nowrap">${treatment.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditTreatment(treatment);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 transition-colors mr-2"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(treatment.id)}
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
        <TreatmentForm
          treatment={editTreatment}
          onClose={() => {
            setShowForm(false);
            setEditTreatment(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditTreatment(null);
            refetch();
          }}
        />
      )}
    </div>
  );
} 