"use client";

export default function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Copyright centré */}
          <p className="text-sm font-michelle-regular text-gray-600 mb-4">
            © 2025 NL Project. Tous droits réservés.
          </p>
          
          {/* Liens légaux discrets */}
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors font-michelle-regular">
              Mentions légales
            </a>
            <a href="#" className="hover:text-gray-700 transition-colors font-michelle-regular">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-gray-700 transition-colors font-michelle-regular">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
