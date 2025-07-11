import React from "react";
import Link from "next/link";

export default function MerciPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Merci pour votre message !</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Votre demande a été reçue avec succès. Je vous recontacterai très bientôt.</p>
        <Link href="/" className="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 transition-colors">Retour à l'accueil</Link>
      </div>
    </main>
  );
} 