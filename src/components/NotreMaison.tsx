import React from 'react';
import { WatermarkedImage } from './WatermarkedImage';
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
      title: "Le Jardin & Piscine",
      description: "Cet espace extérieur raffiné offre un cadre idyllique pour se détendre en soirée. Autour de la piscine éclairée, un coin salon en bois invite à partager des moments chaleureux entre amis ou en famille. La végétation luxuriante et l'éclairage soigneusement pensé créent une atmosphère paisible et conviviale, idéale pour profiter des douces nuits d'été.",
      features: ["Piscine éclairée", "Coin salon en bois", "Végétation luxuriante", "Éclairage d'ambiance"]
    },
    {
      image: "/terras.jpg",
      title: "La Piscine en Plein Air",
      description: "Entourée de palmiers et de verdure, cette piscine spacieuse invite à la détente sous le soleil. Le cadre naturel et la pierre qui l'entoure lui confèrent un charme authentique et apaisant. Idéale pour une baignade rafraîchissante ou un moment de repos à l'ombre du parasol, elle offre une expérience unique entre confort et nature.",
      features: ["Piscine spacieuse", "Entourée de verdure", "Cadre naturel authentique", "Espace détente avec parasol"]
    }
  ];

  return (
    <section id="notre-maison" className="py-20 bg-gradient-to-b from-white via-cream-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-amber-800 mb-6">
            Notre Maison
          </h2>
          <p className="text-3xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez chaque espace de notre demeure d'exception, où chaque pièce 
            raconte une histoire et offre une expérience unique alliant authenticité 
            et confort moderne.
          </p>
        </motion.div>

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
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <WatermarkedImage
                    src={room.image}
                    alt={room.title}
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                    watermarkPosition="diagonal"
                    watermarkSize="small"
                    watermarkOpacity="medium"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating animation elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-150 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-cream-200 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 transform group-hover:scale-125 group-hover:-translate-x-1 group-hover:translate-y-1"></div>
                </div>
                
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
                      <span className="text-white text-base font-medium">{feature}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 text-black">Une expérience unique vous attend</h3>
              <p className="text-xl opacity-90 max-w-2xl mx-auto text-black">
                Chaque détail a été pensé pour vous offrir un séjour inoubliable
                dans l'authenticité et le raffinement de la tradition française.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}