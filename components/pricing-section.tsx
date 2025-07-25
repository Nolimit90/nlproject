"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection({ onSelectPack }: { onSelectPack?: (packId: string) => void }) {
  const pricingPacks = [
    {
      id: "Pack Essentiel",
      name: "Pack Essentiel",
      price: "390€",
      description: "Idéal pour démarrer simplement",
      features: [
        "Site vitrine professionnel (Accueil + Contact)",
        "QR code personnalisé",
        "Design responsive rapide",
        "Conception rapide et efficace"
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Prix</h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 md:gap-8 py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-x-hidden">
          {pricingPacks.map((pack) => (
            <div key={pack.id} className="flex flex-col h-full p-0 md:p-0 border rounded shadow bg-white">
              <div className="flex flex-col flex-grow p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-2 text-center">{pack.name}</h3>
                <div className="mb-4 text-center text-base text-muted-foreground">{pack.description}</div>
                <div className="flex items-center justify-center min-h-[48px] w-full mb-4">
                  <span className="text-[32px] md:text-4xl font-bold text-blue-700 w-full text-center whitespace-nowrap leading-tight">
                    {pack.price}
                  </span>
                </div>
                <ul className="grid gap-2 text-sm text-muted-foreground w-full mb-0 mt-0 flex-grow">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {onSelectPack && (
                <div className="flex justify-center p-6 pt-0 mt-auto">
                  <Button
                    onClick={() => onSelectPack(pack.id)}
                    className="w-full max-w-xs"
                    variant="default"
                    size="lg"
                  >
                    Commandez
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
