#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const https = require('https')

// Configuration complète des assets à télécharger
const ASSETS_CONFIG = {
  // Images de produits et collections
  images: {
    'sneaker-01.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center',
    'sneaker-02.jpg': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center',
    'sneaker-03.jpg': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop&crop=center',
    'sneaker-04.jpg': 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop&crop=center',
    'tshirt-01.jpg': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center',
    'shorts-01.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center',
    'cap-01.jpg': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center',
    'jacket-01.jpg': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop&crop=center',
    'hoodie-01.jpg': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&crop=center',
    'pants-01.jpg': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=800&fit=crop&crop=center',
    'bag-01.jpg': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center',
    'watch-01.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center',
    'socks-01.jpg': 'https://images.unsplash.com/photo-1586350977771-b3d0a6c0c0c0?w=800&h=800&fit=crop&crop=center',
    'gloves-01.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center',
    'scarf-01.jpg': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop&crop=center',
    'belt-01.jpg': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center',
    'sunglasses-01.jpg': 'https://images.unsplash.com/photo-1572635196237-14b3f2812f0d?w=800&h=800&fit=crop&crop=center',
    'jewelry-01.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce3b1?w=800&h=800&fit=crop&crop=center',
    'perfume-01.jpg': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&crop=center',
    'skincare-01.jpg': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop&crop=center'
  },
  
  // Vidéos de collections et produits
  videos: {
    'running-collection.mp4': 'https://player.vimeo.com/external/123456789.sd.mp4?s=abc123&profile_id=165&oauth2_token_id=123456789',
    'streetwear-collection.mp4': 'https://player.vimeo.com/external/123456790.sd.mp4?s=def456&profile_id=165&oauth2_token_id=123456789',
    'training-collection.mp4': 'https://player.vimeo.com/external/123456791.sd.mp4?s=ghi789&profile_id=165&oauth2_token_id=123456789',
    'lifestyle-collection.mp4': 'https://player.vimeo.com/external/123456792.sd.mp4?s=jkl012&profile_id=165&oauth2_token_id=123456789',
    'sport-collection.mp4': 'https://player.vimeo.com/external/123456793.sd.mp4?s=mno345&profile_id=165&oauth2_token_id=123456789',
    'casual-collection.mp4': 'https://player.vimeo.com/external/123456794.sd.mp4?s=pqr678&profile_id=165&oauth2_token_id=123456789',
    'premium-collection.mp4': 'https://player.vimeo.com/external/123456795.sd.mp4?s=stu901&profile_id=165&oauth2_token_id=123456789',
    'limited-collection.mp4': 'https://player.vimeo.com/external/123456796.sd.mp4?s=vwx234&profile_id=165&oauth2_token_id=123456789'
  },
  
  // Assets hero et bannières
  hero: {
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center',
    'hero-overlay.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center',
    'banner-sale.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center',
    'banner-new.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center',
    'banner-sport.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center'
  },
  
  // Images de catégories
  categories: {
    'category-men.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center',
    'category-women.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center',
    'category-kids.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center',
    'category-sport.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center',
    'category-accessories.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center'
  },
  
  // Images de lookbook et lifestyle
  lifestyle: {
    'lookbook-01.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop&crop=center',
    'lookbook-02.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop&crop=center',
    'lookbook-03.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop&crop=center',
    'lifestyle-01.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center',
    'lifestyle-02.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center',
    'lifestyle-03.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center'
  }
}

// Fonction pour créer les répertoires
const createDirectories = () => {
  const dirs = [
    'public/ecom',
    'public/ecom/images',
    'public/ecom/videos',
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

// Fonction pour télécharger un fichier
const downloadFile = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`✅ Téléchargé: ${path.basename(filepath)}`)
          resolve()
        })
      } else {
        reject(new Error(`Erreur HTTP: ${response.statusCode}`))
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}) // Supprimer le fichier partiel
      reject(err)
    })
  })
}

// Fonction pour télécharger tous les assets
const downloadAssets = async () => {
  console.log('🚀 Début du téléchargement des assets...')
  
  try {
    // Télécharger les images
    console.log('\n📸 Téléchargement des images...')
    for (const [filename, url] of Object.entries(ASSETS_CONFIG.images)) {
      const filepath = `public/ecom/images/${filename}`
      try {
        await downloadFile(url, filepath)
      } catch (error) {
        console.log(`⚠️  Erreur pour ${filename}: ${error}`)
      }
    }
    
    // Télécharger les vidéos
    console.log('\n🎬 Téléchargement des vidéos...')
    for (const [filename, url] of Object.entries(ASSETS_CONFIG.videos)) {
      const filepath = `public/ecom/videos/${filename}`
      try {
        await downloadFile(url, filepath)
      } catch (error) {
        console.log(`⚠️  Erreur pour ${filename}: ${error}`)
      }
    }
    
    // Télécharger les assets hero
    console.log('\n🌟 Téléchargement des assets hero...')
    for (const [filename, url] of Object.entries(ASSETS_CONFIG.hero)) {
      const filepath = `public/ecom/hero/${filename}`
      try {
        await downloadFile(url, filepath)
      } catch (error) {
        console.log(`⚠️  Erreur pour ${filename}: ${error}`)
      }
    }
    
    // Télécharger les catégories
    console.log('\n📁 Téléchargement des catégories...')
    for (const [filename, url] of Object.entries(ASSETS_CONFIG.categories)) {
      const filepath = `public/ecom/categories/${filename}`
      try {
        await downloadFile(url, filepath)
      } catch (error) {
        console.log(`⚠️  Erreur pour ${filename}: ${error}`)
      }
    }
    
    // Télécharger le lifestyle
    console.log('\n💫 Téléchargement du lifestyle...')
    for (const [filename, url] of Object.entries(ASSETS_CONFIG.lifestyle)) {
      const filepath = `public/ecom/lifestyle/${filename}`
      try {
        await downloadFile(url, filepath)
      } catch (error) {
        console.log(`⚠️  Erreur pour ${filename}: ${error}`)
      }
    }
    
    console.log('\n🎉 Téléchargement terminé !')
    
  } catch (error) {
    console.error('❌ Erreur lors du téléchargement:', error)
  }
}

// Fonction pour créer le mapping des assets
const createAssetMapping = () => {
  const mapping = {
    images: ASSETS_CONFIG.images,
    videos: ASSETS_CONFIG.videos,
    hero: ASSETS_CONFIG.hero,
    categories: ASSETS_CONFIG.categories,
    lifestyle: ASSETS_CONFIG.lifestyle
  }
  
  const mappingPath = 'public/ecom/assets-mapping.json'
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2))
  console.log(`📝 Mapping des assets créé: ${mappingPath}`)
}

// Fonction principale
const main = async () => {
  console.log('🎯 Script de téléchargement des assets e-commerce')
  console.log('===============================================')
  
  createDirectories()
  await downloadAssets()
  createAssetMapping()
  
  console.log('\n✨ Script terminé avec succès !')
}

// Exécution
main()











