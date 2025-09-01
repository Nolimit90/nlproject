const https = require('https');
const fs = require('fs');
const path = require('path');

// Images à télécharger pour la démo hôtel
const images = [
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&crop=center',
    filename: 'hero.jpg',
    description: 'Luxury resort with infinity pool and mountain views'
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop&crop=center',
    filename: 'grid-1.jpg',
    description: 'Luxury resort pool with mountain backdrop'
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop&crop=center',
    filename: 'grid-2.jpg',
    description: 'Elegant dining terrace overlooking the valley'
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop&crop=center',
    filename: 'alt-1.jpg',
    description: 'Luxury spa and wellness area'
  },
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=900&fit=crop&crop=center',
    filename: 'alt-2.jpg',
    description: 'Fine dining restaurant with mountain views'
  }
];

const hotelDir = path.join(__dirname, '../public/hotel');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(hotelDir)) {
  fs.mkdirSync(hotelDir, { recursive: true });
  console.log('📁 Dossier /public/hotel créé');
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(hotelDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Téléchargé: ${filename}`);
          resolve(filename);
        });
      } else {
        reject(new Error(`Erreur HTTP: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Supprimer le fichier partiel
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filepath, () => {}); // Supprimer le fichier partiel
      reject(err);
    });
  });
}

async function createFallbackImage(sourceFilename, targetFilename) {
  try {
    const sourcePath = path.join(hotelDir, sourceFilename);
    const targetPath = path.join(hotelDir, targetFilename);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`🔄 Fallback créé: ${targetFilename} (copie de ${sourceFilename})`);
      return true;
    } else {
      console.warn(`⚠️  Impossible de créer le fallback: ${sourceFilename} n'existe pas`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la création du fallback ${targetFilename}:`, error.message);
    return false;
  }
}

async function downloadAllImages() {
  console.log('🚀 Téléchargement des images pour la démo hôtel...\n');
  
  const results = [];
  
  // Télécharger les images principales
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
      results.push({ filename: image.filename, status: 'success' });
    } catch (error) {
      console.error(`❌ Erreur lors du téléchargement de ${image.filename}:`, error.message);
      results.push({ filename: image.filename, status: 'failed', error: error.message });
    }
  }
  
  // Créer alt-3.jpg comme fallback d'alt-2.jpg
  console.log('\n🔄 Création de alt-3.jpg comme fallback...');
  const fallbackSuccess = await createFallbackImage('alt-2.jpg', 'alt-3.jpg');
  
  if (fallbackSuccess) {
    results.push({ filename: 'alt-3.jpg', status: 'fallback' });
  }
  
  // Résumé
  console.log('\n📊 Résumé du téléchargement:');
  results.forEach(result => {
    const statusIcon = result.status === 'success' ? '✅' : 
                      result.status === 'fallback' ? '🔄' : '❌';
    console.log(`${statusIcon} ${result.filename} - ${result.status}`);
  });
  
  console.log(`\n📁 Images sauvegardées dans: ${hotelDir}`);
  
  // Vérifier que tous les fichiers nécessaires existent
  const requiredFiles = ['hero.jpg', 'grid-1.jpg', 'grid-2.jpg', 'alt-1.jpg', 'alt-2.jpg', 'alt-3.jpg'];
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(hotelDir, file)));
  
  if (missingFiles.length === 0) {
    console.log('🎉 Toutes les images sont prêtes !');
  } else {
    console.warn(`⚠️  Fichiers manquants: ${missingFiles.join(', ')}`);
  }
}

downloadAllImages().catch(console.error);
