"use client"

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
        </div>
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
  )
}
