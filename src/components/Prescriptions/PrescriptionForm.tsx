import React, { useState } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PrescriptionFormProps {
  prescription?: any;
  patients: any[];
  staff: any[];
  onClose: () => void;
  onSave: () => void;
}

type Medicine = {
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
};

export default function PrescriptionForm({ 
  prescription, 
  patients, 
  staff, 
  onClose, 
  onSave 
}: PrescriptionFormProps) {
  const [formData, setFormData] = useState({
    patient_id: prescription?.patient_id || '',
    staff_id: prescription?.staff_id || '',
    instructions: prescription?.instructions || '',
  });
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([
    { medication_name: '', dosage: '', frequency: '', duration: '' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let prescriptionId = prescription?.id;
      if (prescription) {
        const { error } = await supabase
          .from('prescriptions')
          .update({
            patient_id: formData.patient_id,
            staff_id: formData.staff_id,
            instructions: formData.instructions,
          })
          .eq('id', prescription.id);
        if (error) throw error;
      } else {
        console.log('About to insert prescription', formData);
        const user = await supabase.auth.getUser();
        if (!user.data.user) {
          throw new Error('User not authenticated');
        }
        const userId = user.data.user.id;
        const { data, error } = await supabase
          .from('prescriptions')
          .insert([{ patient_id: formData.patient_id, staff_id: formData.staff_id, instructions: formData.instructions, user_id: userId }])
          .select('id')
          .single();
        console.log('Insert result:', data, error);
        if (error) throw error;
        prescriptionId = data.id;
      }
      // Insert medicines
      if (prescriptionId) {
        // Delete old medicines if editing
        if (prescription) {
          await supabase.from('prescription_medicines').delete().eq('prescription_id', prescriptionId);
        }
        const medRows = medicines.map(med => ({ ...med, prescription_id: prescriptionId }));
        const { error: medError } = await supabase.from('prescription_medicines').insert(medRows);
        if (medError) throw medError;
      }
      onSave();
    } catch (error) {
      console.error('Error saving prescription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicineChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMedicines(prev => prev.map((med, i) => i === idx ? { ...med, [name]: value } : med));
  };

  const addMedicine = () => {
    setMedicines([...medicines, { medication_name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedicine = (idx: number) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {prescription ? 'Edit Prescription' : 'New Prescription'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient *
              </label>
              <select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.first_name} {patient.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prescribing Doctor *
              </label>
              <select
                name="staff_id"
                value={formData.staff_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Doctor</option>
                {staff.filter(member => member.role === 'dentist').map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Medicines</label>
            {medicines.map((med, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-2">
                <div>
                  <input
                    type="text"
                    name="medication_name"
                    value={med.medication_name}
                    onChange={e => handleMedicineChange(idx, e)}
                    required
                    placeholder="Medication Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="dosage"
                    value={med.dosage}
                    onChange={e => handleMedicineChange(idx, e)}
                    required
                    placeholder="Dosage"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    name="frequency"
                    value={med.frequency}
                    onChange={e => handleMedicineChange(idx, e)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="Every 4 hours">Every 4 hours</option>
                    <option value="Every 6 hours">Every 6 hours</option>
                    <option value="Every 8 hours">Every 8 hours</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    name="duration"
                    value={med.duration}
                    onChange={e => handleMedicineChange(idx, e)}
                    required
                    placeholder="Duration"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {medicines.length > 1 && (
                    <button type="button" onClick={() => removeMedicine(idx)} className="text-red-600 ml-2">&times;</button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" onClick={addMedicine} className="flex items-center text-blue-600 hover:text-blue-800 mt-2">
              <Plus className="h-4 w-4 mr-1" /> Add Medicine
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Special instructions for the patient (e.g., take with food, avoid alcohol, etc.)"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Saving...' : 'Save Prescription'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}