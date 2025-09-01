#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

// Créer des images de démonstration avec des couleurs solides
const createDemoImage = (filename, color, width = 800, height = 800) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dy=".3em">${filename.replace('.jpg', '')}</text>
  </svg>`
  
  const filepath = path.join('..', 'public', 'ecom', 'images', filename)
  fs.writeFileSync(filepath, svg)
  console.log(`✅ Image créée: ${filename}`)
}

// Créer toutes les images manquantes
const allImages = [
  // Sneakers
  { filename: 'sneaker-01.jpg', color: '#1E3A8A' },
  { filename: 'sneaker-02.jpg', color: '#059669' },
  { filename: 'sneaker-03.jpg', color: '#DC2626' },
  { filename: 'sneaker-04.jpg', color: '#7C3AED' },
  
  // Vêtements
  { filename: 'tshirt-01.jpg', color: '#374151' },
  { filename: 'shorts-01.jpg', color: '#1F2937' },
  { filename: 'jacket-01.jpg', color: '#111827' },
  { filename: 'hoodie-01.jpg', color: '#4B5563' },
  { filename: 'pants-01.jpg', color: '#2C3E50' },
  
  // Accessoires
  { filename: 'cap-01.jpg', color: '#6B7280' },
  { filename: 'bag-01.jpg', color: '#374151' },
  { filename: 'watch-01.jpg', color: '#1F2937' },
  { filename: 'socks-01.jpg', color: '#34495E' },
  { filename: 'gloves-01.jpg', color: '#2C3E50' },
  { filename: 'scarf-01.jpg', color: '#374151' },
  { filename: 'belt-01.jpg', color: '#1F2937' },
  { filename: 'sunglasses-01.jpg', color: '#8B4513' },
  { filename: 'jewelry-01.jpg', color: '#DAA520' },
  { filename: 'perfume-01.jpg', color: '#EC4899' },
  { filename: 'skincare-01.jpg', color: '#F59E0B' }
]

// Créer les répertoires si ils n'existent pas
const createDirectories = () => {
  const dirs = [
    'public/ecom/images',
    'public/ecom/hero',
    'public/ecom/categories',
    'public/ecom/lifestyle'
  ]
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`✅ Répertoire créé: ${dir}`)
    }
  })
}

// Créer les images hero
const createHeroImages = () => {
  const heroImages = [
    { filename: 'hero-bg.jpg', color: '#0F172A', width: 1920, height: 1080 },
    { filename: 'hero-overlay.jpg', color: '#1E293B', width: 1920, height: 1080 },
    { filename: 'banner-sale.jpg', color: '#DC2626', width: 1200, height: 400 },
    { filename: 'banner-new.jpg', color: '#059669', width: 1200, height: 400 },
    { filename: 'banner-sport.jpg', color: '#1E3A8A', width: 1200, height: 400 }
  ]
  
  heroImages.forEach(img => {
    const filepath = path.join('..', 'public', 'ecom', 'hero', img.filename)
    const svg = `<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${img.color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="72" fill="white" text-anchor="middle" dy=".3em">${img.filename.replace('.jpg', '')}</text>
    </svg>`
    fs.writeFileSync(filepath, svg)
    console.log(`✅ Image hero créée: ${img.filename}`)
  })
}

// Créer les images de catégories
const createCategoryImages = () => {
  const categoryImages = [
    { filename: 'category-men.jpg', color: '#1E3A8A', width: 600, height: 800 },
    { filename: 'category-women.jpg', color: '#DC2626', width: 600, height: 800 },
    { filename: 'category-kids.jpg', color: '#059669', width: 600, height: 800 },
    { filename: 'category-sport.jpg', color: '#7C3AED', width: 600, height: 800 },
    { filename: 'category-accessories.jpg', color: '#F59E0B', width: 600, height: 800 }
  ]
  
  categoryImages.forEach(img => {
    const filepath = path.join('..', 'public', 'ecom', 'categories', img.filename)
    const svg = `<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${img.color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dy=".3em">${img.filename.replace('.jpg', '')}</text>
    </svg>`
    fs.writeFileSync(filepath, svg)
    console.log(`✅ Image catégorie créée: ${img.filename}`)
  })
}

// Créer les images lifestyle
const createLifestyleImages = () => {
  const lifestyleImages = [
    { filename: 'lookbook-01.jpg', color: '#1F2937', width: 800, height: 1200 },
    { filename: 'lookbook-02.jpg', color: '#374151', width: 800, height: 1200 },
    { filename: 'lookbook-03.jpg', color: '#4B5563', width: 800, height: 1200 },
    { filename: 'lifestyle-01.jpg', color: '#6B7280', width: 800, height: 600 },
    { filename: 'lifestyle-02.jpg', color: '#9CA3AF', width: 800, height: 600 },
    { filename: 'lifestyle-03.jpg', color: '#D1D5DB', width: 800, height: 600 }
  ]
  
  lifestyleImages.forEach(img => {
    const filepath = path.join('..', 'public', 'ecom', 'lifestyle', img.filename)
    const svg = `<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${img.color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dy=".3em">${img.filename.replace('.jpg', '')}</text>
    </svg>`
    fs.writeFileSync(filepath, svg)
    console.log(`✅ Image lifestyle créée: ${img.filename}`)
  })
}

console.log('🎨 Création de toutes les images manquantes...')
createDirectories()
allImages.forEach(img => createDemoImage(img.filename, img.color))
createHeroImages()
createCategoryImages()
createLifestyleImages()
console.log('✨ Toutes les images ont été créées avec succès !')











