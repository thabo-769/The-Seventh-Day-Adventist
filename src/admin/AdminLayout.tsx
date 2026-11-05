import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { SdaLogo } from '../components/common/SdaLogo';
import {
  LayoutDashboard,
  Video,
  Calendar,
  Layers,
  Bell,
  Clock,
  Image,
  Users,
  BookOpen,
  Heart,
  Mail,
  Settings,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { currentUser, switchUserRole, visitors, bibleStudies, messages, prayers } = useChurch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingVisitors = visitors.filter((v) => v.status === 'Pending').length;
  const newBibleStudies = bibleStudies.filter((b) => b.status === 'New').length;
  const unreadMessages = messages.filter((m) => m.status === 'Unread').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'sermons', label: 'Sermons', icon: Video },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'ministries', label: 'Ministries', icon: Layers },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'programmes', label: 'Programmes', icon: Clock },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'visitors', label: 'Visitors', icon: Users, badge: pendingVisitors },
    { id: 'biblestudies', label: 'Bible Studies', icon: BookOpen, badge: newBibleStudies },
    { id: 'prayers', label: 'Prayer Requests', icon: Heart },
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadMessages },
    { id: 'settings', label: 'Website Settings', icon: Settings },
    { id: 'users', label: 'User Management', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F9] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <SdaLogo size={32} variant="blue" showText={false} />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-[#005482] block leading-none">
                SDA Church Portal
              </span>
              <span className="text-[11px] text-stone-500 font-medium">Administration System</span>
            </div>
          </Link>
        </div>

        {/* Right: Role Switcher & Live Link */}
        <div className="flex items-center gap-4">
          {/* Quick role simulator */}
          <div className="hidden sm:flex items-center gap-2 bg-[#F5F7F9] px-3 py-1.5 rounded-lg border border-stone-200 text-xs">
            <span className="text-stone-500">Active Role:</span>
            <select
              value={currentUser.role}
              onChange={(e) => switchUserRole(e.target.value as any)}
              className="font-bold text-[#005482] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Super Administrator">Super Administrator</option>
              <option value="Administrator">Administrator</option>
              <option value="Content Editor">Content Editor</option>
            </select>
          </div>

          <Link
            to="/"
            className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#080B10] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } lg:border-r border-white/10`}
        >
          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
            <div className="px-3 pb-3 mb-2 border-b border-white/10">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[11px] text-[#397CA0] font-mono">{currentUser.role}</div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#005482] text-white shadow-sm font-semibold'
                      : 'text-stone-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 text-[#397CA0]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#397CA0] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer of Sidebar */}
          <div className="p-3 border-t border-white/10 text-xs">
            <Link
              to="/"
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin Portal</span>
            </Link>
          </div>
        </aside>

        {/* Overlay for mobile drawer */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
