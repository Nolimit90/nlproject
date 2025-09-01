"use client"

import { useState } from 'react'
import { Play, ShoppingCart, Heart, Search, User, Menu, X, Star, ArrowRight, Instagram, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UrbanEdgeDemo() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const products = [
    {
      id: 1,
      name: "URBAN HOODIE CLASSIC",
      price: 89.99,
      originalPrice: 129.99,
      category: "Hoodies",
      status: "SALE",
      statusColor: "bg-red-500",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "STREET BOMBER JACKET",
      price: 149.99,
      category: "Jackets",
      status: "NEW",
      statusColor: "bg-green-500",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "URBAN CARGO PANTS",
      price: 79.99,
      category: "Pants",
      status: "HOT",
      statusColor: "bg-orange-500",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      name: "STREETWEAR SNEAKERS",
      price: 119.99,
      category: "Footwear",
      status: "SALE",
      statusColor: "bg-red-500",
      image: "/placeholder.jpg"
    },
    {
      id: 5,
      name: "URBAN TEE GRAPHIC",
      price: 39.99,
      category: "T-Shirts",
      status: "NEW",
      statusColor: "bg-green-500",
      image: "/placeholder.jpg"
    },
    {
      id: 6,
      name: "STREET CAP BACKPACK",
      price: 69.99,
      category: "Accessories",
      status: "LIMITED",
      statusColor: "bg-purple-500",
      image: "/placeholder.jpg"
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: "ALEX RIVERA",
      role: "SKATEBOARDER",
      text: "Urban Edge captures the true essence of street culture. Their pieces are not just clothes, they're a statement.",
      avatar: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "MIA CHEN",
      role: "STREET ARTIST",
      text: "The quality and design of Urban Edge is unmatched. Every piece tells a story of urban rebellion and style.",
      avatar: "/placeholder.jpg"
    }
  ]

  const partnerLogos = [
    "URBAN FORGE", "STREET LEGACY", "CONCRETE STYLE", "GRAFFITI CO", "URBAN TRIBE", "STREET CULTURE"
  ]

  const instagramPhotos = [
    "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg",
    "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Sticky */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Urban Edge */}
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-black text-black tracking-wider">
                <span className="text-red-600">URBAN</span> EDGE
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-red-600 font-bold transition-colors">HOME</a>
              <a href="#" className="text-gray-900 hover:text-red-600 font-bold transition-colors">SHOP</a>
              <a href="#" className="text-gray-900 hover:text-red-600 font-bold transition-colors">COLLECTIONS</a>
              <a href="#" className="text-gray-900 hover:text-red-600 font-bold transition-colors">BLOG</a>
              <a href="#" className="text-gray-900 hover:text-red-600 font-bold transition-colors">CONTACT</a>
            </nav>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <a href="#" className="block text-gray-900 hover:text-red-600 font-bold">HOME</a>
              <a href="#" className="block text-gray-900 hover:text-red-600 font-bold">SHOP</a>
              <a href="#" className="block text-gray-900 hover:text-red-600 font-bold">COLLECTIONS</a>
              <a href="#" className="block text-gray-900 hover:text-red-600 font-bold">BLOG</a>
              <a href="#" className="block text-gray-900 hover:text-red-600 font-bold">CONTACT</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <h2 className="text-lg font-medium text-gray-300 tracking-wider">NEW COLLECTION</h2>
              <h1 className="text-7xl font-black leading-tight">
                <span className="block">STREET</span>
                <span className="block text-red-500" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>WEAR</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                Discover the latest urban fashion that defines street culture. Bold designs, premium quality, and authentic street style.
              </p>
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                SHOP NOW
              </Button>
            </div>
            
            {/* Right Content - Mannequin */}
            <div className="relative">
              <div className="relative z-10">
                <div className="w-96 h-[500px] bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl relative overflow-hidden shadow-2xl">
                  {/* Graffiti Background Elements */}
                  <div className="absolute top-6 left-6 w-20 h-20 bg-red-500 rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute top-32 right-10 w-16 h-16 bg-yellow-500 rounded-full opacity-80 animate-pulse delay-1000"></div>
                  <div className="absolute bottom-20 left-10 w-24 h-24 bg-green-500 rounded-full opacity-80 animate-pulse delay-2000"></div>
                  
                  {/* Mannequin Silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-80 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full opacity-70 shadow-inner"></div>
                  </div>
                  
                  {/* Hoodie Details */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-gray-500 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Graffiti Texture Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-28 h-28 bg-green-500 rounded-full"></div>
        </div>
      </section>

      {/* Promotions / Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Flat 40% Off */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white group hover:transform hover:scale-105 transition-all duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">FLAT 40% OFF</h3>
                <p className="text-xl font-semibold mb-6">EVERYTHING</p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 font-bold transition-colors">
                  SHOP NOW →
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-16 -mt-16"></div>
            </div>

            {/* Weekly Edit */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white group hover:transform hover:scale-105 transition-all duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">WEEKLY EDIT</h3>
                <p className="text-xl font-semibold mb-6">TOP BRANDS</p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-bold transition-colors">
                  EXPLORE NOW →
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-16 -mt-16"></div>
            </div>

            {/* Free Shipping */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 text-white group hover:transform hover:scale-105 transition-all duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">FREE SHIPPING</h3>
                <p className="text-xl font-semibold mb-6">WORLDWIDE</p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800 font-bold transition-colors">
                  LEARN MORE →
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-16 -mt-16"></div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">NEW ARRIVALS</h2>
            <div className="w-32 h-2 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 left-4 ${product.statusColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {product.status}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3">
                      ADD TO CART
                    </Button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                      )}
                      <span className="font-bold text-gray-900 text-xl">${product.price}</span>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Banner */}
      <section className="py-24 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-lg font-medium text-gray-300 mb-6 tracking-wider">STREET TRENDING 2025</h2>
            <h1 className="text-6xl font-black mb-12 leading-tight">
              <span className="block">URBAN</span>
              <span className="block text-red-500">CULTURE</span>
            </h1>
            <div className="flex justify-center">
              <button 
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="flex items-center space-x-4 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-red-600 ml-1" />
                </div>
                <span className="text-xl font-bold">WATCH VIDEO</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Graffiti Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-16 left-16 w-40 h-40 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-24 w-32 h-32 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-24 left-24 w-36 h-36 bg-green-500 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-16 w-28 h-28 bg-yellow-500 rounded-full animate-pulse delay-3000"></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">WHAT THEY SAY</h2>
            <div className="w-32 h-2 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-center text-white">
                <div className="text-6xl text-red-500 mb-6">"</div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-600 rounded-full mb-4"></div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-red-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Graffiti Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-500 rounded-full"></div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">TRUSTED BY</h3>
            <p className="text-gray-600">Leading streetwear brands worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 mx-auto"></div>
                  <p className="text-sm font-bold text-gray-700">{logo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">FOLLOW US</h2>
            <p className="text-xl text-gray-600 mb-2">@URBANEDGE_INSTAGRAM</p>
            <p className="text-gray-500">Daily streetwear inspiration</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPhotos.map((photo, index) => (
              <div key={index} className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105">
              FOLLOW US @URBANEDGE
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-black mb-4">
                <span className="text-red-500">URBAN</span> EDGE
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Defining urban culture through bold streetwear designs. Authentic, rebellious, and always ahead of the curve.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Collections</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">SUPPORT</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Urban Edge. All rights reserved. Streetwear that defines culture.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
