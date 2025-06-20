import React, { useState } from 'react';
import { Plus, Search, FileText, User, Calendar } from 'lucide-react';
import { usePrescriptions, usePatients, useStaff } from '../../hooks/useSupabase';
import PrescriptionForm from './PrescriptionForm';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';
// @ts-ignore
import jsPDF from 'jspdf';

export default function PrescriptionManagement() {
  const { prescriptions, loading, refetch } = usePrescriptions();
  const { patients } = usePatients();
  const { staff } = useStaff();
  const [showForm, setShowForm] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patients &&
    `${prescription.patients.first_name} ${prescription.patients.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medication_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedPrescription(null);
    setShowForm(true);
  };

  const handleEdit = (prescription: any) => {
    setSelectedPrescription(prescription);
    setShowForm(true);
  };

  const handleDelete = async (prescriptionId: string) => {
    if (!window.confirm('Are you sure you want to delete this prescription?')) return;
    // Delete medicines first (optional if ON DELETE CASCADE is set)
    await supabase.from('prescription_medicines').delete().eq('prescription_id', prescriptionId);
    // Delete the prescription
    const { error } = await supabase.from('prescriptions').delete().eq('id', prescriptionId);
    if (!error) {
      refetch();
    } else {
      alert('Failed to delete prescription');
    }
  };

  const handlePrint = (prescription: any) => {
    const doc = new jsPDF();
    let y = 15;
    doc.setFontSize(18);
    doc.text('Prescription', 105, y, { align: 'center' });
    y += 10;
    doc.setFontSize(12);
    doc.text(`Date: ${prescription.prescribed_date ? new Date(prescription.prescribed_date).toLocaleDateString() : ''}`, 15, y);
    y += 10;
    doc.text(`Patient: ${prescription.patients ? `${prescription.patients.first_name} ${prescription.patients.last_name}` : 'Unknown'}`, 15, y);
    y += 8;
    doc.text(`Doctor: ${prescription.staff ? `Dr. ${prescription.staff.first_name} ${prescription.staff.last_name}` : 'Unassigned'}`, 15, y);
    y += 8;
    doc.text('Medicines:', 15, y);
    y += 8;
    if (prescription.prescription_medicines && prescription.prescription_medicines.length > 0) {
      prescription.prescription_medicines.forEach((med: any, idx: number) => {
        doc.text(
          `${idx + 1}. ${med.medication_name} - ${med.dosage}, ${med.frequency}, ${med.duration}`,
          20,
          y
        );
        y += 7;
      });
    } else {
      doc.text('No medicines', 20, y);
      y += 7;
    }
    if (prescription.instructions) {
      y += 5;
      doc.text('Instructions:', 15, y);
      y += 7;
      doc.text(doc.splitTextToSize(prescription.instructions, 170), 20, y);
    }
    doc.save(`prescription_${prescription.id.slice(0, 8)}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prescription Management</h2>
          <p className="text-gray-500 mt-1">Manage patient prescriptions and medications</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search prescriptions by patient name or medication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{prescriptions.length}</div>
          <div className="text-sm text-gray-500">Total Prescriptions</div>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage & Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescribed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {prescription.patients ? 
                            `${prescription.patients.first_name} ${prescription.patients.last_name}` : 
                            'Unknown Patient'
                          }
                        </div>
                        <div className="text-sm text-gray-500">ID: {prescription.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {prescription.prescription_medicines && prescription.prescription_medicines.length > 0 ? (
                        prescription.prescription_medicines.map((med: any, idx: number) => (
                          <div key={idx} className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-400" />
                            <div className="text-sm font-medium text-gray-900">{med.medication_name}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">No medicines</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {prescription.prescription_medicines && prescription.prescription_medicines.length > 0 ? (
                        prescription.prescription_medicines.map((med: any, idx: number) => (
                          <div key={idx} className="text-sm text-gray-900">{med.dosage} <span className="text-gray-500">{med.frequency}</span></div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">-</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col gap-1">
                      {prescription.prescription_medicines && prescription.prescription_medicines.length > 0 ? (
                        prescription.prescription_medicines.map((med: any, idx: number) => (
                          <div key={idx}>{med.duration}</div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">-</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {prescription.staff ? 
                      `Dr. ${prescription.staff.first_name} ${prescription.staff.last_name}` : 
                      'Unassigned'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {format(new Date(prescription.prescribed_date), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(prescription)}
                      className="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                    >
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-900 transition-colors mr-3" onClick={() => handlePrint(prescription)}>
                      Print
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-colors" onClick={() => handleDelete(prescription.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescription Form Modal */}
      {showForm && (
        <PrescriptionForm
          prescription={selectedPrescription}
          patients={patients}
          staff={staff}
          onClose={() => {
            setShowForm(false);
            setSelectedPrescription(null);
          }}
          onSave={() => {
            refetch();
            setShowForm(false);
            setSelectedPrescription(null);
          }}
        />
      )}
    </div>
  );
}