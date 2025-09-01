"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ShoppingCart as ShoppingCartIcon, Heart, Filter, Search, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'
import MobileNavigation from './mobile-navigation'
import AdvancedFilters from './advanced-filters'
import SmartSearch from './smart-search'
import Wishlist, { useWishlist } from './wishlist'
import ProductCard from './product-card'
import ShoppingCartComponent from './shopping-cart'

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

interface FilterOptions {
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  availability: string[]
  brands: string[]
}

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export default function EnhancedEcommerce() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    availability: [],
    brands: []
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const categories = [
    { id: 'all', label: 'Tous', count: 12 },
    { id: 'sneakers', label: 'Sneakers', count: 4 },
    { id: 'clothing', label: 'Vêtements', count: 5 },
    { id: 'accessories', label: 'Accessoires', count: 3 }
  ]

  const products: Product[] = [
    {
      id: 1,
      name: 'Nike Dunk Low',
      category: 'sneakers',
      price: 129.99,
      image: '/ecommerce/sneaker-01.jpg',
      isNew: true,
      sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
      colors: ['Noir', 'Blanc', 'Rouge'],
      availability: 'En stock',
      brand: 'Nike',
      tags: ['Nike', 'Dunk', 'Sneakers', 'Streetwear'],
      rating: 4.8,
      reviewCount: 127
    },
    {
      id: 2,
      name: 'Hoodie Streetwear',
      category: 'clothing',
      price: 89.99,
      image: '/ecommerce/hoodie-01.jpg',
      isSale: true,
      oldPrice: 119.99,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Noir', 'Gris', 'Bleu'],
      availability: 'En stock',
      brand: 'Patta',
      tags: ['Hoodie', 'Streetwear', 'Vêtements', 'Patta'],
      rating: 4.6,
      reviewCount: 89
    },
    {
      id: 3,
      name: 'Cap Nike Heritage',
      category: 'accessories',
      price: 34.99,
      image: '/ecommerce/cap-01.jpg',
      sizes: ['S/M', 'L/XL'],
      colors: ['Noir', 'Bleu', 'Rouge'],
      availability: 'En stock',
      brand: 'Nike',
      tags: ['Cap', 'Nike', 'Accessoires', 'Heritage'],
      rating: 4.4,
      reviewCount: 56
    },
    {
      id: 4,
      name: 'T-Shirt Classic',
      category: 'clothing',
      price: 49.99,
      image: '/ecommerce/tshirt-01.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blanc', 'Noir', 'Gris'],
      availability: 'En stock',
      brand: 'Patta',
      tags: ['T-Shirt', 'Classic', 'Vêtements', 'Patta'],
      rating: 4.7,
      reviewCount: 203
    },
    {
      id: 5,
      name: 'Nike Air Max',
      category: 'sneakers',
      price: 159.99,
      image: '/ecommerce/sneaker-02.jpg',
      sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
      colors: ['Blanc', 'Gris', 'Noir'],
      availability: 'En stock',
      brand: 'Nike',
      tags: ['Nike', 'Air Max', 'Sneakers', 'Sport'],
      rating: 4.9,
      reviewCount: 156
    },
    {
      id: 6,
      name: 'Sac à dos Urban',
      category: 'accessories',
      price: 79.99,
      image: '/ecommerce/bag-01.jpg',
      sizes: ['One Size'],
      colors: ['Noir', 'Gris', 'Bleu'],
      availability: 'En stock',
      brand: 'Patta',
      tags: ['Sac', 'Urban', 'Accessoires', 'Patta'],
      rating: 4.5,
      reviewCount: 78
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use useMemo instead of useEffect for filtering - this prevents infinite loops
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory)
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Advanced filters
    filtered = filtered.filter(p => {
      // Price range
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
        return false
      }

      // Sizes
      if (filters.sizes.length > 0 && !filters.sizes.some(size => p.sizes.includes(size))) {
        return false
      }

      // Colors
      if (filters.colors.length > 0 && !filters.colors.some(color => p.colors.includes(color))) {
        return false
      }

      // Availability
      if (filters.availability.length > 0 && !filters.availability.includes(p.availability)) {
        return false
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false
      }

      return true
    })

    return filtered
  }, [activeCategory, searchQuery, filters, products])

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId)
      if (existingItem) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }]
      }
    })
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters)
  }, [])

  const handleViewProduct = (productId: number) => {
    // Scroll to product or navigate to product page
    console.log('View product:', productId)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Nike × Patta */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">NIKE × PATTA</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Collaboration exclusive</p>
              </div>
            </div>

            {/* Navigation des catégories - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`uppercase tracking-wider text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id 
                      ? 'text-red-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </nav>

            {/* Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Smart Search */}
              <SmartSearch 
                onSearch={handleSearch}
                products={products}
                placeholder="Rechercher un produit..."
              />

              {/* Advanced Filters */}
              <AdvancedFilters
                onFiltersChange={handleFiltersChange}
                isOpen={isFiltersOpen}
                onOpenChange={setIsFiltersOpen}
              />

              {/* Theme Toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Wishlist */}
              <Wishlist 
                onAddToCart={addToCart}
                onViewProduct={handleViewProduct}
              />

              {/* Panier */}
              <ShoppingCartComponent
                cartItems={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
              />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <MobileNavigation
                cartCount={cartCount}
                wishlistCount={0} // This will be updated when wishlist is implemented
                onSearch={handleSearch}
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <img
          src="/ecommerce/hero-banner.jpg"
          alt="Nike x Patta Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            NIKE × PATTA
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez la collection exclusive qui fusionne innovation et style streetwear
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100">
            DÉCOUVRIR
          </Button>
        </div>
      </section>

      {/* Categories & Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex justify-center mb-16">
            <div className="flex space-x-1 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewProduct={handleViewProduct}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Aucun produit trouvé avec ces critères
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setFilters({
                    priceRange: [0, 500],
                    sizes: [],
                    colors: [],
                    availability: [],
                    brands: []
                  })
                }}
              >
                Effacer les filtres
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NIKE × PATTA</h3>
              <p className="text-gray-400">
                Innovation et style streetwear réunis dans des collections exclusives.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sneakers</li>
                <li>Vêtements</li>
                <li>Accessoires</li>
                <li>Collections</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact</li>
                <li>Livraison</li>
                <li>Retours</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-sm">IG</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-sm">TW</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-sm">FB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
