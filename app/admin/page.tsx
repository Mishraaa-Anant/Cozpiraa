'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Calendar,
  Clock,
  Search,
  Trash2,
  Phone,
  MessageSquare,
  LogOut,
  RefreshCw,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  X,
  User,
  Lock,
  Eye,
  EyeOff,
  Filter,
  Users,
  ShieldCheck,
  CalendarDays,
  Sun
} from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  age: number;
  phone: string;
  blood_group?: string;
  day: string;
  slot: string;
  status?: string;
  booking_ref?: string;
  created_at?: string;
}

const SLOT_LABELS: Record<string, string> = {
  '10:00-11:00': '10:00 AM – 11:00 AM',
  '11:00-12:00': '11:00 AM – 12:00 PM',
  '12:00-13:00': '12:00 PM – 01:00 PM',
  '13:00-14:00': '01:00 PM – 02:00 PM',
  '14:00-15:00': '02:00 PM – 03:00 PM',
  '15:00-16:00': '03:00 PM – 04:00 PM',
  '16:00-17:00': '04:00 PM – 05:00 PM',
  '17:00-18:00': '05:00 PM – 06:00 PM',
  '18:00-19:00': '06:00 PM – 07:00 PM',
  '19:00-20:00': '07:00 PM – 08:00 PM',
  '20:00-20:30': '08:00 PM – 08:30 PM',
};

