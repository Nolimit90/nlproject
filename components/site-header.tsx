"use client";

<<<<<<< Updated upstream
import Link from "next/link"
import { Mountain, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { scrollToContactForm } from "@/components/contact-form-section"
import React from "react"

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navLinks = [
    { href: "#hero", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#whyme", label: "Pourquoi moi ?" },
    { href: "#contact", label: "Contact" },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    
    if (href === "#contact") {
      scrollToContactForm()
      return
    }
    
    const target = document.querySelector(href)
    const header = document.querySelector("header.sticky")
    if (target) {
      const headerHeight = header ? header.getBoundingClientRect().height : 0
      const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Fermer le menu si on clique en dehors
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Mountain className="h-6 w-6" />
          <span className="sr-only">NL Project</span>
          <span>NL Project</span>
        </Link>
        
        {/* Navigation desktop */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={e => {
                e.preventDefault()
                handleNavClick(link.href)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bouton menu mobile */}
        <div className="lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
=======
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo "NL Project" à gauche */}
          <Link href="/" className="text-xl font-michelle-bold text-gray-900">
            NL Project
          </Link>

          {/* Menu centré en Michelle Gore Medium */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-michelle-medium">
              Accueil
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-gray-900 transition-colors font-michelle-medium">
              Services
            </Link>
            <Link href="/#tarifs" className="text-gray-700 hover:text-gray-900 transition-colors font-michelle-medium">
              Tarifs
            </Link>
            <Link href="/#whyme" className="text-gray-700 hover:text-gray-900 transition-colors font-michelle-medium">
              Pourquoi moi ?
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-gray-900 transition-colors font-michelle-medium">
              Contact
            </Link>
          </nav>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
>>>>>>> Stashed changes
        </div>

        {/* Menu mobile avec typographie Michelle Gore */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors py-2 font-michelle-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Accueil
              </Link>
              <Link href="/#services" className="text-gray-700 hover:text-gray-900 transition-colors py-2 font-michelle-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Services
              </Link>
              <Link href="/#tarifs" className="text-gray-700 hover:text-gray-900 transition-colors py-2 font-michelle-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Tarifs
              </Link>
              <Link href="/#whyme" className="text-gray-700 hover:text-gray-900 transition-colors py-2 font-michelle-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Pourquoi moi ?
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-gray-900 transition-colors py-2 font-michelle-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Menu mobile overlay */}
      {isMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-50 lg:hidden">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu latéral */}
          <div className="absolute right-0 top-0 h-full w-80 bg-background shadow-xl">
            <div className="flex h-16 items-center justify-between px-6 border-b">
              <span className="font-semibold">Menu</span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col p-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-4 text-lg font-medium border-b border-border/50 last:border-b-0 hover:text-primary transition-colors"
                  onClick={e => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
