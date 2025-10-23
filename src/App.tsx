import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { NotreMaison } from './components/NotreMaison';
import { Gallery } from './components/Gallery';
import { Amenities3D } from './components/Amenities3D';
import { ReservationForm } from './components/ReservationForm';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ReservationCalendarEmbedded from './components/ReservationCalendar';
import ConditionsGenerales from './pages/ConditionsGenerales';
import AdminBlockedDates from './pages/AdminBlockedDates';

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <NotreMaison />
            <Gallery />
            <Amenities3D />
              <div className="max-w-4xl mx-auto px-4 my-8">
                <h3 className="text-xl font-bold text-amber-800 mb-2">Calendrier des dates réservées</h3>
                <ReservationCalendarEmbedded />
              </div>
            <ReservationForm />
          </>
        } />
        <Route path="/conditions-generales" element={<ConditionsGenerales />} />
        <Route path="/admin/blocked-dates" element={<AdminBlockedDates />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}