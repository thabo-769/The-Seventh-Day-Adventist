import React from 'react';
import { Link } from 'react-router-dom';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { useChurch } from '../context/ChurchContext';
import {
  Calendar,
  Clock,
  Play,
  Volume2,
  BookOpen,
  Users,
  Heart,
  ChevronRight,
  ArrowRight,
  MapPin,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { sermons, events, programmes, settings, setActiveVideo, setActiveAudio } = useChurch();

  const featuredSermon = sermons.find((s) => s.featured) || sermons[0];
  const upcomingEvents = events.slice(0, 3);

  // Staggered word animation variants for the main headline
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* 4. HOMEPAGE HERO SECTION */}
      <section className="relative min-h-[70vh] sm:min-h-[84vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#080B10] pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-44 lg:pb-32">
        {/* Background Image with Dark Gradient Scrim */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            src="/src/assets/images/hero_sda_worship_1793870390351.jpg"
            alt="Seventh-day Adventist Church Sanctuary"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-[#080B10]/80 to-[#080B10]/55" />
          <div className="absolute inset-0 bg-[#005482]/25 mix-blend-multiply" />
        </div>

        {/* Content Container with Smooth Slide-Up */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          {/* Main Headline with Staggered Word Slide Effect */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-white mb-6 sm:mb-8 leading-[1.18] text-balance drop-shadow-md flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          >
            <motion.span variants={wordVariants} className="inline-block text-white">Growing in</motion.span>
            <motion.span variants={wordVariants} className="inline-block text-white font-bold">Faith.</motion.span>
            <motion.span variants={wordVariants} className="inline-block text-white">Living in</motion.span>
            <motion.span variants={wordVariants} className="inline-block text-white font-bold">Hope.</motion.span>
            <motion.span variants={wordVariants} className="inline-block text-white">Sharing God’s</motion.span>
            <motion.span variants={wordVariants} className="inline-block text-white font-bold">Love.</motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg lg:text-xl text-white max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed font-normal drop-shadow"
          >
            Welcome to The Seventh-day Adventist Church, a community of believers united by faith, strengthened by God’s Word and committed to sharing the everlasting Gospel of Jesus Christ.
          </motion.p>

          {/* Ultra-clear, high-contrast CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2"
          >
            <Link
              to="/plan-visit"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#003d5e] active:bg-[#002f4a] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 border border-[#397CA0]/40 group"
            >
              <span>Join Us This Sabbath</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#005482] bg-white hover:bg-stone-100 active:bg-stone-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center border-2 border-white"
            >
              Discover Our Church
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Service Information Strip - In natural page flow with ample breathing room */}
      <section className="relative z-20 bg-white border-y border-stone-200 shadow-sm py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 text-stone-800 gap-y-4 md:gap-y-0">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="py-2 px-4 sm:px-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#005482]">Saturday</div>
                <div className="text-base font-bold text-stone-900">Sabbath Worship</div>
                <div className="text-xs text-stone-500 mt-0.5">{settings.sabbathSchoolTime} · {settings.divineWorshipTime}</div>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="py-2 px-4 sm:px-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#005482]">Bible Study</div>
                <div className="text-base font-bold text-stone-900">Discover God’s Word</div>
                <div className="text-xs text-stone-500 mt-0.5">Interactive Lessons & Midweek Prayer</div>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="py-2 px-4 sm:px-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#005482]">Community</div>
                <div className="text-base font-bold text-stone-900">Faith, Fellowship & Service</div>
                <div className="text-xs text-stone-500 mt-0.5">Multigenerational Adventist Family</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. WELCOME TO OUR CHURCH SPLIT-SCREEN */}
      <section className="py-20 lg:py-28 bg-white border-b border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT: Photograph Smooth Slide-In */}
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200"
            >
              <img
                src="/src/assets/images/welcome_congregation_1793870391204.jpg"
                alt="Seventh-day Adventist Church Congregation"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] sm:h-[480px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs font-semibold text-[#005482] uppercase tracking-wider">
                  Every Sabbath Morning
                </div>
                <div className="text-sm text-stone-700">
                  A spiritual home where everyone is accepted, valued, and encouraged.
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Content Smooth Slide-In */}
            <motion.div
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482]">
                Welcome to Our Church
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#080B10] leading-tight text-balance">
                A Place to Belong. A Family in Christ.
              </h2>

              <p className="text-base text-stone-600 leading-relaxed">
                At The Seventh-day Adventist Church, we believe that faith grows through fellowship, worship, prayer and studying God’s Word. We welcome everyone to experience God’s love and become part of a community committed to serving Him.
              </p>

              {/* Pastoral message */}
              <div className="p-6 rounded-xl bg-[#F5F7F9] border border-stone-200/80 space-y-3">
                <p className="text-sm italic text-stone-700 font-serif leading-relaxed">
                  “Whether you are investigating the Bible for the first time or looking for a church family that rests upon Scripture alone, you will find open doors and warm hearts here this Sabbath.”
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#005482] text-white flex items-center justify-center font-bold text-sm">
                    PV
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900">Pastor Michael Vance</div>
                    <div className="text-xs text-stone-500">Senior Pastor, The Seventh-day Adventist Church</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors"
                >
                  Discover More
                </Link>
                <Link
                  to="/plan-visit"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#005482] bg-[#EAF3F8] hover:bg-[#d8e9f3] rounded-lg transition-colors"
                >
                  What to Expect
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. CHURCH PROGRAMMES AND WORSHIP ("Connect. Worship. Grow.") */}
      <section className="py-20 bg-[#F5F7F9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
              Worship & Spiritual Growth
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080B10]">
              Connect. Worship. Grow.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
              We gather throughout the week to study the Scriptures, lift our voices in sacred praise, and support one another in Christian life and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((prog, idx) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white p-7 rounded-xl border border-stone-200/80 hover:border-[#397CA0]/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#005482] bg-[#EAF3F8] px-2.5 py-1 rounded">
                      {prog.day}
                    </span>
                    <span className="text-xs font-mono text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {prog.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-stone-900 mb-2">
                    {prog.name}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#397CA0]" />
                    {prog.location}
                  </span>
                  <Link
                    to="/plan-visit"
                    className="font-semibold text-[#005482] hover:underline"
                  >
                    Join Us →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FEATURED SERMON AND MEDIA HIGHLIGHT */}
      {featuredSermon && (
        <section className="py-20 bg-[#080B10] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 block mb-2">
                  Sermons & Media Centre
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                  Be Inspired. Be Encouraged. Grow in Faith.
                </h2>
              </div>
              <Link
                to="/sermons"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-stone-300 transition-colors"
              >
                <span>Browse All Sermons & Archive</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Hero Media Card with Smooth Slide */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#101520] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Thumbnail / Player Preview */}
              <div className="lg:col-span-7 relative group aspect-video lg:aspect-auto">
                <img
                  src={featuredSermon.thumbnailUrl}
                  alt={featuredSermon.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideo(featuredSermon)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#005482] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                    aria-label="Play Featured Sermon"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/75 px-3 py-1 rounded text-xs font-mono text-white">
                  {featuredSermon.duration}
                </div>
              </div>

              {/* Sermon Details */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-white/80 font-semibold uppercase tracking-wider mb-3">
                    <span>Featured Sabbath Message</span>
                    <span>·</span>
                    <span>{featuredSermon.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-4 leading-snug">
                    {featuredSermon.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-300 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{featuredSermon.speaker}</span>
                      <span className="text-stone-500">·</span>
                      <span className="text-stone-400">{featuredSermon.speakerRole}</span>
                    </div>
                    <div className="text-white/90 font-medium flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-white/80" />
                      <span>{featuredSermon.scripture}</span>
                    </div>
                    <div className="text-stone-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{featuredSermon.date}</span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-300 leading-relaxed mb-6">
                    {featuredSermon.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveVideo(featuredSermon)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#005482] hover:bg-[#004266] text-white rounded-lg flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch Sermon</span>
                  </button>

                  {featuredSermon.audioUrl && (
                    <button
                      onClick={() => setActiveAudio(featuredSermon)}
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Listen Audio</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 11. UPCOMING EVENTS */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                Calendar & Community Life
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080B10]">
                Upcoming Church Events
              </h2>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#005482] hover:underline"
            >
              <span>View Full Events Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-[#F5F7F9] rounded-xl overflow-hidden border border-stone-200/80 hover:shadow-lg transition-all flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#005482] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    {evt.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-stone-500 font-medium mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#397CA0]" />
                      <span>{evt.date}</span>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-stone-900 mb-2 leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 text-xs flex items-center justify-between">
                    <span className="text-stone-500 truncate max-w-[170px]">{evt.venue}</span>
                    <Link
                      to="/events"
                      className="font-semibold text-[#005482] hover:text-[#004266] inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. GIVING & SUPPORT CALLOUT */}
      <section className="py-16 bg-[#EAF3F8] border-y border-[#397CA0]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482]">
                Faithful Stewardship
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#080B10]">
                Together, We Can Make a Difference.
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed max-w-2xl">
                Your tithes and voluntary offerings support global missions, Christian education, community relief, and the spread of God’s Word to every nation, kindred, tongue and people.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to="/giving"
                className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                <span>Return Tithe & Support Online</span>
              </Link>
              <Link
                to="/resources"
                className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#005482] bg-white border border-[#397CA0]/30 hover:bg-stone-50 rounded-lg transition-colors"
              >
                Request Free Bible Study
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 15. PLAN YOUR VISIT INVITATION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-3">
            You Are Welcome Here
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080B10] mb-4">
            We Would Love to Welcome You This Sabbath
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Planning your first visit to a Seventh-day Adventist church? Learn what to expect, explore our worship times, directions, and childcare options.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/plan-visit"
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-md transition-colors"
            >
              Plan Your Visit Today
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Contact Our Ministry Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
