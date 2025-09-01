import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Merci !
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Votre message a été envoyé avec succès. Nous vous recontactons sous peu.
          </p>
          
          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full">
                Retour à l'accueil
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="outline" className="w-full">
                Envoyer un autre message
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 