#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const https = require('https')

// Configuration des images à télécharger depuis Pexels
const PEXELS_IMAGES = {
  // Sneakers
  'sneaker-01.jpg': 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800',
  'sneaker-02.jpg': 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
  'sneaker-03.jpg': 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800',
  'sneaker-04.jpg': 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Vêtements
  'tshirt-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'shorts-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'jacket-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'hoodie-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'pants-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Accessoires
  'cap-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'bag-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'watch-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'socks-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gloves-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'scarf-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'belt-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'sunglasses-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'jewelry-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'perfume-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'skincare-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800'
}

// Images Hero
const PEXELS_HERO = {
  'hero-bg.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'hero-overlay.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'banner-sale.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'banner-new.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'banner-sport.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=1200'
}

// Images Catégories
const PEXELS_CATEGORIES = {
  'category-men.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=600',
  'category-women.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=600',
  'category-kids.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=600',
  'category-sport.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=600',
  'category-accessories.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=600'
}

// Images Lifestyle
const PEXELS_LIFESTYLE = {
  'lookbook-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'lookbook-02.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'lookbook-03.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'lifestyle-01.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'lifestyle-02.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800',
  'lifestyle-03.jpg': 'https://images.pexels.com/photos/6311476/pexels-photo-6311476.jpeg?auto=compress&cs=tinysrgb&w=800'
}

// Fonction pour télécharger une image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`✅ Image téléchargée: ${path.basename(filepath)}`)
          resolve()
        })
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`))
      }
    }).on('error', (err) => {
      reject(err)
    })
    
    file.on('error', (err) => {
      fs.unlink(filepath, () => {}) // Supprimer le fichier en cas d'erreur
      reject(err)
    })
  })
}

// Fonction pour télécharger toutes les images
const downloadAllImages = async () => {
  console.log('🎨 Téléchargement des images depuis Pexels...')
  
  // Créer les répertoires si ils n'existent pas
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
  
  // Télécharger les images de produits
  console.log('\n📦 Téléchargement des images de produits...')
  for (const [filename, url] of Object.entries(PEXELS_IMAGES)) {
    try {
      await downloadImage(url, `public/ecom/images/${filename}`)
    } catch (error) {
      console.log(`❌ Erreur pour ${filename}: ${error.message}`)
    }
  }
  
  // Télécharger les images hero
  console.log('\n🌟 Téléchargement des images hero...')
  for (const [filename, url] of Object.entries(PEXELS_HERO)) {
    try {
      await downloadImage(url, `public/ecom/hero/${filename}`)
    } catch (error) {
      console.log(`❌ Erreur pour ${filename}: ${error.message}`)
    }
  }
  
  // Télécharger les images de catégories
  console.log('\n📂 Téléchargement des images de catégories...')
  for (const [filename, url] of Object.entries(PEXELS_CATEGORIES)) {
    try {
      await downloadImage(url, `public/ecom/categories/${filename}`)
    } catch (error) {
      console.log(`❌ Erreur pour ${filename}: ${error.message}`)
    }
  }
  
  // Télécharger les images lifestyle
  console.log('\n💫 Téléchargement des images lifestyle...')
  for (const [filename, url] of Object.entries(PEXELS_LIFESTYLE)) {
    try {
      await downloadImage(url, `public/ecom/lifestyle/${filename}`)
    } catch (error) {
      console.log(`❌ Erreur pour ${filename}: ${error.message}`)
    }
  }
  
  console.log('\n✨ Téléchargement terminé !')
}

// Exécution
downloadAllImages().catch(console.error)











