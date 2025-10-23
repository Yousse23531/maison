import React from 'react';
import { WatermarkedImage } from './WatermarkedImage';

export function About() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
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
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">2500m²</div>
                <div className="text-amber-700">Surface</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">4</div>
                <div className="text-amber-700">Chambres</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">2</div>
                <div className="text-amber-700">Salles de bain</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">8</div>
                <div className="text-amber-700">Personnes max</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-amber-100 rounded-lg p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-amber-800 mb-4">
                    Notre philosophie
                  </h3>
                  <p className="text-lg text-amber-700 mb-4">
                    Nous croyons que les meilleures vacances sont celles où l'on 
                    se sent chez soi, entouré de beauté et de sérénité.
                  </p>
                  <p className="text-lg text-amber-700">
                    C'est pourquoi nous avons créé un espace où chaque détail 
                    a été pensé pour votre bien-être et votre confort.
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