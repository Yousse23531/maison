import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { NotreMaison } from './components/NotreMaison';
import { Gallery } from './components/Gallery';
import { Amenities3D } from './components/Amenities3D';
import { ReservationForm } from './components/ReservationForm';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ConditionsGenerales from './pages/ConditionsGenerales';

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <NotreMaison />
            <Gallery />
            <Amenities3D />
            <ReservationForm />
          </>
        } />
        <Route path="/conditions-generales" element={<ConditionsGenerales />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
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