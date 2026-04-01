import { BookOpen, Handshake, AlertTriangle, Calendar, Info } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function TermsPage() {
  const { lang = 'es' } = useOutletContext() || {};

  return (
    <div className="p-6 md:p-14 animate-fade-in bg-paradise-950 pb-40">
      <div className="mb-20 max-w-4xl pt-10">
        <h1 className="heading-display text-5xl md:text-6xl text-paradise-50 mb-6 tracking-tight leading-none uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
          {lang === 'es' ? 'Términos y' : 'Terms &'}{' '}
          <span className="heading-orange">
            {lang === 'es' ? 'Condiciones' : 'Conditions'}
          </span>
        </h1>
        <div className="h-0.5 w-24 bg-gradient-to-r from-orange-500 to-gold-400 mb-8" />
        <p className="text-paradise-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          {lang === 'es' 
            ? 'Bienvenido a Paradise Premium Rentals. Al usar nuestro sitio web y servicios, usted acepta los siguientes términos y condiciones de uso.' 
            : 'Welcome to Paradise Premium Rentals. By using our website and services, you agree to the following terms and conditions of use.'}
        </p>
      </div>

      <div className="max-w-4xl space-y-12">
        {/* Reservation Policy */}
        <section className="glass-card p-10 rounded-[40px] border-orange-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Calendar className="text-orange-400" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              1. {lang === 'es' ? 'Contratación y Reservas' : 'Booking & Reservations'}
            </h2>
          </div>
          <div className="space-y-6 text-paradise-300 leading-relaxed font-light">
            <p>
              {lang === 'es' 
                ? 'Las reservas solo se consideran confirmadas una vez que el pago correspondiente haya sido verificado por nuestro equipo administrativo.' 
                : 'Bookings are only considered confirmed once the corresponding payment has been verified by our administrative team.'}
            </p>
            <p>
              {lang === 'es' 
                ? 'El cliente reconoce que todas las fotos y descripciones de las propiedades son una representación fiel pero pueden estar sujetas a cambios menores en el amoblado.' 
                : 'The client acknowledges that all property photos and descriptions are a faithful representation but may be subject to minor changes in furnishing.'}
            </p>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="glass-card p-10 rounded-[40px] border-orange-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <AlertTriangle className="text-orange-400" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              2. {lang === 'es' ? 'Cancelaciones y Reembolsos' : 'Cancellations & Refunds'}
            </h2>
          </div>
          <div className="space-y-6 text-paradise-300 leading-relaxed font-light">
            <p>
              {lang === 'es' 
                ? 'Nuestra política de cancelación varía según la propiedad y la temporada. Consulte los detalles específicos de su reserva antes de confirmar el pago.' 
                : 'Our cancellation policy varies by property and season. Please check the specific details of your booking before confirming payment.'}
            </p>
            <p>
              {lang === 'es' 
                ? 'Paradise Premium Rentals no se hace responsable de cancelaciones por fuerza mayor, desastres naturales o eventos fuera de nuestro control.' 
                : 'Paradise Premium Rentals is not responsible for cancellations due to force majeure, natural disasters, or events beyond our control.'}
            </p>
          </div>
        </section>

        {/* Responsibilities */}
        <section className="glass-card p-10 rounded-[40px] border-orange-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Handshake className="text-orange-400" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              3. {lang === 'es' ? 'Responsabilidades del Huesped' : 'Guest Responsibilities'}
            </h2>
          </div>
          <div className="space-y-6 text-paradise-300 leading-relaxed font-light">
            <p>
              {lang === 'es' 
                ? 'El huésped es responsable de mantener la propiedad en buen estado y seguir las reglas específicas de convivencia del edificio o la zona rural.' 
                : 'The guest is responsible for maintaining the property in good condition and following the specific coexistence rules of the building or rural area.'}
            </p>
            <p className="p-6 bg-red-500/5 rounded-2xl border border-red-500/20 text-red-400/80 italic text-sm">
              {lang === 'es' 
                ? 'Queda estrictamente prohibido el uso de las propiedades para actividades ilegales o que perturben la tranquilidad de la comunidad circundante.' 
                : 'Use of the properties for illegal activities or activities that disturb the peace of the surrounding community is strictly prohibited.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
