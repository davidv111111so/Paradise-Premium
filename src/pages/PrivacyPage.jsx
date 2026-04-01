import { Info, ShieldCheck, Lock, Eye, BookOpen } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function PrivacyPage() {
  const { lang = 'es' } = useOutletContext() || {};

  return (
    <div className="p-6 md:p-14 animate-fade-in bg-paradise-950 pb-40">
      <div className="mb-20 max-w-4xl pt-10">
        <h1 className="heading-display text-5xl md:text-6xl text-paradise-50 mb-6 tracking-tight leading-none uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
          {lang === 'es' ? 'Política de' : 'Privacy'}{' '}
          <span className="heading-orange">
            {lang === 'es' ? 'Privacidad' : 'Policy'}
          </span>
        </h1>
        <div className="h-0.5 w-24 bg-gradient-to-r from-orange-500 to-gold-400 mb-8" />
        <p className="text-paradise-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          {lang === 'es' 
            ? 'En Paradise Premium Rentals, nos tomamos en serio la seguridad y privacidad de sus datos personales. Esta política describe cómo recolectamos, usamos y protegemos su información.' 
            : 'At Paradise Premium Rentals, we take the security and privacy of your personal data seriously. This policy describes how we collect, use, and protect your information.'}
        </p>
      </div>

      <div className="max-w-4xl space-y-16">
        {/* Section 1 */}
        <section className="glass-card p-10 rounded-[40px] border-orange-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Eye className="text-orange-400" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              1. {lang === 'es' ? 'Información que Recolectamos' : 'Information We Collect'}
            </h2>
          </div>
          <div className="space-y-6 text-paradise-300 leading-relaxed font-light">
            <p>
              {lang === 'es' 
                ? 'Recolectamos información personal como su nombre, correo electrónico, número de teléfono e información de pago cuando realiza una reserva o se pone en contacto con nosotros.' 
                : 'We collect personal information such as your name, email, phone number, and payment information when you make a booking or contact us.'}
            </p>
            <p>
              {lang === 'es' 
                ? 'También recolectamos datos técnicos como su dirección IP y el comportamiento de navegación en nuestro sitio web para mejorar su experiencia mediante el uso de cookies.' 
                : 'We also collect technical data such as your IP address and browsing behavior on our website to enhance your experience through cookies.'}
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="glass-card p-10 rounded-[40px] border-orange-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <ShieldCheck className="text-orange-400" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              2. {lang === 'es' ? 'Uso de la Información' : 'Use of Information'}
            </h2>
          </div>
          <div className="space-y-6 text-paradise-300 leading-relaxed font-light">
            <p>
              {lang === 'es' 
                ? 'Su información se utiliza exclusivamente para procesar transacciones, gestionar reservas, responder a sus requerimientos y enviarle comunicaciones promocionales si usted lo autoriza.' 
                : 'Your information is used exclusively to process transactions, manage bookings, respond to your inquiries, and send promotional communications if authorized by you.'}
            </p>
            <p>
              {lang === 'es' 
                ? 'Bajo ninguna circunstancia vendemos o compartimos su información personal con terceros sin su consentimiento explícito, salvo por requerimientos legales.' 
                : 'Under no circumstances do we sell or share your personal information with third parties without your explicit consent, except for legal requirements.'}
            </p>
          </div>
        </section>

        {/* Section 3 - Habeas Data Colombia */}
        <section className="glass-card p-10 rounded-[40px] border-orange-500/10 bg-orange-500/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Lock className="text-orange-400" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              3. {lang === 'es' ? 'Ley de Habeas Data (Ley 1581 de 2012)' : 'Data Protection Law'}
            </h2>
          </div>
          <div className="space-y-6 text-paradise-300 leading-relaxed font-light">
            <p>
              {lang === 'es' 
                ? 'En cumplimiento de la legislación colombiana, los titulares de los datos tienen derecho a conocer, actualizar y rectificar su información personal en cualquier momento.' 
                : 'In compliance with Colombian legislation, data owners have the right to know, update, and rectify their personal information at any time.'}
            </p>
            <p>
              {lang === 'es' 
                ? 'Para cualquier solicitud relacionada con sus datos, puede escribirnos a info@paradiserentas.com o contactar a nuestro equipo de soporte.' 
                : 'For any request related to your data, you can write to us at info@paradiserentas.com or contact our support team.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
