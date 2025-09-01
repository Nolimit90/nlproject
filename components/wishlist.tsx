"use client"

import { useState, useEffect } from 'react'
import { Heart, Trash2, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  isNew?: boolean
  isSale?: boolean
  oldPrice?: number
}

interface WishlistProps {
  onAddToCart: (productId: number) => void
  onViewProduct: (productId: number) => void
}

export default function Wishlist({ onAddToCart, onViewProduct }: WishlistProps) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      setWishlistItems(JSON.parse(saved))
    }
  }, [])

  // Save wishlist to localStorage
  const saveWishlist = (items: Product[]) => {
    localStorage.setItem('wishlist', JSON.stringify(items))
    setWishlistItems(items)
  }

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id)
    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlistItems, product]
      saveWishlist(updatedWishlist)
    }
  }

  // Remove product from wishlist
  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId)
    saveWishlist(updatedWishlist)
  }

  // Move product from wishlist to cart
  const moveToCart = (productId: number) => {
    onAddToCart(productId)
    removeFromWishlist(productId)
  }

  // Clear entire wishlist
  const clearWishlist = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre liste de souhaits ?')) {
      saveWishlist([])
    }
  }

  const wishlistCount = wishlistItems.length

  return (
    <>
      {/* Wishlist Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-6 w-6" />
            {wishlistCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {wishlistCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[400px] sm:w-[500px]">
          <SheetHeader>
            <SheetTitle className="text-left flex items-center justify-between">
              <span>Liste de souhaits</span>
              {wishlistCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Vider
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6">
            {wishlistCount === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Votre liste de souhaits est vide
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Ajoutez des produits à votre liste de souhaits pour les retrouver facilement
                </p>
                <Button onClick={() => setIsOpen(false)}>
                  Parcourir les produits
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      {item.isNew && (
                        <Badge className="absolute -top-2 -left-2 bg-green-500 text-white text-xs">
                          NOUVEAU
                        </Badge>
                      )}
                      {item.isSale && (
                        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                          -{Math.round(((item.oldPrice! - item.price) / item.oldPrice!) * 100)}%
                        </Badge>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.category}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {item.price.toFixed(2)}€
                        </span>
                        {item.isSale && item.oldPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {item.oldPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          onViewProduct(item.id)
                          setIsOpen(false)
                        }}
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => moveToCart(item.id)}
                        variant="default"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Ajouter
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

// Hook to use wishlist functionality
export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      setWishlistItems(JSON.parse(saved))
    }
  }, [])

  const addToWishlist = (product: Product) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id)
    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlistItems, product]
      setWishlistItems(updatedWishlist)
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    }
  }

  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId)
  }

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }
}



