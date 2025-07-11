"use client"

import Link from "next/link"
import { Mountain, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { scrollToContactForm } from "@/components/contact-form-section"

export default function SiteHeader() {
  const navLinks = [
    { href: "#hero", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#whyme", label: "Pourquoi moi ?" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Mountain className="h-6 w-6" />
          <span className="sr-only">NL Project</span>
          <span>NL Project</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            link.href === "#contact"
              ? <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={e => {
                    e.preventDefault();
                    scrollToContactForm();
                  }}
                >
                  {link.label}
                </a>
              : <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
              <SheetTitle>
                <span className="sr-only">Menu principal</span>
              </SheetTitle>
            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                link.href === "#contact"
                  ? <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-semibold hover:text-primary"
                      onClick={e => {
                        e.preventDefault();
                        scrollToContactForm();
                      }}
                    >
                      {link.label}
                    </a>
                  : <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-semibold hover:text-primary"
                    >
                      {link.label}
                    </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  )
}
