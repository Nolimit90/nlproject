const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/restaurant';
const outputDir = 'public/restaurant/optimized';

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuration des tailles pour responsive
const sizes = {
  mobile: { width: 640, height: null, suffix: '640w' },
  tablet: { width: 1024, height: null, suffix: '1024w' },
  desktop: { width: 1920, height: null, suffix: '1920w' }
};

// Configuration spécifique pour chaque image
const imageConfigs = {
  'hero.jpg': { 
    maxSize: 300, // 300 KB max
    aspectRatio: 16/9,
    quality: 85
  },
  'story.jpg': { 
    maxSize: 250, // 250 KB max
    aspectRatio: 4/5,
    quality: 80
  },
  'band.jpg': { 
    maxSize: 250, // 250 KB max
    aspectRatio: 21/9,
    quality: 80
  },
  'entree.jpg': { 
    maxSize: 250, // 250 KB max
    aspectRatio: 4/3,
    quality: 80
  },
  'dessert.jpg': { 
    maxSize: 250, // 250 KB max
    aspectRatio: 4/3,
    quality: 80
  }
};

async function optimizeImage(filename) {
  const config = imageConfigs[filename];
  if (!config) return;

  console.log(`🔄 Optimisation de ${filename}...`);
  
  const inputPath = path.join(inputDir, filename);
  const baseName = path.parse(filename).name;
  
  const srcset = [];
  const promises = [];

  // Générer les différentes tailles
  for (const [sizeName, size] of Object.entries(sizes)) {
    const outputFilename = `${baseName}-${size.suffix}.webp`;
    const outputPath = path.join(outputDir, outputFilename);
    
    let transform = sharp(inputPath)
      .webp({ quality: config.quality })
      .resize(size.width, size.height, {
        fit: 'inside',
        withoutEnlargement: true
      });

    // Appliquer l'aspect ratio si spécifié
    if (config.aspectRatio) {
      transform = transform.resize(size.width, Math.round(size.width / config.aspectRatio), {
        fit: 'cover',
        position: 'center'
      });
    }

    promises.push(
      transform.toFile(outputPath)
        .then(() => {
          const stats = fs.statSync(outputPath);
          const sizeKB = Math.round(stats.size / 1024);
          console.log(`  ✅ ${outputFilename}: ${sizeKB} KB`);
          srcset.push(`${outputFilename} ${size.suffix}`);
        })
        .catch(err => console.error(`  ❌ Erreur ${outputFilename}:`, err.message))
    );
  }

  // Attendre que toutes les optimisations soient terminées
  await Promise.all(promises);
  
  // Créer le fichier srcset
  const srcsetPath = path.join(outputDir, `${baseName}-srcset.txt`);
  fs.writeFileSync(srcsetPath, srcset.join(', '));
  
  console.log(`  📝 Srcset généré: ${srcset.join(', ')}`);
}

async function main() {
  console.log('🚀 Début de l\'optimisation des images...\n');
  
  const files = fs.readdirSync(inputDir).filter(file => 
    file.match(/\.(jpg|jpeg|png)$/i)
  );
  
  for (const file of files) {
    await optimizeImage(file);
    console.log('');
  }
  
  console.log('🎉 Optimisation terminée !');
  console.log(`📁 Images optimisées dans: ${outputDir}`);
}

main().catch(console.error);


















