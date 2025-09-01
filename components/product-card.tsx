"use client"

import { useState } from 'react'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useWishlist } from './wishlist'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  isNew?: boolean
  isSale?: boolean
  oldPrice?: number
  sizes: string[]
  colors: string[]
  availability: string
  brand: string
  tags: string[]
  rating?: number
  reviewCount?: number
}

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: number) => void
  onViewProduct: (productId: number) => void
  className?: string
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onViewProduct, 
  className = "" 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = () => {
    onViewProduct(product.id)
  }

  const handleAddToCart = () => {
    onAddToCart(product.id)
  }

  return (
    <div
      className={`bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.isNew && (
            <Badge className="bg-green-500 text-white text-xs font-bold">
              NOUVEAU
            </Badge>
          )}
          {product.isSale && product.oldPrice && (
            <Badge className="bg-red-500 text-white text-xs font-bold">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 transition-all duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={`h-5 w-5 transition-colors duration-200 ${
              isInWishlist(product.id) 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
            }`} 
          />
        </Button>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleQuickView}
              className="bg-white/90 hover:bg-white text-gray-900"
            >
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        {/* Brand and Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {product.brand}
          </span>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.price.toFixed(2)}€
            </span>
            {product.isSale && product.oldPrice && (
              <span className="text-gray-500 dark:text-gray-400 line-through">
                {product.oldPrice.toFixed(2)}€
              </span>
            )}
          </div>
        </div>
        
        {/* Colors */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Couleurs:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-200 dark:border-gray-600 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Tailles:</span>
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 3).map((size, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Disponibilité:</span>
          <Badge 
            variant={product.availability === 'En stock' ? 'default' : 'secondary'}
            className={product.availability === 'En stock' ? 'bg-green-500' : ''}
          >
            {product.availability}
          </Badge>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          AJOUTER AU PANIER
        </Button>
      </div>
    </div>
  )
}



