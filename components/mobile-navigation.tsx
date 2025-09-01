"use client"

import { useState } from 'react'
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface MobileNavigationProps {
  cartCount: number
  wishlistCount: number
  onSearch: (query: string) => void
  categories: Array<{ id: string; label: string; count: number }>
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function MobileNavigation({
  cartCount,
  wishlistCount,
  onSearch,
  categories,
  activeCategory,
  onCategoryChange
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
    setSearchQuery('')
    setIsOpen(false)
  }

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu Navigation</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Rechercher</label>
            <div className="flex space-x-2">
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Catégories</label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Actions rapides</label>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                <User className="h-4 w-4 mr-2" />
                Mon compte
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                <Heart className="h-4 w-4 mr-2" />
                Favoris ({wishlistCount})
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Panier ({cartCount})
              </Button>
            </div>
          </div>

          {/* Additional Links */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Informations</label>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                À propos
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Contact
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Livraison
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Retours
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}



