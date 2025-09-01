"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection({ onSelectPack }: { onSelectPack?: (packId: string) => void }) {
  const pricingPacks = [
    {
      id: "Pack Essentiel",
      name: "Pack Essentiel",
      price: "290€",
      description: "Parfait pour commencer",
      features: [
        "Site web responsive",
        "Design sur-mesure",
        "Optimisation SEO de base",
        "Formulaire de contact",
        "Hébergement 1 an inclus"
      ],
    },
    {
      id: "Pack Complet",
      name: "Pack Complet",
      price: "490€",
      description: "Parfait pour automatiser et gagner du temps",
      features: [
        "Toutes les options du Pack Essentiel",
        "Système de prise de commande ou réservation",
        "Notification client",
        "Interface simple pour commerçant ou salarié"
      ],
    },
    {
      id: "Projet sur mesure",
      name: "Projet sur mesure",
      price: "Sur devis",
      description: "Adapté aux grandes structures ou projets complexes",
      features: [
        "Site multi-pages",
        "Fonctionnalités spécifiques",
        "Design sur-mesure",
        "Accompagnement stratégique"
      ],
    },
  ];

  return (
    <section id="tarifs" className="w-full py-12 md:py-24 lg:py-32 scroll-mt-[160px] md:scroll-mt-[200px]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            {/* Titre en Michelle Gore Bold */}
            <h2 className="text-3xl font-michelle-bold tracking-tighter sm:text-5xl">Tarifs</h2>
          </div>
        </div>
        
        {/* Trois colonnes comme avant */}
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 md:gap-12 py-12 grid-cols-1 md:grid-cols-3 overflow-x-hidden">
          {pricingPacks.map((pack) => (
            <div key={pack.id} className="flex flex-col h-full p-0 border-0 rounded-2xl shadow-lg hover:shadow-xl bg-white transition-all duration-300 hover:scale-105 hover:border-blue-100">
              <div className="flex flex-col flex-grow p-8 md:p-10">
                {/* Titre du pack en Michelle Gore Bold */}
                <h3 className="text-2xl font-michelle-bold mb-2 text-center text-gray-900">{pack.name}</h3>
                
                {/* Description en Michelle Gore Regular */}
                <div className="mb-4 text-center text-base font-michelle-regular text-gray-600">{pack.description}</div>
                
                {/* Prix en Michelle Gore Bold */}
                <div className="flex items-center justify-center min-h-[48px] w-full mb-6">
                  <span className="text-[32px] md:text-4xl font-michelle-bold text-blue-700 w-full text-center whitespace-nowrap leading-tight">
                    {pack.price}
                  </span>
                </div>
                
                {/* Features en Michelle Gore Regular */}
                <ul className="grid gap-3 text-sm font-michelle-regular text-gray-600 w-full mb-0 mt-0 flex-grow">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Bouton "Commander" en bleu foncé (#0A0A23) avec texte blanc */}
              {onSelectPack && (
                <div className="flex justify-center p-6 pt-0 mt-auto">
                  <Button
                    onClick={() => onSelectPack(pack.id)}
                    className="w-full max-w-xs font-michelle-medium"
                    style={{ backgroundColor: '#0A0A23' }}
                    size="lg"
                  >
                    Commander
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
