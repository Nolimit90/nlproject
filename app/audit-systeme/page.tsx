'use client';

import { useState, useEffect } from 'react';
import './audit-styles.css';

export default function AuditSystemePage() {
  // Metadata via useEffect pour les pages client
  useEffect(() => {
    document.title = 'L\'Audit SYSTÈME en 10 Points | NL Project';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'La checklist pour transformer votre site en machine à vendre. Recevez l\'accès immédiat gratuit.');
    }
  }, []);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // ✅ Appel à l'API Next.js qui gère l'envoi vers n8n (évite CORS)
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page-container">
      <div className="capture-container">
        {/* Logo */}
        <div className="logo-container">
          <img 
            src="/logo-nl-project.png" 
            alt="Logo de NL Project" 
            className="logo-capture-page"
            width={80}
            height={80}
          />
        </div>

        {!isSuccess ? (
          <>
            {/* Titre principal */}
            <h1 className="landing-title">
              L'Audit SYSTÈME en 10 Points
            </h1>

            {/* Sous-titre */}
            <p className="landing-subtitle">
              La checklist pour transformer votre site en machine à vendre. 
              Entrez votre email pour recevoir l'accès immédiat.
            </p>

            {/* Formulaire */}
            <form id="audit-form" onSubmit={handleSubmit} className="audit-form">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre meilleure adresse email"
                required
                className="email-input"
                disabled={isSubmitting}
              />
              
              <button
                type="submit"
                id="submit-btn"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ENVOI EN COURS...' : 'RECEVOIR L\'AUDIT GRATUIT'}
              </button>

              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
            </form>

            {/* Trust indicators */}
            <div className="trust-indicators">
              <p className="trust-text">
                ✓ 100% Gratuit • ✓ Aucun spam • ✓ Accès immédiat
              </p>
            </div>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Merci !</h2>
            <p className="success-text">
              Votre Audit SYSTÈME est en route vers votre boîte de réception.
            </p>
            <p className="success-subtext">
              Vérifiez vos spams si vous ne le voyez pas dans quelques minutes.
            </p>
            <a 
              href="/" 
              className="submit-button" 
              style={{ 
                marginTop: '30px', 
                display: 'inline-block',
                textDecoration: 'none',
                textAlign: 'center'
              }}
            >
              RETOUR À L'ACCUEIL
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

