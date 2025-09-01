'use client';

import { useState } from 'react';

export default function AtelierAsterContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-black mb-6 tracking-wide">
              Contact
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discutons de votre projet personnalisé
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-light text-black mb-8">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-0 border-b border-gray-300 bg-transparent text-black focus:border-black focus:outline-none transition-colors duration-200 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-0 border-b border-gray-300 bg-transparent text-black focus:border-black focus:outline-none transition-colors duration-200 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border-0 border-b border-gray-300 bg-transparent text-black focus:border-black focus:outline-none transition-colors duration-200 py-2 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300"
                  >
                    Envoyer le message
                  </button>
                </div>

                {/* GDPR Notice */}
                <p className="text-xs text-gray-500 text-center">
                  En soumettant ce formulaire, vous acceptez que vos données soient traitées 
                  conformément à notre politique de confidentialité.
                </p>
              </form>
            </div>

            {/* Contact Info Box */}
            <div className="bg-[#F5F5F5] p-8">
              <h3 className="text-xl font-serif font-light text-black mb-6">
                Informations de contact
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Email</h4>
                  <p className="text-black font-light">
                    contact@atelier-aster.demo
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Atelier</h4>
                  <p className="text-black font-light">
                    Rue de l'Horlogerie 42<br />
                    1204 Genève, Suisse
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Horaires</h4>
                  <p className="text-black font-light">
                    Lundi - Vendredi : 9h - 18h<br />
                    Samedi : 10h - 16h<br />
                    Dimanche : Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
