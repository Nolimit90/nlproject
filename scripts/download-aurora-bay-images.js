const https = require('https');
const fs = require('fs');
const path = require('path');

// Images à télécharger pour Aurora Bay Resort
const images = [
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&crop=center',
    filename: 'hero.jpg',
    description: 'Luxury beachfront resort with ocean views'
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop&crop=center',
    filename: 'deluxe-room.jpg',
    description: 'Deluxe room with ocean views'
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop&crop=center',
    filename: 'ocean-suite.jpg',
    description: 'Ocean suite with private balcony'
  },
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=900&fit=crop&crop=center',
    filename: 'presidential-villa.jpg',
    description: 'Presidential villa with private pool'
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop&crop=center',
    filename: 'restaurant.jpg',
    description: 'Fine dining restaurant'
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop&crop=center',
    filename: 'spa.jpg',
    description: 'Luxury spa and wellness center'
  }
];

const auroraBayDir = path.join(__dirname, '../public/aurora-bay');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(auroraBayDir)) {
  fs.mkdirSync(auroraBayDir, { recursive: true });
  console.log('📁 Dossier /public/aurora-bay créé');
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(auroraBayDir, filename);
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

async function downloadAllImages() {
  console.log('🚀 Téléchargement des images pour Aurora Bay Resort...\n');
  
  const results = [];
  
  // Télécharger toutes les images
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
      results.push({ filename: image.filename, status: 'success' });
    } catch (error) {
      console.error(`❌ Erreur lors du téléchargement de ${image.filename}:`, error.message);
      results.push({ filename: image.filename, status: 'failed', error: error.message });
    }
  }
  
  // Résumé
  console.log('\n📊 Résumé du téléchargement:');
  results.forEach(result => {
    const statusIcon = result.status === 'success' ? '✅' : '❌';
    console.log(`${statusIcon} ${result.filename} - ${result.status}`);
  });
  
  console.log(`\n📁 Images sauvegardées dans: ${auroraBayDir}`);
  
  // Vérifier que tous les fichiers nécessaires existent
  const requiredFiles = images.map(img => img.filename);
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(auroraBayDir, file)));
  
  if (missingFiles.length === 0) {
    console.log('🎉 Toutes les images sont prêtes !');
  } else {
    console.warn(`⚠️  Fichiers manquants: ${missingFiles.join(', ')}`);
  }
}

downloadAllImages().catch(console.error);
