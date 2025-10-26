import React from 'react';
import { motion } from 'motion/react';

export function Amenities3D() {
  const amenities = [
    {
      icon: "🏊‍♂️",
      title: "Piscine Extérieure",
      description: "Profitez de notre piscine chauffée avec vue panoramique sur la campagne environnante."
    },
    {
      icon: "🌳",
      title: "Jardin Privé",
      description: "Un jardin de 2 hectares avec arbres centenaires et espaces de détente."
    },
    {
      icon: "🍽️",
      title: "Cuisine Équipée",
      description: "Cuisine moderne avec tous les équipements nécessaires pour cuisiner vos repas."
    },
    {
      icon: "📺",
      title: "Salle de Divertissement",
      description: "TV écran plat, jeux de société et espace détente pour toute la famille."
    },
    {
      icon: "🛏️",
      title: "Chambres Confortables",
      description: "Lits king size, literie haut de gamme et salles de bain privatives."
    },
    {
      icon: "🚗",
      title: "Parking Privé",
      description: "Parking sécurisé pour plusieurs véhicules sur place."
    }
  ];

  return (
    <section id="amenities" className="py-20 bg-gradient-to-b from-amber-50 to-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Équipements & Services
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour un séjour parfait, dans le confort et l'authenticité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                {amenity.title}
              </h3>
              <p className="text-amber-700">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
