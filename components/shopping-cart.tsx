"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2, CreditCard, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface ShoppingCartProps {
  cartItems: CartItem[]
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemoveItem: (productId: number) => void
  onClearCart: () => void
}

export default function ShoppingCart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.20 // 20% TVA
  const total = subtotal + shipping + tax

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      onUpdateQuantity(productId, newQuantity)
    } else {
      onRemoveItem(productId)
    }
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode.trim())
      setCouponCode('')
    }
  }

  const handleCheckout = () => {
    // Ici on pourrait rediriger vers une page de checkout
    console.log('Proceeding to checkout...')
    setIsOpen(false)
  }

  const handleClearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      onClearCart()
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[400px] sm:w-[500px]">
          <SheetHeader>
            <SheetTitle className="text-left flex items-center justify-between">
              <span>Panier ({cartCount})</span>
              {cartCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Vider
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6">
            {cartCount === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Votre panier est vide
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Ajoutez des produits à votre panier pour commencer vos achats
                </p>
                <Button onClick={() => setIsOpen(false)}>
                  Parcourir les produits
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        {item.size && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Taille: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Couleur: {item.color}
                          </p>
                        )}
                        <p className="font-bold text-gray-900 dark:text-white">
                          {item.price.toFixed(2)}€
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Remove Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code */}
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Code promo..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyCoupon} variant="outline">
                      Appliquer
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-green-600">
                        Code appliqué: {appliedCoupon}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)}€`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TVA (20%)</span>
                    <span>{tax.toFixed(2)}€</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Réduction</span>
                      <span>-5.00€</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                  size="lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Passer la commande
                  <Lock className="h-4 w-4 ml-2" />
                </Button>

                {/* Security Notice */}
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Vos informations de paiement sont sécurisées et cryptées
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
