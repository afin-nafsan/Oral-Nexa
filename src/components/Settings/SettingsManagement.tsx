import React, { useState } from 'react';
import { 
  Building2, 
  CreditCard, 
  Bell, 
  Users, 
  Shield, 
  Database, 
  Palette,
  Save,
  X,
  Edit,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState('practice');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { 
    practiceInfo, 
    billingSettings, 
    notificationSettings, 
    updatePracticeInfo, 
    updateBillingSettings, 
    updateNotificationSettings,
    loading 
  } = useSettings();

  const [localPracticeInfo, setLocalPracticeInfo] = useState(practiceInfo);
  const [localBillingSettings, setLocalBillingSettings] = useState(billingSettings);
  const [localNotificationSettings, setLocalNotificationSettings] = useState(notificationSettings);

  // Update local state when context changes
  React.useEffect(() => {
    setLocalPracticeInfo(practiceInfo);
    setLocalBillingSettings(billingSettings);
    setLocalNotificationSettings(notificationSettings);
  }, [practiceInfo, billingSettings, notificationSettings]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah@oralnexa.com', role: 'Owner', status: 'Active' },
    { id: 2, name: 'Dr. Mike Chen', email: 'mike@oralnexa.com', role: 'Dentist', status: 'Active' },
    { id: 3, name: 'Lisa Rodriguez', email: 'lisa@oralnexa.com', role: 'Receptionist', status: 'Active' },
    { id: 4, name: 'Tom Wilson', email: 'tom@oralnexa.com', role: 'Hygienist', status: 'Inactive' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Receptionist' });

  const handleSavePracticeInfo = async () => {
    try {
      setIsSaving(true);
      await updatePracticeInfo(localPracticeInfo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving practice info:', error);
      alert('Failed to save practice information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveBillingSettings = async () => {
    try {
      setIsSaving(true);
      await updateBillingSettings(localBillingSettings);
    } catch (error) {
      console.error('Error saving billing settings:', error);
      alert('Failed to save billing settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotificationSettings = async () => {
    try {
      setIsSaving(true);
      await updateNotificationSettings(localNotificationSettings);
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Failed to save notification settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { 
        id: users.length + 1, 
        name: newUser.name, 
        email: newUser.email, 
        role: newUser.role, 
        status: 'Active' 
      }]);
      setNewUser({ name: '', email: '', role: 'Receptionist' });
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const tabs = [
    { id: 'practice', name: 'Practice Info', icon: Building2 },
    { id: 'billing', name: 'Billing & Payments', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'backup', name: 'Backup & Data', icon: Database }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  const renderPracticeInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Practice Information</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSavePracticeInfo}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Check className="h-4 w-4" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setLocalPracticeInfo(practiceInfo); // Reset to original values
              }}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name</label>
          <input
            type="text"
            value={localPracticeInfo.name}
            onChange={(e) => setLocalPracticeInfo({...localPracticeInfo, name: e.target.value})}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={localPracticeInfo.phone}
            onChange={(e) => setLocalPracticeInfo({...localPracticeInfo, phone: e.target.value})}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={localPracticeInfo.email}
            onChange={(e) => setLocalPracticeInfo({...localPracticeInfo, email: e.target.value})}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={localPracticeInfo.website}
            onChange={(e) => setLocalPracticeInfo({...localPracticeInfo, website: e.target.value})}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={localPracticeInfo.address}
            onChange={(e) => setLocalPracticeInfo({...localPracticeInfo, address: e.target.value})}
            disabled={!isEditing}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
          <input
            type="text"
            value={localPracticeInfo.license}
            onChange={(e) => setLocalPracticeInfo({...localPracticeInfo, license: e.target.value})}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
          <input
            type="text"
            value={localPracticeInfo.taxId}
            onChange={(e) => setLocalPracticeInfo({...localPracticeInfo, taxId: e.target.value})}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Billing & Payment Settings</h3>
        <button
          onClick={handleSaveBillingSettings}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={localBillingSettings.currency}
            onChange={(e) => setLocalBillingSettings({...localBillingSettings, currency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
          <input
            type="number"
            value={localBillingSettings.taxRate}
            onChange={(e) => setLocalBillingSettings({...localBillingSettings, taxRate: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Prefix</label>
          <input
            type="text"
            value={localBillingSettings.invoicePrefix}
            onChange={(e) => setLocalBillingSettings({...localBillingSettings, invoicePrefix: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoInvoice"
            checked={localBillingSettings.autoInvoice}
            onChange={(e) => setLocalBillingSettings({...localBillingSettings, autoInvoice: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="autoInvoice" className="ml-2 block text-sm text-gray-900">
            Auto-generate invoices after appointments
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accepted Payment Methods</label>
        <div className="space-y-2">
          {['Cash', 'Card', 'UPI', 'Bank Transfer', 'Cheque', 'Insurance'].map(method => (
            <label key={method} className="flex items-center">
              <input
                type="checkbox"
                checked={localBillingSettings.paymentMethods.includes(method)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLocalBillingSettings({
                      ...localBillingSettings,
                      paymentMethods: [...localBillingSettings.paymentMethods, method]
                    });
                  } else {
                    setLocalBillingSettings({
                      ...localBillingSettings,
                      paymentMethods: localBillingSettings.paymentMethods.filter(m => m !== method)
                    });
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-900">{method}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        <button
          onClick={handleSaveNotificationSettings}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <input
            type="checkbox"
            checked={localNotificationSettings.emailNotifications}
            onChange={(e) => setLocalNotificationSettings({...localNotificationSettings, emailNotifications: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">SMS Notifications</h4>
            <p className="text-sm text-gray-500">Receive notifications via SMS</p>
          </div>
          <input
            type="checkbox"
            checked={localNotificationSettings.smsNotifications}
            onChange={(e) => setLocalNotificationSettings({...localNotificationSettings, smsNotifications: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Appointment Reminders</h4>
            <p className="text-sm text-gray-500">Send reminders before appointments</p>
          </div>
          <input
            type="checkbox"
            checked={localNotificationSettings.appointmentReminders}
            onChange={(e) => setLocalNotificationSettings({...localNotificationSettings, appointmentReminders: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Payment Reminders</h4>
            <p className="text-sm text-gray-500">Send reminders for pending payments</p>
          </div>
          <input
            type="checkbox"
            checked={localNotificationSettings.paymentReminders}
            onChange={(e) => setLocalNotificationSettings({...localNotificationSettings, paymentReminders: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">System Alerts</h4>
            <p className="text-sm text-gray-500">Receive system maintenance and update alerts</p>
          </div>
          <input
            type="checkbox"
            checked={localNotificationSettings.systemAlerts}
            onChange={(e) => setLocalNotificationSettings({...localNotificationSettings, systemAlerts: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4">Add New User</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Owner">Owner</option>
            <option value="Dentist">Dentist</option>
            <option value="Hygienist">Hygienist</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Assistant">Assistant</option>
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Password Policy</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Require strong passwords (minimum 8 characters)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Require password change every 90 days</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-900">Enable two-factor authentication</span>
            </label>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Session Management</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Auto-logout after 30 minutes of inactivity</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-900">Log all login attempts</span>
            </label>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Data Privacy</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Encrypt sensitive patient data</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-900">Enable audit logging for all data access</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Backup & Data Management</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Automatic Backups</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Enable daily automatic backups</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-900">Include patient images and documents</span>
            </label>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Data Retention</h4>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Keep patient records for</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="7">7 years (Recommended)</option>
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="indefinite">Indefinitely</option>
            </select>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Manual Actions</h4>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create Backup Now
            </button>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              Export All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'practice':
        return renderPracticeInfo();
      case 'billing':
        return renderBillingSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'users':
        return renderUserManagement();
      case 'security':
        return renderSecuritySettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderPracticeInfo();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your practice settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 