import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  BookOpen,
  Send,
  CheckCircle2,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  Bookmark,
  Share2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Resources: React.FC = () => {
  const { submitBibleStudyRequest } = useChurch();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredMethod: 'In-Person' as 'In-Person' | 'Online Zoom' | 'Self-Paced Guides' | 'Telephone',
    message: '',
  });

  const [activeTab, setActiveTab] = useState<'guides' | 'plans' | 'prophecy' | 'devotional'>('guides');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    submitBibleStudyRequest(formData);
    setFormSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredMethod: 'In-Person',
      message: '',
    });
  };

  const studyGuides = [
    {
      title: 'Discovering the Real Jesus in Prophecy',
      series: 'Christ in All Scripture',
      lessons: '8 Lessons',
      desc: 'Trace the promises and types of the Messiah from Genesis through the prophets to the cross.',
      level: 'Foundational',
    },
    {
      title: 'The Great Prophecies of Daniel & Revelation',
      series: 'Prophetic Truth Series',
      lessons: '12 Lessons',
      desc: 'Understand world history and the final climax of redemption through biblical apocalyptic prophecies.',
      level: 'Intermediate',
    },
    {
      title: 'The Sabbath: Sanctuary in Time',
      series: 'Biblical Foundations',
      lessons: '6 Lessons',
      desc: 'Explore the origin, blessing, history, and spiritual rest of the Seventh-day Sabbath from Genesis to the New Earth.',
      level: 'All Believers',
    },
    {
      title: 'The Sanctuary & Christ’s Heavenly Ministry',
      series: 'Salvation in Type and Truth',
      lessons: '10 Lessons',
      desc: 'A comprehensive study of the wilderness tabernacle and what Jesus is doing right now in heaven.',
      level: 'Advanced',
    },
  ];

  const readingPlans = [
    {
      name: 'Chronological Whole Bible in 365 Days',
      time: '15 min/day',
      description: 'Read biblical accounts in the historical order in which events occurred from Creation to the Early Church.',
    },
    {
      name: 'The Four Gospels & Acts in 60 Days',
      time: '10 min/day',
      description: 'Immerse your mind in the life, words, miracles, cross, and resurrection of our Lord Jesus Christ.',
    },
    {
      name: 'Prophets & Apocalyptic Literature in 40 Days',
      time: '12 min/day',
      description: 'Deep dive through Isaiah, Daniel, Zechariah, and Revelation with structured study notes.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/bible_study_scripture_1793870392769.jpg"
            alt="Bible Study and Christian Resources"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Spiritual Growth & Study
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Discover the Truth. Grow in God’s Word.
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              “Thy word is a lamp unto my feet, and a light unto my path.” Explore comprehensive study guides, structured Bible reading plans, and request free personal studies.
            </p>
          </div>
        </div>
      </section>

      {/* Main split: Left study tabs, Right Study Request Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT: Resources Browser (8 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Daily Devotional Spotlight Card */}
              <div className="p-8 rounded-2xl bg-[#EAF3F8] border border-[#397CA0]/20 shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#005482] mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Today’s Morning Manna</span>
                </div>
                <blockquote className="text-xl sm:text-2xl font-serif font-bold text-[#080B10] leading-snug mb-3">
                  “Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.”
                </blockquote>
                <div className="text-xs font-mono font-bold text-[#005482] mb-4">
                  Titus 2:13 (KJV)
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Amid global uncertainty, our anchor is not in political shifting or temporal wealth, but in the steadfast promise of our Redeemer. Keep your eyes fixed on the clouds; the morning draws near.
                </p>
              </div>

              {/* Segmented Resource Tabs */}
              <div>
                <div className="flex items-center gap-1.5 p-1 bg-[#F5F7F9] rounded-lg border border-stone-200 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('guides')}
                    className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      activeTab === 'guides' ? 'bg-[#005482] text-white shadow-xs' : 'text-stone-600 hover:text-[#005482]'
                    }`}
                  >
                    Bible Study Guides
                  </button>
                  <button
                    onClick={() => setActiveTab('plans')}
                    className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      activeTab === 'plans' ? 'bg-[#005482] text-white shadow-xs' : 'text-stone-600 hover:text-[#005482]'
                    }`}
                  >
                    Reading Plans
                  </button>
                  <button
                    onClick={() => setActiveTab('prophecy')}
                    className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      activeTab === 'prophecy' ? 'bg-[#005482] text-white shadow-xs' : 'text-stone-600 hover:text-[#005482]'
                    }`}
                  >
                    Prophecy Focus
                  </button>
                </div>

                {/* Tab 1: Study Guides */}
                {activeTab === 'guides' && (
                  <div className="space-y-4">
                    {studyGuides.map((guide) => (
                      <div
                        key={guide.title}
                        className="p-6 rounded-xl bg-[#F5F7F9] border border-stone-200/80 hover:border-[#397CA0]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#005482]">
                            <span>{guide.series}</span>
                            <span className="text-stone-300">·</span>
                            <span className="text-stone-500">{guide.lessons}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900">
                            {guide.title}
                          </h3>
                          <p className="text-xs text-stone-600 leading-relaxed max-w-lg">
                            {guide.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              message: `I would like to receive the study materials for: ${guide.title}`,
                            }));
                            window.scrollTo({ top: 600, behavior: 'smooth' });
                          }}
                          className="px-4 py-2 text-xs font-semibold text-[#005482] bg-white border border-[#397CA0]/30 hover:bg-[#EAF3F8] rounded-lg transition-colors shrink-0"
                        >
                          Request Lesson
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 2: Reading Plans */}
                {activeTab === 'plans' && (
                  <div className="space-y-4">
                    {readingPlans.map((plan) => (
                      <div
                        key={plan.name}
                        className="p-6 rounded-xl bg-[#F5F7F9] border border-stone-200/80 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold font-serif text-stone-900">
                            {plan.name}
                          </h3>
                          <span className="text-xs font-mono font-semibold text-[#005482] bg-[#EAF3F8] px-2 py-0.5 rounded">
                            {plan.time}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: Prophecy */}
                {activeTab === 'prophecy' && (
                  <div className="p-6 rounded-xl bg-[#F5F7F9] border border-stone-200/80 space-y-4">
                    <h3 className="text-lg font-bold font-serif text-stone-900">
                      Understanding Biblical Prophecy
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Seventh-day Adventists uphold the historicist method of prophetic interpretation—the same methodology used by the Protestant reformers. From Daniel 2 to Revelation 22, prophecy demonstrates that God is sovereign over human history and that His kingdom of righteousness will soon be established forever.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#005482] block mb-1">Daniel 2 & 7</strong>
                        The succession of world empires and God’s everlasting kingdom.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-stone-200">
                        <strong className="text-[#005482] block mb-1">Revelation 14:6-12</strong>
                        The Three Angels’ Messages and the judgment hour gospel.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Study Request Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-[#F5F7F9] p-8 rounded-2xl border border-stone-200 shadow-md">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] mb-2">
                  Complimentary & Confidential
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#080B10] mb-2">
                  Request Personal Bible Studies
                </h3>
                <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                  Study the Bible at your own pace with a dedicated pastor or trained teacher. We provide free study guides and answers to your biblical questions.
                </p>

                {formSubmitted ? (
                  <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-base">Request Received!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Thank you for your interest in studying the Word of God. Our pastoral team will reach out to you within 24–48 hours through your preferred method.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 text-xs font-semibold text-[#005482] underline"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Samuel Henderson"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="samuel@example.com"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Preferred Study Method</label>
                      <select
                        value={formData.preferredMethod}
                        onChange={(e) => setFormData({ ...formData, preferredMethod: e.target.value as any })}
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      >
                        <option value="In-Person">In-Person at Church or Home</option>
                        <option value="Online Zoom">Online via Zoom / Video Call</option>
                        <option value="Self-Paced Guides">Self-Paced Printed Guides by Mail</option>
                        <option value="Telephone">Telephone / Audio Study</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Questions or Topics of Interest</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="What biblical subjects would you like to explore?"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Bible Study Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
