# Guide de Déploiement NL Project

## Configuration Next.js

Le projet est configuré pour un déploiement SSR standard (pas de build statique) avec :
- Support multi-langues (FR/EN)
- Fonctionnalités dynamiques (context, formulaires)
- Compatible Netlify et Vercel

## Déploiement sur Netlify

### 1. Prérequis
- Compte Netlify
- Repository GitHub connecté

### 2. Configuration Build
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18.x

### 3. Variables d'environnement (optionnel)
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://votre-site.netlify.app
```

### 4. Plugin Netlify
Le projet utilise `@netlify/plugin-nextjs` pour une compatibilité optimale.

### 5. Déploiement automatique
- Connectez votre repository GitHub
- Netlify détectera automatiquement la configuration
- Chaque push sur `main` déclenchera un déploiement

## Déploiement sur Vercel

### 1. Prérequis
- Compte Vercel
- Repository GitHub connecté

### 2. Configuration
- Vercel détecte automatiquement Next.js
- Aucune configuration supplémentaire nécessaire
- Déploiement automatique activé par défaut

## Test local

```bash
# Build de production
npm run build

# Test du serveur de production
npm start

# Vérification
curl http://localhost:3000
```

## Fonctionnalités préservées

✅ **Multi-langues**: FR/EN avec cookies persistants  
✅ **SSR**: Rendu côté serveur pour le SEO  
✅ **Context**: React Context pour l'état global  
✅ **Formulaires**: Support des formulaires dynamiques  
✅ **Images**: Optimisation avec next/image  
✅ **Responsive**: Design mobile-first  

## Support

En cas de problème, vérifiez :
1. La version de Node.js (18.x recommandé)
2. Les dépendances (`npm install`)
3. Le build local (`npm run build`)
4. Les logs de déploiement Netlify/Vercel








