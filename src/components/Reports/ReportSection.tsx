import React, { useState } from 'react';
import { useExpenses, usePatients } from '../../hooks/useSupabase';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function groupByDate(expenses: any[]): Record<string, any[]> {
  return expenses.reduce((acc: Record<string, any[]>, exp: any) => {
    const date = exp.expense_date ? format(new Date(exp.expense_date), 'yyyy-MM-dd') : 'Unknown';
    if (!acc[date]) acc[date] = [];
    acc[date].push(exp);
    return acc;
  }, {});
}

export default function ReportSection() {
  const { expenses, loading, error } = useExpenses({ includeClosed: true });
  const { patients } = usePatients();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getPatientName = (id: string) => {
    if (!id) return '-';
    const patient = patients.find((p: any) => p.id === id);
    return patient ? `${patient.first_name} ${patient.last_name}` : id;
  };

  const handleDownloadExcel = () => {
    // Flatten all expenses into a single array
    const data = expenses.map((exp: any) => ({
      Date: exp.expense_date ? format(new Date(exp.expense_date), 'yyyy-MM-dd') : 'Unknown',
      Type: exp.type || '-',
      Category: exp.category,
      Description: exp.description || '-',
      Patient: getPatientName(exp.patient_id),
      'Payment Method': exp.payment_method,
      'Transaction ID': exp.transaction_id || '-',
      Amount: exp.amount,
      'Closed At': exp.closed_at ? format(new Date(exp.closed_at), 'yyyy-MM-dd HH:mm') : '-',
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Expense_Sales_Report.xlsx');
  };

  const handleDownloadDateWiseExcel = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    const filteredExpenses = expenses.filter((exp: any) => {
      if (!exp.expense_date) return false;
      const expenseDate = format(new Date(exp.expense_date), 'yyyy-MM-dd');
      return expenseDate >= startDate && expenseDate <= endDate;
    });

    const data = filteredExpenses.map((exp: any) => ({
      Date: exp.expense_date ? format(new Date(exp.expense_date), 'yyyy-MM-dd') : 'Unknown',
      Type: exp.type || '-',
      Category: exp.category,
      Description: exp.description || '-',
      Patient: getPatientName(exp.patient_id),
      'Payment Method': exp.payment_method,
      'Transaction ID': exp.transaction_id || '-',
      Amount: exp.amount,
      'Closed At': exp.closed_at ? format(new Date(exp.closed_at), 'yyyy-MM-dd HH:mm') : '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Date_Wise_Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Expense_Sales_Report_${startDate}_to_${endDate}.xlsx`);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  const grouped = groupByDate(expenses);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Expense & Sales Report (Day-wise)</h2>
      <div className="mb-4 flex gap-4 items-center">
        <button
          onClick={handleDownloadExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download All Excel
        </button>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="Start Date"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="End Date"
          />
          <button
            onClick={handleDownloadDateWiseExcel}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download Date-wise Excel
          </button>
        </div>
      </div>
      {sortedDates.map((date: string) => (
        <div key={date} className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">{date}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Closed At</th>
                </tr>
              </thead>
              <tbody>
                {[...grouped[date]].reverse().map((exp: any) => (
                  <tr key={exp.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2 whitespace-nowrap">{exp.type || '-'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{exp.category}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{exp.description || '-'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{getPatientName(exp.patient_id)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{exp.payment_method}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{exp.transaction_id || '-'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">₹{parseFloat(exp.amount).toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{exp.closed_at ? format(new Date(exp.closed_at), 'yyyy-MM-dd HH:mm') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
} 