'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/atelier-aster/useCart';
import Link from 'next/link';

export default function AtelierAsterCartContent() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutData, setCheckoutData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Commande de démo terminée avec succès ! Merci d\'avoir testé ATELIER ASTER.');
    clearCart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value
    });
  };

  if (cartItems.length === 0) {
    return (
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-black mb-6 tracking-wide">
            Panier
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Votre panier est vide
          </p>
          <Link
            href="/demos/atelier-aster/shop"
            className="px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300"
          >
            Continuer les achats
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif font-light text-black mb-16 text-center tracking-wide">
          Panier
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Cart Items */}
          <div>
            <h2 className="text-2xl font-serif font-light text-black mb-8">
              Récapitulatif
            </h2>
            
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-black mb-2">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-light text-black">
                      €{item.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="border border-gray-300 px-3 py-1 text-center"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-xl font-light">
                <span>Total</span>
                <span>€{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <h2 className="text-2xl font-serif font-light text-black mb-8">
              Informations de livraison
            </h2>
            
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={checkoutData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:border-black focus:outline-none transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={checkoutData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:border-black focus:outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={checkoutData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 focus:border-black focus:outline-none transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={checkoutData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 focus:border-black focus:outline-none transition-colors duration-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-600 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={checkoutData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:border-black focus:outline-none transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-600 mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={checkoutData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:border-black focus:outline-none transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-600 mb-2">
                    Pays
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={checkoutData.country}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:border-black focus:outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300"
                >
                  Complete Demo Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
