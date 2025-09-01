import Link from 'next/link';
import DeviceFrame from '@/components/DeviceFrame';

export default function EcommerceDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#2D5A27] hover:text-[#1F3D1C] transition-colors duration-150"
        >
          ← Back to home
        </Link>
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
          E-commerce Nike x Patta Demo
        </h1>
        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
          Mobile-first e-commerce design for streetwear brands
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-12">
          <DeviceFrame type="iphone">
            <img 
              src="/ecommerce/hero-banner.jpg" 
              alt="E-commerce Nike x Patta website preview"
              className="w-full h-full object-cover"
            />
          </DeviceFrame>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Design hybride créatif et moderne
              </li>
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Navigation responsive et intuitive
              </li>
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Recherche fonctionnelle et filtres avancés
              </li>
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Style streetwear authentique
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Technologies</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Next.js 15 avec App Router
              </li>
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Tailwind CSS pour le design
              </li>
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Système de panier avancé
              </li>
              <li className="flex items-center text-sm text-[#4A4A4A]">
                <span className="w-2 h-2 bg-[#2D5A27] rounded-full mr-3"></span>
                Optimisation conversion mobile
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
