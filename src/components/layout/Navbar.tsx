import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SdaLogo } from '../common/SdaLogo';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Specified centre links: Home, About Us, Ministries, Sermons, Events, Resources, Contact
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-b border-transparent py-5'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Official SDA Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005482] rounded-md"
          >
            <SdaLogo
              size={38}
              variant={isTransparent ? 'white' : 'blue'}
              showText={true}
            />
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isTransparent
                      ? active
                        ? 'text-white font-bold'
                        : 'text-white/85 hover:text-white'
                      : active
                      ? 'text-[#005482] font-semibold'
                      : 'text-stone-700 hover:text-[#005482]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full animate-in fade-in ${
                        isTransparent ? 'bg-white' : 'bg-[#005482]'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action - Plan Your Visit */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              to="/plan-visit"
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all whitespace-nowrap ${
                isTransparent
                  ? 'text-[#005482] bg-white hover:bg-stone-100 shadow-md'
                  : 'text-white bg-[#005482] hover:bg-[#004266] active:bg-[#003350]'
              }`}
            >
              Plan Your Visit
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/plan-visit"
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg md:hidden ${
                isTransparent ? 'bg-white text-[#005482]' : 'bg-[#005482] text-white'
              }`}
            >
              Visit
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-stone-700 hover:text-[#005482] hover:bg-[#EAF3F8]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 pt-3 pb-6 animate-in slide-in-from-top duration-200 shadow-xl text-stone-800">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#EAF3F8] text-[#005482] font-semibold'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-[#005482]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-stone-200">
              <Link
                to="/plan-visit"
                className="block w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#005482] rounded-xl shadow-sm"
              >
                Plan Your Visit
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
