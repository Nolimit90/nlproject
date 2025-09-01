# Intégration N8N - Formulaire de Contact NL Project

## Configuration Côté Client (Next.js)

### Variables d'environnement (.env.local)

```bash
# Configuration N8N Webhook - NL Project
N8N_WEBHOOK_URL=https://automation.nlproject.site/webhook/nl-project-contact
N8N_AUTH_HEADER=contact-secret-nl
N8N_TIMEOUT_MS=8000
N8N_RETRY_ATTEMPTS=2
APP_ENV=production
```

### Fonctionnalités implémentées

✅ **Validation robuste** : Tous les champs obligatoires (firstName, lastName, email, phone, message, projectType)
✅ **Honeypot** : Champ `website` caché pour détecter les bots
✅ **Gestion d'erreurs** : Messages d'erreur clairs et toast notifications
✅ **Retry automatique** : Tentatives multiples en cas d'échec N8N
✅ **Timeout configurable** : Évite les blocages (8s par défaut)
✅ **Sécurité** : Headers d'authentification et validation côté serveur
✅ **Message de confirmation** : "✅ Merci, nous vous recontactons sous peu."

## Configuration Côté N8N

### 1. Créer un nouveau workflow

1. **Ouvrir N8N** sur `https://automation.nlproject.site`
2. **Créer un nouveau workflow** nommé "NL Project Contact Form"

### 2. Configurer le Webhook

1. **Ajouter un nœud Webhook**
2. **Configuration :**
   - **HTTP Method** : `POST`
   - **Path** : `/webhook/nl-project-contact`
   - **Response Mode** : `Last Node`
   - **Options** : Activer "Respond with all defined headers"

### 3. Vérification d'authentification

1. **Ajouter un nœud IF**
2. **Condition :**
   ```javascript
   $json.headers['x-n8n-signature'] === 'contact-secret-nl'
   ```
3. **Si faux** : Retourner une erreur 401

### 4. Traitement des données

1. **Ajouter un nœud Set** pour formater les données
2. **Variables à extraire :**
   ```javascript
   firstName: {{ $json.firstName }}
   lastName: {{ $json.lastName }}
   email: {{ $json.email }}
   phone: {{ $json.phone }}
   message: {{ $json.message }}
   projectType: {{ $json.projectType }}
   timestamp: {{ $json.timestamp }}
   source: {{ $json.source }}
   userAgent: {{ $json.userAgent }}
   ip: {{ $json.ip }}
   ```

### 5. Stockage des données dans Supabase

1. **Ajouter un nœud Supabase**
2. **Configuration :**
   - **Operation** : `Insert`
   - **Table** : `contact_submissions`
   - **Columns** : Mapper tous les champs

### 6. Notifications

#### Notification Telegram
1. **Ajouter un nœud Telegram**
2. **Configuration :**
   - **Operation** : `Send Message`
   - **Chat ID** : Votre chat ID
   - **Text** : Message formaté avec les détails du contact

#### Notification Email
1. **Ajouter un nœud Email Send**
2. **Configuration :**
   - **To** : Votre email de contact
   - **Subject** : `Nouveau contact NL Project - {{ $json.firstName }} {{ $json.lastName }}`
   - **Text** : Template personnalisé avec tous les détails

### 7. Réponse de succès

1. **Ajouter un nœud Respond to Webhook**
2. **Configuration :**
   - **Response Code** : `200`
   - **Response Body** : `{ "ok": true, "message": "Contact processed successfully" }`

## Structure des données reçues

```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@example.com",
  "phone": "+33 6 12 34 56 78",
  "message": "Bonjour, je souhaite créer un site web pour mon entreprise...",
  "projectType": "website",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "NL-Project-Contact",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.100"
}
```

## Sécurité

### Headers d'authentification
- **x-n8n-signature** : `contact-secret-nl`
- **User-Agent** : `NL-Project-Contact/1.0`

### Validation côté serveur
- Tous les champs obligatoires vérifiés
- Format email validé
- Longueur message minimum (20 caractères)
- Téléphone minimum (8 chiffres)
- Honeypot anti-bot

### Protection contre les attaques
- Timeout configurable (8s par défaut)
- Retry limité (2 tentatives)
- Validation des données d'entrée
- Logs d'erreur détaillés

## Tests

### Test local
1. Démarrer le serveur Next.js : `npm run dev`
2. Remplir le formulaire sur `/contact`
3. Vérifier les logs du serveur
4. Vérifier la réception dans N8N

### Test de sécurité
1. Tester avec un header d'authentification invalide
2. Tester avec des données malformées
3. Tester le champ honeypot
4. Vérifier la gestion des timeouts

## Monitoring

### Logs côté client
- Validation des formulaires
- Erreurs de soumission
- Succès des envois

### Logs côté serveur
- Tentatives de connexion N8N
- Erreurs de webhook
- Statistiques de performance

### Métriques N8N
- Nombre de soumissions reçues
- Temps de traitement
- Taux de succès/échec

## Déploiement

### Production
1. Mettre à jour `.env.local` avec les vraies URLs
2. Vérifier la connectivité N8N
3. Tester le workflow complet
4. Monitorer les performances

### Backup
1. Exporter le workflow N8N
2. Sauvegarder la configuration
3. Documenter les procédures de récupération

## Support

En cas de problème :
1. Vérifier les logs Next.js
2. Vérifier les logs N8N
3. Tester la connectivité réseau
4. Vérifier la configuration des variables d'environnement
