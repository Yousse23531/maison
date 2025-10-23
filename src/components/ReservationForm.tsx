import { useState } from 'react';
import { Calendar, Users, Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import ReservationCalendarEmbedded, { ReservationCalendarModal } from './ReservationCalendar';
// range modal removed; using single-date modal per field
import { WhatsAppButton } from './WhatsAppButton';
import { motion } from 'motion/react';

export function ReservationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: ''
  });

  const [calendarType, setCalendarType] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [dateModalOpen, setDateModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "+21629173456";
    const message = `
Bonjour, je souhaite faire une réservation.
Nom: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${formData.phone}
Arrivée: ${formData.checkIn}
Départ: ${formData.checkOut}
Nombre de personnes: ${formData.guests}
Message: ${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const openDateModal = (type: 'checkIn' | 'checkOut') => {
    setCalendarType(type);
    setDateModalOpen(true);
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({
      ...prev,
      [calendarType]: date
    }));
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="reservation" className="py-20 bg-gradient-to-b from-cream-100 to-amber-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-amber-800 mb-4">
            Réservez votre séjour
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Complétez le formulaire ci-dessous pour faire une demande de réservation. 
            Nous vous contacterons rapidement pour confirmer votre séjour.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-black text-center relative overflow-hidden"
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-20"></div>
            <h3 className="text-2xl font-bold mb-2 relative z-10">Demande de Réservation</h3>
            <p className="relative z-10">Maison Rustique vous attend</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <Users size={16} />
                  Prénom *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border-amber-200 focus:border-amber-500 transition-all duration-300 hover:shadow-md"
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <Users size={16} />
                  Nom *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border-amber-200 focus:border-amber-500 transition-all duration-300 hover:shadow-md"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail size={16} />
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={16} />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Label htmlFor="checkIn" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Arrivée *
                </Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openDateModal('checkIn')}
                    className="w-full justify-start text-left font-normal border-amber-200 hover:border-amber-500 h-10"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.checkIn ? formatDisplayDate(formData.checkIn) : "Sélectionner une date"}
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <Label htmlFor="checkOut" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Départ *
                </Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openDateModal('checkOut')}
                    className="w-full justify-start text-left font-normal border-amber-200 hover:border-amber-500 h-10"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.checkOut ? formatDisplayDate(formData.checkOut) : "Sélectionner une date"}
                  </Button>
                </div>
              </motion.div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2">
                  <Users size={16} />
                  Nombre de personnes *
                </Label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num.toString()}>
                      {num} personne{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare size={16} />
                Message ou demandes spéciales
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Parlez-nous de vos besoins particuliers, allergies, souhaits..."
                className="border-amber-200 focus:border-amber-500 resize-none"
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-bold text-amber-800 mb-2">Informations importantes :</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Check-in : 12h00 - Check-out : 10h00</li>
                <li>• Séjour minimum : 2 nuits</li>
                <li>• Un acompte de 30% sera demandé pour confirmer la réservation</li>
                <li>• Animaux acceptés sur demande (supplément possible)</li>
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Button 
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Send size={20} />
                </motion.div>
                Envoyer ma demande de réservation
              </Button>
            </motion.div>
          </form>
        </motion.div>

        <ReservationCalendarModal
          isOpen={dateModalOpen}
          onClose={() => setDateModalOpen(false)}
          onDateSelect={handleDateSelect}
          selectedDate={formData[calendarType]}
          isCheckIn={calendarType === 'checkIn'}
        />

        <div className="mt-8 text-center flex flex-col items-center gap-3">
          <p className="text-amber-700">
            Vous préférez nous appeler ? Contactez-nous au{' '}
            <a href="tel:+21627181000" className="font-bold text-amber-800 hover:text-amber-600">
              +216 27 181 000
            </a>
          </p>
          <WhatsAppButton phone="+21629173456" message={`Bonjour Maison Rustique, je souhaite réserver du ${formData.checkIn} au ${formData.checkOut}.`} />
        </div>
      </div>
      {/* Full-width Google Map below the form */}
      <div className="mt-12">
        <iframe
          title="Localisation - Maison Rustique"
          src="https://www.google.com/maps?q=Jebel%20Laswed%20Bir%20Bouregba%2C%20Hammamet%2C%20Tunisia&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px] border-0"
        />
        <div className="mt-3 text-center">
          <a
            href="https://maps.app.goo.gl/p2d6MV2hgsP6yzCT6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-900 underline"
          >
            Ouvrir dans Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}