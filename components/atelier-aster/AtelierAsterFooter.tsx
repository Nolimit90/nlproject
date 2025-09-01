import Link from 'next/link';

export default function AtelierAsterFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-light tracking-widest text-white mb-4">
                ASTER
              </h3>
              <p className="text-white/70 max-w-md leading-relaxed">
                L'art de la précision horlogère. Chaque pièce ASTER est un témoignage 
                de l'excellence suisse et de la passion du détail.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide">NAVIGATION</h4>
            <ul className="space-y-3">
              <li><Link href="/demos/atelier-aster" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Home</Link></li>
              <li><Link href="/demos/atelier-aster/shop" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Shop</Link></li>
              <li><Link href="/demos/atelier-aster/collections" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Collections</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide">COMPAGNIE</h4>
            <ul className="space-y-3">
              <li><Link href="/demos/atelier-aster/about" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">About</Link></li>
              <li><Link href="/demos/atelier-aster/contact" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Contact</Link></li>
              <li><Link href="/demos/atelier-aster/journal" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Journal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} ATELIER ASTER. Tous droits réservés.
            </div>
            
            <div className="flex space-x-8 text-sm">
              <Link href="/demos/atelier-aster/privacy" className="text-white/60 hover:text-white transition-colors duration-300">
                Politique de confidentialité
              </Link>
              <Link href="/demos/atelier-aster/terms" className="text-white/60 hover:text-white transition-colors duration-300">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
