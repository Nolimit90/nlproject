"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { WhatIOfferSection } from "@/components/what-i-offer-section"
import { PricingSection } from "@/components/pricing-section"
import { WhyMeSection } from "@/components/why-me-section"
import { ContactForm, scrollToContactForm } from "@/components/contact-form-section"

function ClientPageContent() {
  const [preSelectedPack, setPreSelectedPack] = useState<string | null>(null)

  const handleSelectPack = (packId: string) => {
    setPreSelectedPack(packId)
    // Scroll parfaitement au formulaire avec offset
    scrollToContactForm()
  }

  return (
    <>
      <HeroSection />
      <WhatIOfferSection />
      <PricingSection onSelectPack={handleSelectPack} />
      <WhyMeSection />
      <ContactForm preSelectedPack={preSelectedPack} />
    </>
  )
}

export default ClientPageContent;
