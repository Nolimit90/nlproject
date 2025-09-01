'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  pack: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ContactFormSectionProps {
  preSelectedPack?: string | null;
}

export default function ContactFormSection({ preSelectedPack }: ContactFormSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    pack: preSelectedPack || '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { toast } = useToast();

  // Validation côté client
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email invalide';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Téléphone requis';
    } else if (formData.telephone.replace(/[\s\+\(\)\-]/g, '').length < 8) {
      newErrors.telephone = 'Numéro de téléphone trop court (minimum 8 chiffres)';
    }

    if (!formData.pack.trim()) {
      newErrors.pack = 'Pack requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message requis';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message trop court (minimum 20 caractères)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Réinitialiser le statut de soumission si l'utilisateur modifie le formulaire
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Build payload with exact keys as specified
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        telephone: formData.telephone,
        pack: formData.pack,
        message: formData.message
      };

      // Console.log avant l'appel pour afficher le payload exact
      console.log('📤 Sending payload to /api/contact:', payload);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // Console.log de la réponse JSON
      console.log('📥 Response from /api/contact:', {
        status: response.status,
        ok: response.ok,
        result: result
      });

      if (response.ok && result.success === true) {
        // Succès - afficher la bannière de succès
        setSubmitStatus('success');
        setSubmitMessage('Message envoyé avec succès !');
        
        toast({
          title: "Succès",
          description: "Votre message a été envoyé avec succès",
          variant: "default"
        });

        // Optionnel : vider le formulaire en cas de succès
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          telephone: '',
          pack: '',
          message: ''
        });
      } else {
        // Erreur - afficher la bannière d'erreur avec le message réel
        const errorMessage = result.error || `Erreur ${response.status}: ${response.statusText}`;
        setSubmitStatus('error');
        setSubmitMessage(errorMessage);
        
        toast({
          title: "Erreur",
          description: errorMessage,
          variant: "destructive"
        });

        // Logger l'erreur dans la console
        console.error('❌ API Error:', {
          status: response.status,
          statusText: response.statusText,
          result: result
        });
      }
    } catch (error) {
      // Erreur de connexion
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion inconnue';
      setSubmitStatus('error');
      setSubmitMessage(errorMessage);
      
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive"
      });

      console.error('💥 Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prêt à démarrer votre projet ? Parlons de vos idées et de la façon dont nous pouvons les concrétiser ensemble.
          </p>
        </div>

        {/* Bannière de statut */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-800 font-medium">{submitMessage}</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <XCircle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-800 font-medium">{submitMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Prénom */}
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                Prénom *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                placeholder="Votre prénom"
                disabled={isSubmitting}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Nom */}
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Nom *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                placeholder="Votre nom"
                disabled={isSubmitting}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="votre@email.com"
                disabled={isSubmitting}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <Label htmlFor="telephone" className="text-sm font-medium text-gray-700">
                Téléphone *
              </Label>
              <Input
                id="telephone"
                type="tel"
                value={formData.telephone}
                onChange={(e) => handleInputChange('telephone', e.target.value)}
                className={`mt-1 ${errors.telephone ? 'border-red-500' : ''}`}
                placeholder="+33 6 12 34 56 78"
                disabled={isSubmitting}
                required
              />
              {errors.telephone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.telephone}
                </p>
              )}
            </div>

            {/* Pack */}
            <div className="md:col-span-2">
              <Label htmlFor="pack" className="text-sm font-medium text-gray-700">
                Pack *
              </Label>
              <Select
                value={formData.pack}
                onValueChange={(value) => handleInputChange('pack', value)}
                disabled={isSubmitting}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez un pack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pack Essentiel">Pack Essentiel</SelectItem>
                  <SelectItem value="Pack Complet">Pack Complet</SelectItem>
                  <SelectItem value="Projet sur mesure">Projet sur mesure</SelectItem>
                </SelectContent>
              </Select>
              {errors.pack && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.pack}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`mt-1 min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                disabled={isSubmitting}
                required
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 text-lg font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer le message'
              )}
            </Button>
          </div>

          {/* Note de confidentialité */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Vos informations sont protégées et ne seront utilisées que pour répondre à votre demande.
          </p>
        </form>
      </div>
    </section>
  );
}

// Fonction utilitaire pour faire défiler vers le formulaire
export function scrollToContactForm() {
  const contactSection = document.getElementById('contact-form');
  if (contactSection) {
    contactSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}
