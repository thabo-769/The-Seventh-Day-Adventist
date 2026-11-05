import React from 'react';
import { Link } from 'react-router-dom';
import { SdaLogo } from '../common/SdaLogo';
import { useChurch } from '../../context/ChurchContext';
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useChurch();

  return (
    <footer className="bg-[#080B10] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <SdaLogo size={42} variant="white" showText={true} />
            </Link>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm pt-2">
              The Seventh-day Adventist Church is a mainstream Protestant church with approximately 22 million members worldwide. We are united in faith, strengthened by God’s Word, and committed to sharing the everlasting Gospel of Jesus Christ.
            </p>
            <div className="pt-2 text-xs text-[#397CA0] font-medium tracking-wide">
              Growing in Faith · Living in Hope · Sharing God’s Love
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#397CA0]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Our Church</Link>
              </li>
              <li>
                <Link to="/beliefs" className="hover:text-white transition-colors">Fundamental Beliefs</Link>
              </li>
              <li>
                <Link to="/ministries" className="hover:text-white transition-colors">Church Ministries</Link>
              </li>
              <li>
                <Link to="/sermons" className="hover:text-white transition-colors">Sermons & Media</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">Upcoming Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">Photo & Video Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#397CA0]">
              Get Connected
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <Link to="/plan-visit" className="hover:text-white transition-colors">Plan Your Sabbath Visit</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">Request Bible Studies</Link>
              </li>
              <li>
                <Link to="/giving" className="hover:text-white transition-colors">Tithe & Offerings</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Prayer Requests</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Our Pastors</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors inline-flex items-center gap-1 text-[#397CA0]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Worship Times & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#397CA0]">
              Worship Times
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#397CA0] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Sabbath Morning</div>
                  <div className="text-stone-400">Sabbath School: {settings.sabbathSchoolTime}</div>
                  <div className="text-stone-400">Divine Service: {settings.divineWorshipTime}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#397CA0] shrink-0 mt-0.5" />
                <span className="text-stone-400 leading-snug">{settings.address}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#397CA0] shrink-0" />
                <span className="text-stone-400">{settings.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#397CA0] shrink-0" />
                <span className="text-stone-400">{settings.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} The Seventh-day Adventist Church. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Official Church Identity</span>
            <span aria-hidden="true">·</span>
            <Link to="/beliefs" className="hover:text-white transition-colors">28 Fundamental Beliefs</Link>
            <span aria-hidden="true">·</span>
            <Link to="/admin" className="hover:text-white transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
