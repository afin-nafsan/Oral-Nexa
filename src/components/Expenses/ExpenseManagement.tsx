import React, { useState, useEffect } from 'react';
import { Plus, Search, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useExpenses, usePatients } from '../../hooks/useSupabase';
import ExpenseForm from './ExpenseForm';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { useSettings } from '../../contexts/SettingsContext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ExpenseManagement() {
  const { expenses, loading, refetch } = useExpenses();
  const { patients } = usePatients();
  const { billingSettings } = useSettings();
  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Get currency symbol
  const getCurrencySymbol = () => {
    switch (billingSettings.currency) {
      case 'INR': return '₹';
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '₹';
    }
  };

  const currencySymbol = getCurrencySymbol();

  useEffect(() => {
    // On mount, set both startDate and endDate to today
    const today = new Date().toISOString().slice(0, 10);
    setStartDate(today);
    setEndDate(today);
  }, []);

  const handleClearAll = () => {
    const today = new Date().toISOString().slice(0, 10);
    setStartDate(today);
    setEndDate(today);
  };

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = (exp.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (exp.vendor?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (exp.transaction_id?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;
    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(exp.expense_date).toISOString().slice(0, 10) >= startDate;
    }
    if (endDate) {
      matchesDate = matchesDate && new Date(exp.expense_date).toISOString().slice(0, 10) <= endDate;
    }
    return matchesSearch && matchesCategory && matchesDate;
  });

  const totalCredits = expenses.filter(exp => exp.type === 'credit').reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const totalDebits = expenses.filter(exp => exp.type === 'debit').reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const monthlyCredits = expenses.filter(exp => exp.type === 'credit' && new Date(exp.expense_date).getMonth() === new Date().getMonth()).reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const monthlyDebits = expenses.filter(exp => exp.type === 'debit' && new Date(exp.expense_date).getMonth() === new Date().getMonth()).reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  const handleAdd = () => {
    setSelectedExpense(null);
    setShowForm(true);
  };

  const handleEdit = (exp: any) => {
    setSelectedExpense(exp);
    setShowForm(true);
  };

  const handleDelete = async (expId: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expId);
    if (error) {
      alert('Failed to delete transaction: ' + error.message);
    } else {
      refetch();
    }
  };

  // Helper to get patient name by id
  const getPatientName = (id: string) => {
    if (!id) return '-';
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.first_name} ${patient.last_name}` : id;
  };

  // Excel export function
  const handleDownloadExcel = () => {
    const dataToExport = filteredExpenses.map(exp => ({
      Date: exp.expense_date ? format(new Date(exp.expense_date), 'yyyy-MM-dd') : '',
      Type: exp.type,
      Category: exp.category,
      Description: exp.description,
      Patient: getPatientName(exp.patient_id),
      'Payment Method': exp.payment_method,
      'Transaction ID': exp.transaction_id,
      Amount: `${currencySymbol}${exp.amount}`,
      Vendor: exp.vendor,
      'Receipt Number': exp.receipt_number,
      Notes: exp.notes,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'expenses_report.xlsx');
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
          <h2 className="text-2xl font-bold text-gray-900">Expense Management</h2>
          <p className="text-gray-500 mt-1">Record and manage all clinic credits and debits</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Transaction</span>
          </button>
          <button
            onClick={handleDownloadExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            Download as Excel
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="search"
            placeholder="Search by description, vendor, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="equipment">Equipment</option>
          <option value="supplies">Supplies</option>
          <option value="utilities">Utilities</option>
          <option value="rent">Rent</option>
          <option value="insurance">Insurance</option>
          <option value="maintenance">Maintenance</option>
          <option value="marketing">Marketing</option>
          <option value="software">Software</option>
          <option value="income">Income</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleClearAll}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{currencySymbol}{totalCredits.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Total Credits</div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">{currencySymbol}{totalDebits.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Total Debits</div>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{currencySymbol}{monthlyCredits.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Credits This Month</div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">{currencySymbol}{monthlyDebits.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Debits This Month</div>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...filteredExpenses].reverse().map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {exp.expense_date ? format(new Date(exp.expense_date), 'MMM dd, yyyy') : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      exp.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {exp.type === 'credit' ? 'Credit' : 'Debit'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{exp.description || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getPatientName(exp.patient_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exp.payment_method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exp.transaction_id || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm font-medium ${exp.type === 'credit' ? 'text-green-700' : 'text-red-700'}`}>
                      <span className="mr-1 text-gray-400">{currencySymbol}</span>
                      {parseFloat(exp.amount).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-colors" onClick={() => handleDelete(exp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <ExpenseForm
          expense={selectedExpense}
          onClose={() => {
            setShowForm(false);
            setSelectedExpense(null);
          }}
          onSave={() => {
            refetch();
            setShowForm(false);
            setSelectedExpense(null);
          }}
        />
      )}
    </div>
  );
}