const ALL_SLOTS = Object.keys(SLOT_LABELS);
const MAX_PER_SLOT = 10;

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'all' | 'today'>('dashboard');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterSlot, setFilterSlot] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Bulk delete state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem('cozpiraa_admin_logged');
    if (isAuth === 'true') {
      setAuthenticated(true);
      fetchAppointments();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      // Check admin_users table or fallback to default credentials
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username.trim())
        .single();

      if (!error && data && data.password === password) {
        sessionStorage.setItem('cozpiraa_admin_logged', 'true');
        setAuthenticated(true);
        fetchAppointments();
        return;
      }

      // Default backup login
      if (username.trim() === 'priyanka' && password === 'priyanka') {
        sessionStorage.setItem('cozpiraa_admin_logged', 'true');
        setAuthenticated(true);
        fetchAppointments();
        return;
      }

      setLoginError('Invalid username or password. Please try again.');
    } catch {
      if (username.trim() === 'priyanka' && password === 'priyanka') {
        sessionStorage.setItem('cozpiraa_admin_logged', 'true');
        setAuthenticated(true);
        fetchAppointments();
        return;
      }
      setLoginError('Authentication failed. Check your network or credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cozpiraa_admin_logged');
    setAuthenticated(false);
  };

  const fetchAppointments = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      triggerToast('Could not fetch appointments from database.', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Delete Single Appointment
  const handleDeleteAppointment = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', deleteTarget.id);

      if (error) throw error;

      setAppointments((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setSelectedIds((prev) => prev.filter((id) => id !== deleteTarget.id));
      triggerToast(`Appointment for ${deleteTarget.name} deleted successfully!`, 'success');
      setDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.error('Error deleting appointment:', err);
      triggerToast('Failed to delete appointment. Try again.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk Delete Appointments
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .in('id', selectedIds);

      if (error) throw error;

      const count = selectedIds.length;
      setAppointments((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
      setSelectedIds([]);
      triggerToast(`Successfully deleted ${count} appointment(s)!`, 'success');
      setBulkDeleteModalOpen(false);
    } catch (err) {
      console.error('Error bulk deleting appointments:', err);
      triggerToast('Failed to delete selected appointments.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Date helpers
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  const todayAppointments = appointments.filter((a) => a.day === todayStr);
  const tomorrowAppointments = appointments.filter((a) => a.day === tomorrowStr);

  const fullSlotsCount = ALL_SLOTS.filter((slot) => {
    const count = todayAppointments.filter((a) => a.slot === slot).length;
    return count >= MAX_PER_SLOT;
  }).length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      !searchTerm ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      (a.booking_ref && a.booking_ref.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.blood_group && a.blood_group.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDate = !filterDate || a.day === filterDate;
    const matchesSlot = !filterSlot || a.slot === filterSlot;
    const matchesStatus = !filterStatus || (a.status || 'confirmed') === filterStatus;

    return matchesSearch && matchesDate && matchesSlot && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAppointments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAppointments.map((a) => a.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // CSV Export
  const exportCSV = () => {
    const dataToExport = filteredAppointments.length > 0 ? filteredAppointments : appointments;
    const headers = ['Name', 'Age', 'Phone', 'Blood Group', 'Date', 'Slot', 'Status', 'Booking Ref', 'Booked At'];
    const rows = dataToExport.map((a) => [
      `"${a.name.replace(/"/g, '""')}"`,
      a.age,
      `"${a.phone}"`,
      a.blood_group || '-',
      a.day,
      `"${SLOT_LABELS[a.slot] || a.slot}"`,
      a.status || 'confirmed',
      a.booking_ref || '-',
      a.created_at ? new Date(a.created_at).toLocaleString() : '-'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cozpiraa_appointments_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('CSV Exported successfully!');
  };

  // LOGIN INTERFACE
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-sage-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-terracotta-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="bg-white rounded-3xl shadow-xl border border-sage-200/60 p-8 sm:p-10 w-full max-w-md relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-sage-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg mb-4">
              C
            </div>
            <h1 className="text-2xl font-bold text-charcoal-900 font-serif">Admin Portal</h1>
            <p className="text-sm text-charcoal-500 mt-1">Sign in to manage COZPIRAA patient appointments</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-sage-50/50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-600 text-charcoal-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 text-sm bg-sage-50/50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-600 text-charcoal-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-4 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-charcoal-400 mt-6">
            Default credentials: <code className="bg-sage-100 px-1.5 py-0.5 rounded text-sage-800">priyanka</code> / <code className="bg-sage-100 px-1.5 py-0.5 rounded text-sage-800">priyanka</code>
          </p>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-sage-50/60 font-sans text-charcoal-900 pb-16">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl border flex items-center gap-3 text-sm font-semibold transition-all animate-bounce ${
            toast.type === 'success'
              ? 'bg-emerald-800 text-white border-emerald-700'
              : 'bg-red-800 text-white border-red-700'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="bg-white border-b border-sage-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              C
            </div>
            <div>
              <h1 className="text-lg font-bold text-charcoal-900 font-serif leading-tight">COZPIRAA Admin</h1>
              <p className="text-xs text-charcoal-500">Dermatology & Cosmetology Appointment Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAppointments}
              disabled={refreshing}
              className="p-2.5 rounded-xl border border-sage-200 text-charcoal-600 hover:bg-sage-100 transition-colors flex items-center gap-2 text-xs font-semibold"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-sage-200/80 shadow-xs">
            <div className="flex items-center justify-between text-sage-600 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">Total Bookings</span>
              <Users className="w-5 h-5 text-sage-600" />
            </div>
            <div className="text-3xl font-extrabold text-charcoal-900">{appointments.length}</div>
            <div className="text-xs text-charcoal-500 mt-1">All-time records</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sage-200/80 shadow-xs">
            <div className="flex items-center justify-between text-terracotta-600 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">Today's Patients</span>
              <Sun className="w-5 h-5 text-terracotta-600" />
            </div>
            <div className="text-3xl font-extrabold text-charcoal-900">{todayAppointments.length}</div>
            <div className="text-xs text-charcoal-500 mt-1">{todayStr}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sage-200/80 shadow-xs">
            <div className="flex items-center justify-between text-amber-600 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">Full Slots Today</span>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-charcoal-900">{fullSlotsCount} / {ALL_SLOTS.length}</div>
            <div className="text-xs text-charcoal-500 mt-1">Slots at max capacity</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sage-200/80 shadow-xs">
            <div className="flex items-center justify-between text-blue-600 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">Tomorrow's Patients</span>
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-charcoal-900">{tomorrowAppointments.length}</div>
            <div className="text-xs text-charcoal-500 mt-1">{tomorrowStr}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-sage-200 pb-4">
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-sage-200 shadow-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-sage-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-sage-50'
              }`}
            >
              All Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'today'
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-sage-50'
              }`}
            >
              Today's Slots ({todayAppointments.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <button
                onClick={() => setBulkDeleteModalOpen(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}

            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-white border border-sage-200 text-charcoal-700 hover:bg-sage-100 text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* TAB 1 & 2: TABLE VIEWS (DASHBOARD & ALL) */}
        {(activeTab === 'dashboard' || activeTab === 'all') && (
          <div className="bg-white rounded-3xl border border-sage-200 shadow-sm overflow-hidden">
            {/* Search & Filter Bar */}
            <div className="p-4 sm:p-6 bg-sage-50/50 border-b border-sage-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, ref..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-600 text-charcoal-900"
                />
              </div>

              <div>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-600 text-charcoal-900"
                />
              </div>

              <div>
                <select
                  value={filterSlot}
                  onChange={(e) => setFilterSlot(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-600 text-charcoal-900"
                >
                  <option value="">All Time Slots</option>
                  {ALL_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {SLOT_LABELS[slot]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-600 text-charcoal-900"
                >
                  <option value="">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {(searchTerm || filterDate || filterSlot || filterStatus) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterDate('');
                      setFilterSlot('');
                      setFilterStatus('');
                    }}
                    className="p-2.5 bg-sage-200 text-charcoal-700 hover:bg-sage-300 rounded-xl text-xs font-semibold"
                    title="Clear Filters"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sage-100/60 text-charcoal-700 text-xs font-bold uppercase tracking-wider border-b border-sage-200">
                    <th className="py-4 px-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={
                          filteredAppointments.length > 0 &&
                          selectedIds.length === filteredAppointments.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-sage-300 text-sage-600 focus:ring-sage-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-4 px-4">Patient Name</th>
                    <th className="py-4 px-3 text-center">Age</th>
                    <th className="py-4 px-4">Phone Number</th>
                    <th className="py-4 px-3 text-center">Blood</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Time Slot</th>
                    <th className="py-4 px-3 text-center">Status</th>
                    <th className="py-4 px-4 text-center font-mono">Ref ID</th>
                    <th className="py-4 px-4 text-right">Delete & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-charcoal-400">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-sage-600" />
                        <span>Loading appointments from Supabase...</span>
                      </td>
                    </tr>
                  ) : filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-charcoal-400">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-sage-300" />
                        <p className="font-semibold text-charcoal-600">No appointments found</p>
                        <p className="text-xs text-charcoal-400">Try adjusting your filters or search query.</p>
                      </td>
                    </tr>
                  ) : (
                    (activeTab === 'dashboard'
                      ? filteredAppointments.slice(0, 15)
                      : filteredAppointments
                    ).map((apt) => {
                      const isSelected = selectedIds.includes(apt.id);
                      return (
                        <tr
                          key={apt.id}
                          className={`hover:bg-sage-50/80 transition-colors ${
                            isSelected ? 'bg-sage-100/50' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectRow(apt.id)}
                              className="rounded border-sage-300 text-sage-600 focus:ring-sage-500 cursor-pointer"
                            />
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                            {apt.name}
                          </td>

                          <td className="py-3.5 px-3 text-center font-medium text-charcoal-600">
                            {apt.age}
                          </td>

                          <td className="py-3.5 px-4 font-medium text-charcoal-700">
                            <a
                              href={`tel:${apt.phone}`}
                              className="hover:underline hover:text-sage-600 flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5 text-sage-600" />
                              {apt.phone}
                            </a>
                          </td>

                          <td className="py-3.5 px-3 text-center">
                            <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-md font-semibold text-[10px]">
                              {apt.blood_group || 'N/A'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-medium text-charcoal-700">
                            {apt.day}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sage-100 text-sage-800 rounded-lg text-[11px] font-semibold">
                              <Clock className="w-3 h-3 text-sage-600" />
                              {SLOT_LABELS[apt.slot] || apt.slot}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-center">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                              {apt.status || 'Confirmed'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-center font-mono text-[11px] text-charcoal-500">
                            {apt.booking_ref || '-'}
                          </td>

                          {/* DELETE & ACTIONS COLUMN */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/${apt.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                                title="WhatsApp Patient"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>

                              {/* DELETE BUTTON */}
                              <button
                                onClick={() => {
                                  setDeleteTarget(apt);
                                  setDeleteModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors font-semibold flex items-center gap-1"
                                title="Delete Appointment"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-sage-50/50 border-t border-sage-200 flex items-center justify-between text-xs text-charcoal-500">
              <span>
                Showing {filteredAppointments.length} of {appointments.length} appointments
              </span>
              {selectedIds.length > 0 && (
                <span className="font-semibold text-red-600">
                  {selectedIds.length} appointment(s) selected for deletion
                </span>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TODAY'S SLOTS GRID */}
        {activeTab === 'today' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_SLOTS.map((slot) => {
              const patientsInSlot = todayAppointments.filter((a) => a.slot === slot);
              const count = patientsInSlot.length;
              const isFull = count >= MAX_PER_SLOT;

              return (
                <div
                  key={slot}
                  className="bg-white rounded-3xl border border-sage-200 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sage-800 font-bold text-sm">
                        <Clock className="w-4 h-4 text-sage-600" />
                        <span>{SLOT_LABELS[slot]}</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                          isFull
                            ? 'bg-red-100 text-red-700'
                            : count > 5
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isFull ? 'Full' : `${count} / ${MAX_PER_SLOT}`}
                      </span>
                    </div>

                    <div className="w-full bg-sage-100 h-1.5 rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isFull ? 'bg-red-500' : count > 5 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min((count / MAX_PER_SLOT) * 100, 100)}%` }}
                      />
                    </div>

                    <div className="space-y-2">
                      {patientsInSlot.length === 0 ? (
                        <p className="text-xs text-charcoal-400 italic py-2">No bookings for this slot yet.</p>
                      ) : (
                        patientsInSlot.map((patient) => (
                          <div
                            key={patient.id}
                            className="p-3 bg-sage-50/70 rounded-2xl border border-sage-100 flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-bold text-charcoal-900">{patient.name}</div>
                              <div className="text-[11px] text-charcoal-500 flex items-center gap-2 mt-0.5">
                                <span>Age: {patient.age}</span>
                                <span>•</span>
                                <a
                                  href={`tel:${patient.phone}`}
                                  className="text-sage-700 font-semibold hover:underline"
                                >
                                  {patient.phone}
                                </a>
                              </div>
                            </div>

                            {/* DELETE BUTTON IN TODAY'S SLOT CARD */}
                            <button
                              onClick={() => {
                                setDeleteTarget(patient);
                                setDeleteModalOpen(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                              title="Delete Appointment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* SINGLE DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-sage-200 text-center animate-scaleUp">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-charcoal-900 font-serif mb-2">Delete Appointment?</h3>
            <p className="text-xs text-charcoal-600 mb-6 leading-relaxed">
              Are you sure you want to permanently delete the appointment for{' '}
              <strong className="text-charcoal-900">{deleteTarget.name}</strong> ({deleteTarget.day} at{' '}
              {SLOT_LABELS[deleteTarget.slot] || deleteTarget.slot})?
              <span className="block text-red-600 mt-1 font-medium">This action cannot be undone.</span>
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteTarget(null);
                }}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 bg-sage-100 hover:bg-sage-200 text-charcoal-800 font-bold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAppointment}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BULK DELETE CONFIRMATION MODAL */}
      {bulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-sage-200 text-center">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-charcoal-900 font-serif mb-2">Delete {selectedIds.length} Appointments?</h3>
            <p className="text-xs text-charcoal-600 mb-6 leading-relaxed">
              You are about to permanently delete <strong className="text-red-600">{selectedIds.length} selected appointments</strong> from Supabase.
              This cannot be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setBulkDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 bg-sage-100 hover:bg-sage-200 text-charcoal-800 font-bold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete All Selected</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
