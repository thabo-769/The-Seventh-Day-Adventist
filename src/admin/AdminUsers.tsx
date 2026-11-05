import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { AdminUser } from '../types';
import { Shield, Plus, UserCheck, UserX, X, ShieldAlert } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { users, currentUser, switchUserRole, addUser, toggleUserActive } = useChurch();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Administrator' as AdminUser['role'],
    active: true,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    addUser(form);
    setIsAddOpen(false);
    setForm({
      name: '',
      email: '',
      role: 'Administrator',
      active: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">User Management & Permissions</h2>
          <p className="text-xs text-stone-500">
            Control role-based access for pastors, ministry leaders, and media editors.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Account</span>
        </button>
      </div>

      {/* Role explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200">
          <div className="font-bold text-xs uppercase tracking-wider text-[#005482] mb-1">
            Super Administrator
          </div>
          <p className="text-xs text-stone-600">Full system control, website settings, and administrative user provisioning.</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-stone-200">
          <div className="font-bold text-xs uppercase tracking-wider text-[#005482] mb-1">
            Administrator
          </div>
          <p className="text-xs text-stone-600">Manages visitors, sermons, events, prayer requests, and worship schedules.</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-stone-200">
          <div className="font-bold text-xs uppercase tracking-wider text-[#005482] mb-1">
            Content Editor
          </div>
          <p className="text-xs text-stone-600">Uploads media sermons, bulletin announcements, and gallery photos.</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7F9] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role Assigned</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div className="font-bold">{u.name}</div>
                    {currentUser.id === u.id && (
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        You (Active Session)
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-600">{u.email}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF3F8] text-[#005482]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-stone-400 font-mono">
                    {u.lastLogin}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {u.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => switchUserRole(u.role)}
                        className="px-2.5 py-1 text-xs font-semibold text-[#005482] hover:bg-[#EAF3F8] rounded transition-colors"
                      >
                        Simulate Role
                      </button>
                      <button
                        onClick={() => toggleUserActive(u.id)}
                        className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded"
                        title={u.active ? 'Deactivate User' : 'Activate User'}
                      >
                        {u.active ? <UserX className="w-3.5 h-3.5 text-rose-500" /> : <UserCheck className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-white">Add Staff Administrator</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Elder James White"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Official Church Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="elder.james@adventistchurch.org"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Role & Permissions</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white font-medium"
                >
                  <option value="Super Administrator">Super Administrator</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Content Editor">Content Editor</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
