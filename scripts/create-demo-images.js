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
const demoImages = [
  { filename: 'pants-01.jpg', color: '#2C3E50' },
  { filename: 'socks-01.jpg', color: '#34495E' },
  { filename: 'sunglasses-01.jpg', color: '#8B4513' },
  { filename: 'jewelry-01.jpg', color: '#DAA520' }
]

console.log('🎨 Création des images de démonstration...')
demoImages.forEach(img => createDemoImage(img.filename, img.color))
console.log('✨ Images de démonstration créées avec succès !')











