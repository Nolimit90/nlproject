import { Zap, Eye, TrendingUp } from "lucide-react";

export function WhatIOfferSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 scroll-mt-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ce que je propose</h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid gap-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="h-6 w-6 text-primary inline-block align-middle" />
              <h3 className="text-xl font-bold inline-block align-middle m-0 p-0">Rapidité</h3>
            </div>
            <p className="text-muted-foreground">Livraison de votre site en quelques jours, pas en semaines.</p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Eye className="h-6 w-6 text-primary inline-block align-middle" />
              <h3 className="text-xl font-bold inline-block align-middle m-0 p-0">Clarté</h3>
            </div>
            <p className="text-muted-foreground">Un site simple à gérer, sans jargon technique.</p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingUp className="h-6 w-6 text-primary inline-block align-middle" />
              <h3 className="text-xl font-bold inline-block align-middle m-0 p-0">Rentabilité</h3>
            </div>
            <p className="text-muted-foreground">Un investissement qui rapporte rapidement grâce à une présence en ligne efficace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
