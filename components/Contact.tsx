'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

export default function Contact() {
  const { lang } = useI18n();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    clientType: '',
    pack: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'clientType') {
      // Synchroniser automatiquement le champ pack (caché)
      let packValue = '';
      switch (value) {
        case 'Company':
          packValue = 'Pack Entreprise';
          break;
        case 'Freelance':
          packValue = 'Pack Freelance';
          break;
        case 'Startup':
          packValue = 'Pack Startup';
          break;
        default:
          packValue = '';
      }
      
      setFormData(prev => ({ 
        ...prev, 
        clientType: value,
        pack: packValue 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.clientType) {
      alert(lang === 'fr' ? 'Veuillez remplir tous les champs obligatoires' : 'Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success === true) {
        setShowThankYou(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          telephone: '',
          clientType: '',
          pack: '',
          message: ''
        });
      } else {
        alert(lang === 'fr' ? 'Erreur: ' + (result.error || 'Erreur inconnue') : 'Error: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert(lang === 'fr' ? 'Erreur de connexion' : 'Connection error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Traductions
  const translations = {
    fr: {
      title: 'Démarrons votre projet',
      subtitle: 'Racontez-moi votre vision et créons ensemble quelque chose d\'extraordinaire',
      personalInfo: 'Vos informations',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      projectType: 'Type de projet',
      youAre: 'Vous êtes',
      chooseProfile: 'Choisissez votre profil',
      company: 'Entreprise établie',
      freelance: 'Professionnel indépendant',
      startup: 'Startup innovante',
      profileHelp: 'Sélectionnez le profil qui correspond le mieux à votre situation',
      yourProject: 'Votre projet',
      describeProject: 'Décrivez votre projet',
      projectPlaceholder: 'Parlez-moi de votre vision, vos objectifs, votre public cible... Plus vous me donnez de détails, mieux je pourrai vous accompagner !',
      projectHelp: 'Décrivez vos besoins, objectifs et contraintes pour que je puisse vous proposer la meilleure solution',
      submit: 'Lancer mon projet',
      submitting: 'Envoi en cours...',
      thankYou: 'Merci pour votre message !',
      thankYouMessage: 'J\'ai bien reçu votre demande et je vous répondrai dans les plus brefs délais.',
      close: 'Fermer'
    },
    en: {
      title: 'Let\'s start your project',
      subtitle: 'Tell me about your vision and let\'s create something extraordinary together',
      personalInfo: 'Your information',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      projectType: 'Project type',
      youAre: 'You are',
      chooseProfile: 'Choose your profile',
      company: 'Established company',
      freelance: 'Independent professional',
      startup: 'Innovative startup',
      profileHelp: 'Select the profile that best matches your situation',
      yourProject: 'Your project',
      describeProject: 'Describe your project',
      projectPlaceholder: 'Tell me about your vision, your objectives, your target audience... The more details you give me, the better I can help you!',
      projectHelp: 'Describe your needs, objectives and constraints so I can propose the best solution',
      submit: 'Launch my project',
      submitting: 'Sending...',
      thankYou: 'Thank you for your message!',
      thankYouMessage: 'I have received your request and will get back to you as soon as possible.',
      close: 'Close'
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.fr;

  if (showThankYou) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-br from-[#FAF6F1] to-[#F5F0E8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">{t.thankYou}</h2>
              <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed">{t.thankYouMessage}</p>
              <button
                onClick={() => setShowThankYou(false)}
                className="bg-[#0FA47A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0D8A66] transition-colors duration-200"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#FAF6F1] to-[#F5F0E8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#1A1A1A] mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Informations personnelles */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-gray-200">
                {t.personalInfo}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    {t.firstName} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder={lang === 'fr' ? 'Votre prénom' : 'Your first name'}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    {t.lastName} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder={lang === 'fr' ? 'Votre nom' : 'Your last name'}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="votre@email.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="+33 6 12 34 56 78"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Type de client (seulement) */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-gray-200">
                {t.projectType}
              </h3>
              <div className="space-y-2">
                <label htmlFor="clientType" className="block text-sm font-medium text-gray-700">
                  {t.youAre} *
                </label>
                <div className="relative">
                  <select
                    id="clientType"
                    name="clientType"
                    required
                    value={formData.clientType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <option value="">{t.chooseProfile}</option>
                    <option value="Company">{t.company}</option>
                    <option value="Freelance">{t.freelance}</option>
                    <option value="Startup">{t.startup}</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t.profileHelp}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-gray-200">
                {t.yourProject}
              </h3>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t.describeProject} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  placeholder={t.projectPlaceholder}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500">
                  {t.projectHelp}
                </p>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#0FA47A] to-[#0D8A66] text-white py-4 px-12 rounded-xl text-lg font-semibold hover:from-[#0D8A66] hover:to-[#0FA47A] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <span className="relative z-10">{t.submit}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
