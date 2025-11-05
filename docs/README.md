# 📁 Documentation NL Project

Cette documentation contient tous les fichiers techniques et guides du projet.

## 📂 Structure

### `/workflows/` - Workflows n8n
- `NL-WORKFLOW-MULTILINGUAL-COMPLETE.json` - Workflow n8n complet avec support multilingue (EN/FR)

### `/database/` - Base de données
- `SUPABASE_SCHEMA.sql` - Schéma complet de la base de données
- `SUPABASE-RLS-SECURITY.sql` - Politiques de sécurité RLS et validation

### `/guides/` - Guides et documentation
- `SECURITY-GUIDE.md` - Guide complet de sécurité
- `SECURITY-SUMMARY.md` - Résumé des mesures de sécurité
- `DEPLOYMENT.md` - Guide de déploiement
- `N8N_INTEGRATION.md` - Intégration n8n
- `N8N-MULTILINGUAL-EMAILS.md` - Configuration emails multilingues
- `GUIDE-UTILISATION-SUPABASE.md` - Guide Supabase
- `DOCUMENTATION-SECURITE.md` - Documentation sécurité détaillée

### `/specs/` - Spécifications et design
- `DESIGN_TOKENS.md` - Tokens de design
- `APPLE_MOCKUPS_SPECS.md` - Spécifications des mockups
- `MOCKUPS_FINAL.md` - Mockups finaux
- `DEMOS_README.md` - Documentation des démos
- `WORKFLOW-LOGIC.md` - Logique du workflow
- `README-SYSTEME-COMPLET.md` - Documentation système complète

## 🚀 Quick Start

1. **Setup Database** : Exécutez les fichiers SQL dans `/database/`
2. **Configure n8n** : Importez le workflow depuis `/workflows/`
3. **Deploy** : Suivez le guide dans `/guides/DEPLOYMENT.md`
4. **Security** : Consultez `/guides/SECURITY-GUIDE.md`

## 🔐 Sécurité

Le projet implémente plusieurs couches de sécurité :
- ✅ RLS (Row Level Security) sur Supabase
- ✅ Protection contre les injections SQL
- ✅ Rate limiting
- ✅ Validation Zod
- ✅ HMAC signatures
- ✅ Honeypot anti-bot

Voir `/guides/SECURITY-GUIDE.md` pour plus de détails.

