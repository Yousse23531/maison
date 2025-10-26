import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { WatermarkedImage } from './WatermarkedImage';

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <WatermarkedImage
          src="https://images.unsplash.com/photo-1600896991096-453a14847ab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjBmcmVuY2glMjBjb3VudHJ5c2lkZSUyMHZpbmV5YXJkJTIwY290dGFnZXxlbnwxfHx8fDE3NTkzMDY2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beautiful rustic French countryside cottage with vineyard"
          className="w-full h-full object-cover opacity-15"
          watermarkPosition="diagonal"
          watermarkSize="medium"
          watermarkOpacity="light"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content with image on the right */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left side - Main footer content */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Info & Brand */}
                <motion.div variants={itemVariants}>
                  <motion.h3
                    className="text-2xl font-bold mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring" as const, stiffness: 300 }}
                  >
                    Maison Rustique
                  </motion.h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-start gap-3"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                    >
                      <MapPin size={20} className="mt-1 text-white/80" />
                      <div>
                        <p>Jebel Laswed Bir Bouregba</p>
                        <p>Hammamet, Tunisia</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                    >
                      <Phone size={20} className="text-white/80" />
                      <a href="tel:+21627181000" className="hover:text-white transition-colors">
                        +216 27 181 000
                      </a>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                    >
                      <Mail size={20} className="text-white/80" />
                      <a href="mailto:reservation@maison-rustique.com" className="hover:text-white transition-colors">
                        reservation@maison-rustique.com
                      </a>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Navigation & Services Combined */}
                <motion.div variants={itemVariants}>
                  <h4 className="font-bold mb-6">Navigation</h4>
                  <ul className="space-y-3 mb-8">
                    {[{label: 'Accueil', href: '#home'}, {label: 'Notre Maison', href: '#notre-maison'}, {label: 'Galerie', href: '#gallery'}, {label: 'Équipements', href: '#amenities'}, {label: 'Réservation', href: '#reservation'}].map((item, index) => (
                      <motion.li 
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10, color: '#fcd34d' }}
                      >
                        <a href={item.href} className="hover:text-amber-300 transition-colors">
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <h4 className="font-bold mb-4">Services</h4>
                  <ul className="space-y-2">
                    {[
                      'Location de vacances',
                      'Séjours personnalisés',
                      'Événements privés'
                    ].map((service, index) => (
                      <motion.li 
                        key={service}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="text-sm"
                      >
                        {service}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Social Media & Hours */}
                <motion.div variants={itemVariants}>
                  <h4 className="font-bold mb-6">Suivez-nous</h4>
                  <div className="flex gap-4 mb-6">
                    {[
                      { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61579033613048', label: 'Facebook' },
                      { icon: Instagram, href: 'https://www.instagram.com/maison.rustique.hammamet', label: 'Instagram' }
                    ].map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        className="text-cream-100 hover:text-white transition-colors"
                        variants={socialIconVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold">Informations</h4>
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.p 
                        className="text-sm flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Ouvert toute l'année
                      </motion.p>
                      <p className="text-sm">Check-in: 14h00</p>
                      <p className="text-sm">Check-out: 12h00</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right side - Featured Image */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <motion.div
                className="sticky top-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <WatermarkedImage
                    src="https://images.unsplash.com/photo-1600896991096-453a14847ab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjBmcmVuY2glMjBjb3VudHJ5c2lkZSUyMHZpbmV5YXJkJTIwY290dGFnZXxlbnwxfHx8fDE3NTkzMDY2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Charming rustic French countryside cottage surrounded by vineyards"
                    className="w-full h-80 lg:h-96 object-cover"
                    watermarkPosition="diagonal"
                    watermarkSize="medium"
                    watermarkOpacity="medium"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.h2 
                      className="text-xl lg:text-2xl font-bold text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Votre refuge authentique
                    </motion.h2>
                    <motion.p 
                      className="text-cream-100 text-sm lg:text-base"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Au cœur de la Dordogne, entre vignes et collines
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated separator */}
          <motion.div
            className="mt-12 mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" as const }}
          >
            <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)' }}></div>
          </motion.div>

          {/* Bottom section */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="text-sm"
              whileHover={{ scale: 1.05 }}
            >
              © 2024 Maison Rustique. Tous droits réservés.
            </motion.div>
            <div className="flex gap-6 text-sm">

            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced decorative elements */}
        <motion.div
          className="h-1"
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.7), rgba(255,255,255,0.4))' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" as const }}
        />
        <motion.div
          className="h-px opacity-50"
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0.6), rgba(255,255,255,0.3))' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" as const }}
        />
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              backgroundColor: '#ffffff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
}