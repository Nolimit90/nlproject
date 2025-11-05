'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

export default function Contact() {
  const { lang } = useI18n();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+33', // 🌍 Indicatif pays par défaut (France)
    telephone: '',
    clientType: '',
    pack: '',
    message: '',
    businessObjective: '',
    existingWebsite: '',
    budget: '',
    // 🍯 Champs de sécurité (anti-bot)
    _website: '', // Honeypot: doit rester vide
    _submit_time: '', // Timestamp de début
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // 🔐 Initialiser le timestamp au montage du composant
  useEffect(() => {
    setFormData(prev => ({ ...prev, _submit_time: Date.now().toString() }));
  }, []);

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
    
    // 🎯 Validation avec scroll automatique vers le premier champ invalide
    const requiredFields = [
      { name: 'firstName', id: 'firstName', label: lang === 'fr' ? 'Prénom' : 'First name' },
      { name: 'lastName', id: 'lastName', label: lang === 'fr' ? 'Nom' : 'Last name' },
      { name: 'email', id: 'email', label: 'Email' },
      { name: 'telephone', id: 'telephone', label: lang === 'fr' ? 'Téléphone' : 'Phone' },
      { name: 'clientType', id: 'clientType', label: lang === 'fr' ? 'Défi principal' : 'Main challenge' },
      { name: 'businessObjective', id: 'businessObjective', label: lang === 'fr' ? 'Objectif business' : 'Business objective' },
      { name: 'budget', id: 'budget', label: 'Budget' },
    ];

    for (const field of requiredFields) {
      if (!formData[field.name as keyof typeof formData]) {
        const element = document.getElementById(field.id);
        if (element) {
          // Scroll vers le champ
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Focus sur le champ
          element.focus();
          // Ajouter une bordure rouge temporaire
          element.style.borderColor = '#EF4444';
          element.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
          setTimeout(() => {
            element.style.borderColor = '';
            element.style.boxShadow = '';
          }, 3000);
        }
        alert(lang === 'fr' 
          ? `⚠️ Le champ "${field.label}" est obligatoire` 
          : `⚠️ The field "${field.label}" is required`
        );
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // 🌍 Combiner l'indicatif pays et le numéro de téléphone
      const fullPhoneNumber = formData.telephone 
        ? `${formData.countryCode} ${formData.telephone}` 
        : '';
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          telephone: fullPhoneNumber, // Numéro complet avec indicatif
          lang: lang // Ajouter la langue
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success === true) {
        setShowThankYou(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          countryCode: '+33',
          telephone: '',
          clientType: '',
          pack: '',
          message: '',
          businessObjective: '',
          existingWebsite: '',
          budget: '',
          _website: '',
          _submit_time: Date.now().toString(),
        });
      } else {
        const errorMessage = result.error || (lang === 'fr' ? 'Erreur inconnue' : 'Unknown error');
        alert(lang === 'fr' ? 'Erreur: ' + errorMessage : 'Error: ' + errorMessage);
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
      title: 'Briefing de Projet',
      subtitle: 'Ce formulaire est pour les entrepreneurs prêts à investir dans un système. Remplissez-le pour que nous puissions évaluer si nous sommes le bon partenaire.',
      personalInfo: 'Vos informations',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      projectType: 'Étape 1 : Votre Défi Principal',
      youAre: 'Quel est votre plus grand défi actuel ?',
      chooseProfile: 'Sélectionnez votre défi principal',
      newProject: 'Lancement d\'un nouveau projet / première version',
      company: 'Manque de conversions / leads',
      freelance: 'Site non professionnel / crédibilité',
      startup: 'Absence de système automatisé',
      other: 'Autre',
      profileHelp: 'Identifiez le défi qui bloque actuellement votre croissance',
      yourProject: 'Étape 2 : Votre Projet',
      businessObjective: 'Quel est l\'objectif business mesurable de ce projet ?',
      businessObjectivePlaceholder: 'Ex: +30% de ventes, 50 leads/mois, automatiser X...',
      existingWebsite: 'Avez-vous un site web existant ?',
      existingWebsitePlaceholder: 'https://www.votresite.com',
      budget: 'Quel est votre budget approximatif pour ce système ?',
      chooseBudget: 'Sélectionnez une fourchette',
      budget1: '< 3000€',
      budget2: '3000€ - 5000€',
      budget3: '5000€ - 10 000€',
      budget4: '+10 000€',
      submit: '[ ENVOYER MON BRIEFING ]',
      submitting: 'Envoi en cours...',
      thankYou: 'Merci pour votre message !',
      thankYouMessage: 'J\'ai bien reçu votre demande et je vous répondrai dans les plus brefs délais.',
      close: 'Fermer'
    },
    en: {
      title: 'Project Briefing',
      subtitle: 'This form is for entrepreneurs ready to invest in a system. Fill it out so we can assess if we\'re the right partner.',
      personalInfo: 'Your information',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      projectType: 'Step 1: Your Main Challenge',
      youAre: 'What is your biggest current challenge?',
      chooseProfile: 'Select your main challenge',
      newProject: 'Launching a new project / first version',
      company: 'Lack of conversions / leads',
      freelance: 'Unprofessional site / credibility',
      startup: 'No automated system',
      other: 'Other',
      profileHelp: 'Identify the challenge currently blocking your growth',
      yourProject: 'Step 2: Your Project',
      businessObjective: 'What is the measurable business objective of this project?',
      businessObjectivePlaceholder: 'Ex: +30% sales, 50 leads/month, automate X...',
      existingWebsite: 'Do you have an existing website?',
      existingWebsitePlaceholder: 'https://www.yourwebsite.com',
      budget: 'What is your approximate budget for this system?',
      chooseBudget: 'Select a range',
      budget1: '< €3000',
      budget2: '€3000 - €5000',
      budget3: '€5000 - €10,000',
      budget4: '+€10,000',
      submit: '[ SEND MY BRIEFING ]',
      submitting: 'Sending...',
      thankYou: 'Thank you for your message!',
      thankYouMessage: 'I have received your request and will get back to you as soon as possible.',
      close: 'Close'
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.fr;

  if (showThankYou) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A] py-8 sm:py-16 lg:py-32">
        {/* Effet de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2D5A27] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2D5A27] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icône de succès */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#2D5A27] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-2xl animate-pulse">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Titre */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 px-2">
              {t.thankYou}
            </h1>

            {/* Message */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-12 leading-relaxed px-4">
              {t.thankYouMessage}
            </p>

            {/* Note de réassurance */}
            <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 md:mb-12 px-2">
              {lang === 'fr'
                ? '✓ Réponse sous 24h • ✓ Analyse personnalisée • ✓ Sans engagement'
                : '✓ Response within 24h • ✓ Personalized analysis • ✓ No commitment'
              }
            </p>

            {/* Bouton de fermeture */}
            <button
              onClick={() => setShowThankYou(false)}
              className="inline-flex items-center justify-center bg-[#2D5A27] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-300 text-base sm:text-lg font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(45,90,39,0.6)] hover:scale-105 transform uppercase tracking-wider"
            >
              {t.close}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 min-h-screen bg-gradient-to-br from-[#FAF6F1] to-[#F5F0E8]">
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
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
                    {t.phone} *
                  </label>
                  <div className="flex gap-2">
                    {/* Sélecteur d'indicatif pays */}
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-24 sm:w-28 px-2 sm:px-3 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer"
                      disabled={isSubmitting}
                    >
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+32">🇧🇪 +32</option>
                      <option value="+41">🇨🇭 +41</option>
                      <option value="+351">🇵🇹 +351</option>
                      <option value="+212">🇲🇦 +212</option>
                      <option value="+213">🇩🇿 +213</option>
                      <option value="+216">🇹🇳 +216</option>
                      <option value="+221">🇸🇳 +221</option>
                      <option value="+225">🇨🇮 +225</option>
                      <option value="+237">🇨🇲 +237</option>
                      <option value="+other">{lang === 'fr' ? '🌍 Autre' : '🌍 Other'}</option>
                    </select>
                    {/* Numéro de téléphone */}
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="flex-1 min-w-0 px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder={lang === 'fr' ? '6 12 34 56 78' : '6 12 34 56 78'}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Étape 1 : Défi Principal */}
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
                    <option value="NewProject">{t.newProject}</option>
                    <option value="Company">{t.company}</option>
                    <option value="Freelance">{t.freelance}</option>
                    <option value="Startup">{t.startup}</option>
                    <option value="Other">{t.other}</option>
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

            {/* Étape 2 : Votre Projet */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-gray-200">
                {t.yourProject}
              </h3>
              
              <div className="space-y-6">
                {/* Objectif Business */}
              <div className="space-y-2">
                  <label htmlFor="businessObjective" className="block text-sm font-medium text-gray-700">
                    {t.businessObjective} *
                </label>
                  <input
                    type="text"
                    id="businessObjective"
                    name="businessObjective"
                  required
                    value={formData.businessObjective}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder={t.businessObjectivePlaceholder}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Site Web Existant */}
                <div className="space-y-2">
                  <label htmlFor="existingWebsite" className="block text-sm font-medium text-gray-700">
                    {t.existingWebsite}
                  </label>
                  <input
                    type="url"
                    id="existingWebsite"
                    name="existingWebsite"
                    value={formData.existingWebsite}
                  onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder={t.existingWebsitePlaceholder}
                  disabled={isSubmitting}
                />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    {t.budget} *
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA47A] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>{t.chooseBudget}</option>
                      <option value="< 3000€">{t.budget1}</option>
                      <option value="3000€ - 5000€">{t.budget2}</option>
                      <option value="5000€ - 10 000€">{t.budget3}</option>
                      <option value="+10 000€">{t.budget4}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🍯 HONEYPOT: Champ invisible pour piéger les bots */}
            <input
              type="text"
              name="_website"
              value={formData._website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />

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
