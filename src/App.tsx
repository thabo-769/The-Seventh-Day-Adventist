import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ChurchProvider } from './context/ChurchContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { VideoPlayerModal } from './components/media/VideoPlayerModal';
import { AudioPlayerModal } from './components/media/AudioPlayerModal';
import { LightboxModal } from './components/gallery/LightboxModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Beliefs } from './pages/Beliefs';
import { Ministries } from './pages/Ministries';
import { Sermons } from './pages/Sermons';
import { Events } from './pages/Events';
import { Resources } from './pages/Resources';
import { Gallery } from './pages/Gallery';
import { Giving } from './pages/Giving';
import { PlanVisit } from './pages/PlanVisit';
import { Contact } from './pages/Contact';

// Admin
import { Dashboard as AdminDashboard } from './admin/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${!isHome ? 'pt-[64px] sm:pt-[76px]' : ''}`}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ChurchProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />
          <Route
            path="/beliefs"
            element={
              <PublicLayout>
                <Beliefs />
              </PublicLayout>
            }
          />
          <Route
            path="/ministries"
            element={
              <PublicLayout>
                <Ministries />
              </PublicLayout>
            }
          />
          <Route
            path="/sermons"
            element={
              <PublicLayout>
                <Sermons />
              </PublicLayout>
            }
          />
          <Route
            path="/events"
            element={
              <PublicLayout>
                <Events />
              </PublicLayout>
            }
          />
          <Route
            path="/resources"
            element={
              <PublicLayout>
                <Resources />
              </PublicLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicLayout>
                <Gallery />
              </PublicLayout>
            }
          />
          <Route
            path="/giving"
            element={
              <PublicLayout>
                <Giving />
              </PublicLayout>
            }
          />
          <Route
            path="/plan-visit"
            element={
              <PublicLayout>
                <PlanVisit />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            }
          />

          {/* Complete Church Administration Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Catch-all redirect to Home */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
        </Routes>

        {/* Global Media & Lightbox Modals */}
        <VideoPlayerModal />
        <AudioPlayerModal />
        <LightboxModal />
      </BrowserRouter>
    </ChurchProvider>
  );
}
