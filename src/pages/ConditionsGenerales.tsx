import React from 'react';
import { motion } from 'motion/react';
import { WatermarkedImage } from '../components/WatermarkedImage';
import { ArrowLeft, FileText, Shield, Calendar, CreditCard, Home, Users, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConditionsGenerales() {
  const sections = [
    {
      icon: FileText,
      title: "1. Objet",
      content: "Les présentes conditions générales régissent la location de la Maison Rustique située à Jebel Laswed Bir Bouregba, Hammamet, Tunisia. Elles s'appliquent à toute réservation effectuée par le locataire."
    },
    {
      icon: Calendar,
      title: "2. Réservation et Confirmation",
      content: "La réservation est confirmée après réception d'un acompte de 30% du montant total. Le solde doit être réglé au plus tard 30 jours avant l'arrivée. En cas de non-paiement, la réservation sera annulée."
    },
    {
      icon: CreditCard,
      title: "3. Tarifs et Paiement",
      content: "Les tarifs sont exprimés en euros et incluent les charges (eau, électricité, wifi). Le paiement peut s'effectuer par virement bancaire ou carte bancaire. Une caution de 300€ est demandée à l'arrivée."
    },
    {
      icon: Home,
      title: "4. Arrivée et Départ",
      content: "L'arrivée s'effectue à partir de 12h00 et le départ avant 10h00. Les clés seront remises en main propre lors de l'arrivée. Un état des lieux sera effectué en présence du locataire."
    },
    {
      icon: Users,
      title: "5. Utilisation des Lieux",
      content: "La capacité maximale est de 8 personnes. Le locataire s'engage à utiliser les lieux en bon père de famille et à respecter le voisinage. Les fêtes et événements bruyants sont interdits après 22h."
    },
    {
      icon: Shield,
      title: "6. Assurance et Responsabilité",
      content: "Le locataire doit disposer d'une assurance responsabilité civile couvrant les dommages qu'il pourrait causer. Le propriétaire décline toute responsabilité en cas de vol, accident ou dommage aux biens personnels."
    },
    {
      icon: AlertTriangle,
      title: "7. Annulation",
      content: "En cas d'annulation plus de 30 jours avant l'arrivée : remboursement de l'acompte moins 50€ de frais. Entre 30 et 15 jours : 50% de remboursement. Moins de 15 jours : aucun remboursement."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <WatermarkedImage
            src="/src/maison.jpg"
            alt="Maison Rustique - Conditions Générales"
            className="w-full h-full object-cover"
            watermarkPosition="diagonal"
            watermarkSize="large"
            watermarkOpacity="light"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Conditions Générales
            </h1>
            <p className="text-xl text-cream-100">
              Maison Rustique - Location de Vacances
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">
                Conditions Générales de Location
              </h2>
              <p className="text-amber-700">
                Veuillez lire attentivement les conditions suivantes avant de procéder à votre réservation.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="border-l-4 border-amber-500 pl-6 py-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <section.icon size={20} className="text-amber-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-amber-800 mb-3">
                        {section.title}
                      </h3>
                      <p className="text-amber-700 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200"
            >
              <h3 className="text-lg font-bold text-amber-800 mb-3">
                Contact
              </h3>
              <p className="text-amber-700 mb-2">
                Pour toute question concernant ces conditions générales, n'hésitez pas à nous contacter :
              </p>
              <div className="space-y-1 text-amber-700">
                <p><strong>Email :</strong> rustic.house.bb@gmail.com</p>
                <p><strong>Téléphone :</strong> +216 27 181 000</p>
                <p><strong>Adresse :</strong> Jebel Laswed Bir Bouregba, Hammamet, Tunisia</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-amber-600">
                Dernière mise à jour : Octobre 2024
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
