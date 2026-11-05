import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Video,
  Calendar,
  Users,
  BookOpen,
  Mail,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigate: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const { sermons, events, visitors, bibleStudies, messages, currentUser, announcements } = useChurch();

  const pendingVisitors = visitors.filter((v) => v.status === 'Pending').length;
  const newBibleStudies = bibleStudies.filter((b) => b.status === 'New').length;
  const unreadMessages = messages.filter((m) => m.status === 'Unread').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-[#005482] mb-1">
            Seventh-day Adventist Church Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#080B10]">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            System status: Operational · Role permissions: <strong className="text-stone-700">{currentUser.role}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('sermons')}
            className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-xs transition-colors"
          >
            + Add Sermon
          </button>
          <button
            onClick={() => onNavigate('events')}
            className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#005482] bg-[#EAF3F8] hover:bg-[#d8e9f3] rounded-lg transition-colors"
          >
            + New Event
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => onNavigate('sermons')}
          className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#005482] cursor-pointer shadow-xs transition-all"
        >
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-600">Sermons</span>
            <Video className="w-4 h-4 text-[#005482]" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">{sermons.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">Active in media centre</div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => onNavigate('events')}
          className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#005482] cursor-pointer shadow-xs transition-all"
        >
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-600">Events</span>
            <Calendar className="w-4 h-4 text-[#005482]" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">{events.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">Scheduled activities</div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => onNavigate('visitors')}
          className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#005482] cursor-pointer shadow-xs transition-all"
        >
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-600">Visitors</span>
            <Users className="w-4 h-4 text-[#005482]" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">{visitors.length}</div>
          <div className="text-[11px] text-[#005482] font-semibold mt-1">
            {pendingVisitors} pending contact
          </div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => onNavigate('biblestudies')}
          className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#005482] cursor-pointer shadow-xs transition-all"
        >
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-600">Bible Studies</span>
            <BookOpen className="w-4 h-4 text-[#005482]" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">{bibleStudies.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            {newBibleStudies} new requests
          </div>
        </div>

        {/* Card 5 */}
        <div
          onClick={() => onNavigate('messages')}
          className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#005482] cursor-pointer shadow-xs transition-all"
        >
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold text-stone-600">Messages</span>
            <Mail className="w-4 h-4 text-[#005482]" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">{messages.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            {unreadMessages} unread enquiries
          </div>
        </div>
      </div>

      {/* Visual Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold font-serif text-stone-900">
                Monthly Spiritual Engagement & Growth
              </h3>
              <p className="text-xs text-stone-500">
                Sermon streams, visitor registrations, and Bible study requests over the last 6 months.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#005482] bg-[#EAF3F8] px-2.5 py-1 rounded">
              +28% YOY Growth
            </span>
          </div>

          {/* Simple CSS Bar Chart */}
          <div className="space-y-4 pt-2">
            {[
              { month: 'Oct 2025', streams: 1420, visitors: 28, studies: 14, percent: 65 },
              { month: 'Nov 2025', streams: 1680, visitors: 34, studies: 19, percent: 74 },
              { month: 'Dec 2025', streams: 2150, visitors: 52, studies: 22, percent: 88 },
              { month: 'Jan 2026', streams: 1920, visitors: 41, studies: 26, percent: 80 },
              { month: 'Feb 2026', streams: 2340, visitors: 48, studies: 31, percent: 92 },
              { month: 'Mar 2026', streams: 2580, visitors: 64, studies: 38, percent: 100 },
            ].map((row) => (
              <div key={row.month} className="space-y-1">
                <div className="flex justify-between text-xs text-stone-600 font-mono">
                  <span className="font-sans font-medium text-stone-800">{row.month}</span>
                  <span>{row.streams} views · {row.visitors} visitors · {row.studies} Bible studies</span>
                </div>
                <div className="w-full h-3 bg-[#F5F7F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#397CA0] to-[#005482] rounded-full"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Recent Activities Feed */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-serif text-stone-900 mb-4">
              Recent Activity Feed
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 pb-3 border-b border-stone-100">
                <div className="w-7 h-7 rounded-full bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-stone-800">New Sabbath Visitor Registered</div>
                  <div className="text-stone-500">Jonathan & Rachel Vance (Group of 3)</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">2 hours ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-stone-100">
                <div className="w-7 h-7 rounded-full bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Bible Study Request Submitted</div>
                  <div className="text-stone-500">Marcus Sterling: Daniel & Revelation prophecy</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Yesterday, 6:20 PM</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-stone-100">
                <div className="w-7 h-7 rounded-full bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Event Registrations Increased</div>
                  <div className="text-stone-500">Hope for Troubled Times series reached 142 guests</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">2 days ago</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <button
              onClick={() => onNavigate('visitors')}
              className="w-full py-2 text-xs font-semibold text-[#005482] hover:bg-[#EAF3F8] rounded-lg transition-colors text-center"
            >
              Review All Visitor Follow-Ups →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
