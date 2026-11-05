import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  BookOpen,
  Globe,
  Compass,
  Award,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    { title: 'Faith', desc: 'Grounded firmly upon the inspired Word of God as the authoritative rule of life and doctrine.' },
    { title: 'Love', desc: 'Reflecting the unconditional, self-sacrificing agape love of Jesus Christ in all human relationships.' },
    { title: 'Integrity', desc: 'Practicing uncompromising moral honesty, biblical ethics, and transparency in private and public life.' },
    { title: 'Compassion', desc: 'Extending Christ’s healing ministry to the hurting, marginalized, sick, and vulnerable.' },
    { title: 'Service', desc: 'Living out our discipleship through selfless community action, humanitarian relief, and civic good.' },
    { title: 'Fellowship', desc: 'Cultivating an inclusive, joyful, and multi-generational church family bonded in Christian unity.' },
    { title: 'Spiritual Growth', desc: 'Pursuing continuous sanctification through daily prayer, Bible study, and the Holy Spirit’s power.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <section className="relative bg-[#005482] text-white py-20 lg:py-24 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/church_programmes_bg_1793890619763.jpg"
            alt="About The Seventh-day Adventist Church Sanctuary"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              About The Seventh-day Adventist Church
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              A Global Movement Rooted in Scripture and Blessed Hope
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              We are a worldwide family of Christian believers united by faith in Jesus Christ, dedicated to living according to the Holy Scriptures and eagerly anticipating His promised return.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482]">
                Our Identity & Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080B10]">
                Our Story
              </h2>
              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                <p>
                  The Seventh-day Adventist Church arose in the mid-nineteenth century as a revival movement born out of earnest, prayerful study of the prophetic Scriptures. Searching the Bible afresh, our pioneers rediscovered foundational biblical truths: the immutable nature of God’s Ten Commandments, the blessing of the biblical Seventh-day Sabbath (Saturday), and the radiant promise of Christ’s soon Second Advent.
                </p>
                <p>
                  Officially organized in 1863, the church has grown from a humble company of believers into a global Protestant communion of over 22 million baptized members spanning more than 200 countries and territories.
                </p>
                <p>
                  Today, Seventh-day Adventists are known worldwide not only for biblical proclamation, but for their extensive commitment to health, education, and humanitarian compassion—operating the world’s largest unified Protestant network of hospitals, clinics, universities, and schools, alongside the Adventist Development and Relief Agency (ADRA).
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                <img
                  src="/src/assets/images/bible_study_scripture_1793870392769.jpg"
                  alt="Holy Bible on Oak Desk"
                  className="w-full h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#005482] text-white p-6 rounded-xl shadow-lg hidden sm:block max-w-xs">
                <div className="text-xs uppercase tracking-widest text-[#EAF3F8] font-bold">
                  Biblical Standard
                </div>
                <div className="text-sm font-serif italic mt-1">
                  “The Holy Scriptures are the supreme, authoritative, and the infallible revelation of His will.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Split Layout */}
      <section className="py-20 bg-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EAF3F8] text-[#005482] flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                  Purpose & Calling
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#080B10] mb-4">
                  Our Mission
                </h3>
                <p className="text-stone-700 text-base leading-relaxed">
                  To share the everlasting Gospel of Jesus Christ, make disciples, serve communities and prepare people for His soon return.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-100 text-xs text-stone-500">
                Matthew 28:18–20 · Revelation 14:6–12
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EAF3F8] text-[#005482] flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                  Future Horizon
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#080B10] mb-4">
                  Our Vision
                </h3>
                <p className="text-stone-700 text-base leading-relaxed">
                  To become a Christ-centred community reflecting God’s love and bringing hope to the world.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-100 text-xs text-stone-500">
                Ephesians 4:11–16 · Titus 2:11–14
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080B10]">
              Our Core Values
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-4">
              These shared biblical values shape our worship, guide our leadership, and animate our everyday community witness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 rounded-xl bg-[#F5F7F9] border border-stone-200/80 hover:border-[#397CA0]/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#005482] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold font-serif text-stone-900">
                    {val.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact & Stewardship Strip */}
      <section className="py-16 bg-[#080B10] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-2 px-4">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#397CA0]">22M+</div>
              <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider">Baptized Believers</div>
            </div>
            <div className="py-2 px-4">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#397CA0]">200+</div>
              <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider">Countries & Territories</div>
            </div>
            <div className="py-2 px-4">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#397CA0]">9,000+</div>
              <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider">Schools & Universities</div>
            </div>
            <div className="py-2 px-4">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#397CA0]">220+</div>
              <div className="text-xs text-stone-300 mt-1 uppercase tracking-wider">Hospitals & Sanitoriums</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-[#EAF3F8] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#080B10] mb-4">
            Explore What We Believe
          </h2>
          <p className="text-sm text-stone-700 mb-6 leading-relaxed">
            Discover how Scripture informs our doctrine, from the Seventh-day Sabbath to the blessed hope of the resurrection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/beliefs"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Explore 28 Fundamental Beliefs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/plan-visit"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#005482] bg-white border border-[#397CA0]/30 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Visit Our Congregation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
