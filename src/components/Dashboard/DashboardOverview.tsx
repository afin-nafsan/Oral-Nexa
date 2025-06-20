import React from 'react';
import { Users, Calendar, DollarSign, Activity, TrendingUp, Clock, FileText } from 'lucide-react';
import { LineChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { usePatients, useAppointments, useExpenses, useTreatments, useStaff, usePrescriptions } from '../../hooks/useSupabase';
import { format, isToday, isThisMonth, parseISO } from 'date-fns';

export default function DashboardOverview() {
  const { patients } = usePatients();
  const { appointments } = useAppointments();
  const { expenses } = useExpenses();
  const { treatments } = useTreatments();
  const { staff } = useStaff();
  const { prescriptions } = usePrescriptions();

  // Total Patients
  const totalPatients = patients.length;

  // Today's Appointments (exclude cancelled)
  const todaysAppointments = appointments.filter(a => {
    const date = a.appointment_date ? new Date(a.appointment_date) : null;
    return date && isToday(date) && a.status !== 'cancelled';
  });

  // Monthly Revenue (sum of expenses for this month)
  const monthlyRevenue = expenses
    .filter(e => e.expense_date && isThisMonth(new Date(e.expense_date)))
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  // Treatments Done (exclude cancelled)
  const treatmentsDone = appointments.filter(a => a.status !== 'cancelled').length;

  // Revenue Trend (group by month)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueByMonth = Array(6).fill(0).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const revenue = expenses
      .filter(e => {
        const date = e.expense_date ? new Date(e.expense_date) : null;
        return date && date.getMonth() === d.getMonth() && date.getFullYear() === year;
      })
      .reduce((sum, e) => sum + (e.amount || 0), 0);
    const appts = appointments
      .filter(a => {
        const date = a.appointment_date ? new Date(a.appointment_date) : null;
        return date && date.getMonth() === d.getMonth() && date.getFullYear() === year;
      }).length;
    return { month, revenue, appointments: appts };
  });

  // Treatment Distribution (by treatment name in appointments)
  const treatmentCounts: Record<string, number> = {};
  appointments.forEach(a => {
    if (a.treatments && a.treatments.name) {
      treatmentCounts[a.treatments.name] = (treatmentCounts[a.treatments.name] || 0) + 1;
    }
  });
  const treatmentData = (Object.entries(treatmentCounts) as [string, number][]).map(([name, value], i) => ({
    name,
    value: Number(value),
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5],
  }));

  // Recent Activities (last 4 appointments)
  const recentActivities = appointments.slice(-4).reverse().map(a => ({
    action: 'Appointment scheduled',
    patient: a.patients ? `${a.patients.first_name} ${a.patients.last_name}` : 'Unknown',
    time: a.appointment_date ? format(new Date(a.appointment_date), 'MMM dd, yyyy') : '',
    type: 'calendar',
  }));

  // Staff count
  const staffCount = staff.length;

  // Total Prescriptions
  const totalPrescriptions = prescriptions.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Patients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalPatients}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        {/* Total Staff */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{staffCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        {/* Total Prescriptions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Prescriptions</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalPrescriptions}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{todaysAppointments.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        {/* Treatments Done */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Treatments Done</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{treatmentsDone}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                fill="url(#colorRevenue)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Treatment Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={treatmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {treatmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {treatmentData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <div className="space-y-4">
            {todaysAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patients ? `${appointment.patients.first_name} ${appointment.patients.last_name}` : 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{appointment.treatments ? appointment.treatments.name : 'N/A'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.appointment_date ? format(new Date(appointment.appointment_date), 'hh:mm a') : ''}</p>
                  <span className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-800`}>
                    confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-yellow-100`}>
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.patient}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}