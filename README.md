# NL Project Website

Site web professionnel pour NL Project avec support multilingue (français/anglais).

## 🚀 Déploiement sur Netlify

### Méthode 1 : Déploiement automatique via Git

1. **Poussez votre code sur GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connectez-vous à Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Choisissez votre repository

3. **Configuration automatique**
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - Cliquez sur "Deploy site"

### Méthode 2 : Déploiement manuel

1. **Build local**
   ```bash
   npm run build
   ```

2. **Déployez le dossier `out`**
   - Allez sur [netlify.com](https://netlify.com)
   - Glissez-déposez le dossier `out` dans la zone de déploiement

## 🛠️ Configuration

Le projet est configuré avec :
- ✅ Export statique (`output: 'export'`)
- ✅ Redirections SPA (`public/_redirects`)
- ✅ Headers de sécurité (`netlify.toml`)
- ✅ Support multilingue (FR/EN)

## 📁 Structure des fichiers

```
├── app/                    # Pages Next.js
├── components/             # Composants React
├── public/                 # Assets statiques
│   └── _redirects         # Redirections Netlify
├── netlify.toml           # Configuration Netlify
├── next.config.js         # Configuration Next.js
└── out/                   # Build statique (généré)
```

## 🔧 Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run lint` - Vérification du code

## 🌐 Fonctionnalités

- ✅ Design responsive
- ✅ Navigation mobile optimisée
- ✅ Support multilingue
- ✅ Formulaire de contact
- ✅ Animations fluides
- ✅ SEO optimisé 