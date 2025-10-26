import React from 'react';
import { WatermarkedImage } from './WatermarkedImage';
import { Users, Bath, Maximize, Trees, ParkingCircle, BedDouble, Bed } from 'lucide-react';

export function About() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="md:pt-8">
            <h2 className="text-5xl font-bold text-amber-800 mb-6">
              Bienvenue à la Maison Rustique
            </h2>
            <p className="text-lg text-amber-700 mb-6 leading-relaxed">
              Nichée au cœur de la campagne, notre maison de caractère vous offre 
              une expérience unique alliant authenticité et confort moderne. 
              Construite en pierre locale et restaurée avec soin, elle conserve 
              tout son charme d'antan tout en proposant les commodités contemporaines.
            </p>
            <p className="text-lg text-amber-700 mb-6 leading-relaxed">
              Chaque pièce raconte une histoire, des poutres apparentes du salon 
              à la cheminée en pierre de la salle à manger. Les jardins luxuriants 
              qui l'entourent invitent à la détente et à la contemplation.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="flex items-center gap-4">
                <Maximize size={36} className="text-amber-600 flex-shrink-0" />
                <p className="text-amber-700 text-xl"><span className="font-bold text-amber-800">2500m²</span> Surface</p>
              </div>
              <div className="flex items-center gap-4">
                <BedDouble size={36} className="text-amber-600 flex-shrink-0" />
                <p className="text-amber-700 text-xl"><span className="font-bold text-amber-800">2</span> Suites avec jacuzzi</p>
              </div>
              <div className="flex items-center gap-4">
                <Bed size={36} className="text-amber-600 flex-shrink-0" />
                <p className="text-amber-700 text-xl"><span className="font-bold text-amber-800">2</span> Chambres</p>
              </div>
              <div className="flex items-center gap-4">
                <Bath size={36} className="text-amber-600 flex-shrink-0" />
                <p className="text-amber-700 text-xl"><span className="font-bold text-amber-800">2</span> Salles de bain</p>
              </div>
              <div className="flex items-center gap-4">
                <Trees size={36} className="text-amber-600 flex-shrink-0" />
                <p className="text-amber-700 text-xl">Grand jardin</p>
              </div>
              <div className="flex items-center gap-4">
                <ParkingCircle size={36} className="text-amber-600 flex-shrink-0" />
                <p className="text-amber-700 text-xl">Parking intérieur</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-amber-100 rounded-lg p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-amber-800 mb-4">
                    Une expérience unique
                  </h3>
                  <p className="text-lg text-amber-700">
                    Une expérience unique vous attend, là où charme et confort se rencontrent
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <WatermarkedImage 
                    src="/maison.jpg" 
                    alt="Notre philosophie - Maison Rustique" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                    watermarkPosition="diagonal"
                    watermarkSize="medium"
                    watermarkOpacity="medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}