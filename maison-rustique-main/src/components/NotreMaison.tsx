import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

export function NotreMaison() {
  const rooms = [
    {
      image: "/salon.jpg",
      title: "Le Grand Salon",
      description: "Au cœur de notre maison, le grand salon vous accueille avec sa majestueuse cheminée en pierre du XVIIIe siècle. Les poutres apparentes et les pierres ancestrales créent une atmosphère chaleureuse et authentique. Un espace parfait pour se détendre en famille ou entre amis.",
      features: ["Cheminée fonctionnelle", "Canapés confortables", "TV écran plat", "Wifi gratuit"]
    },
    {
      image: "/sallemanger.jpg",
      title: "La Salle à Manger",
      description: "Cette élégante salle à manger peut accueillir jusqu'à 8 convives autour de sa table en chêne massif artisanale. L'éclairage tamisé et la décoration soignée en font l'endroit idéal pour partager des repas mémorables dans une ambiance conviviale.",
      features: ["Table pour 8 personnes", "Vaisselle fournie", "Éclairage d'ambiance", "Accès direct à la cuisine"]
    },
    {
      image: "/4.jpg",
      title: "La Cuisine Authentique",
      description: "Notre cuisine allie parfaitement charme rustique et équipements modernes. Entièrement équipée avec des appareils haut de gamme, elle conserve son caractère grâce à ses éléments d'origine restaurés avec soin. Parfaite pour préparer vos repas en toute convivialité.",
      features: ["Électroménager complet", "Plan de travail en granit", "Îlot central", "Ustensiles de cuisine fournis"]
    },
    {
      image: "/suite.jpg",
      title: "La Suite Parentale",
      description: "La chambre principale offre un cadre romantique avec ses poutres apparentes et sa décoration raffinée. Le lit king-size garantit des nuits réparatrices, tandis que l'espace généreux permet de se détendre dans un confort absolu.",
      features: ["Lit king-size 180x200", "Dressing intégré", "Salle de bain privative", "Vue sur le jardin"]
    },
    {
      image: "/nuit.jpg",
      title: "Le Jardin Méditerranéen & Piscine",
      description: "Niché au cœur d’un paysage ensoleillé, cet espace extérieur respire la sérénité et la nature. La piscine turquoise se fond harmonieusement parmi les palmiers, les lauriers-roses et les roches dorées, évoquant les jardins méditerranéens. C’est un lieu parfait pour savourer la quiétude des journées d’été, entouré de verdure et du chant des cigales.",
      features: ["Piscine turquoise", "Palmiers et plantes exotiques", "Ambiance naturelle et apaisante"]
    },
    {
      image: "/terras.jpg",
      title: "Terrasse voûtée en plein air",
      description: "Sous une élégante voûte en briques, cette terrasse offre un espace convivial où modernité et authenticité se rencontrent. Idéale pour partager un café ou un repas en plein air, elle allie confort et charme architectural. Le mélange de pierre naturelle et de verdure environnante crée une atmosphère paisible et chaleureuse, parfaite pour se détendre en bonne compagnie.",
      features: ["Espace convivial", "Architecture authentique", "Cadre naturel et apaisant", "Idéal pour repas ou moments de détente"]
    }
  ];

  return (
    <section id="notre-maison" className="py-20 bg-gradient-to-b from-white via-cream-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-bold text-amber-800 mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Notre Maison
          </motion.h2>
          <motion.p 
            className="text-xl text-amber-700 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            votre séjour d’exception commence ici, style, confort et ambiance
          </motion.p>
        </div>

        <div className="space-y-20">
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <ImageWithFallback
                  src={room.image}
                  alt={room.title}
                  className="w-full h-[400px] object-cover bg-black/5 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-4xl font-bold text-amber-800 mb-4 hover:text-amber-600 transition-colors cursor-default">
                    {room.title}
                  </h3>
                  <p className="text-amber-700 leading-relaxed text-xl">
                    {room.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-3"
                >
                  {room.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 bg-amber-600 rounded-lg p-3 hover:bg-amber-700 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-default"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-black text-base font-medium">{feature}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}