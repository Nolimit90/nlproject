# 🛡️ GUIDE DE SÉCURITÉ NL PROJECT

## 📋 Vue d'ensemble

Votre système est maintenant protégé par **6 couches de sécurité** de niveau professionnel :

### ✅ Sécurités implémentées

| Protection | Niveau | Description |
|------------|--------|-------------|
| **Rate Limiting** | 🔴 CRITIQUE | Maximum 3 requêtes/heure par IP |
| **Validation Zod** | 🔴 CRITIQUE | Validation stricte des données entrantes |
| **Sanitisation** | 🟡 IMPORTANT | Nettoyage contre XSS/injections |
| **Email Filtering** | 🟡 IMPORTANT | Blocage des emails temporaires |
| **CAPTCHA Turnstile** | 🟢 RECOMMANDÉ | Protection contre bots (optionnel) |
| **Webhook Auth** | 🟡 IMPORTANT | Authentification HMAC du webhook |
| **Security Headers** | 🔴 CRITIQUE | Headers OWASP standards |

---

## 🚀 ACTIVATION (ÉTAPE PAR ÉTAPE)

### Étape 1 : Remplacer l'API route

```bash
# Renommer l'ancienne API
mv app/api/contact/route.ts app/api/contact/route.old.ts

# Activer la nouvelle API sécurisée
mv app/api/contact/route.secured.ts app/api/contact/route.ts
```

### Étape 2 : Générer les secrets

```bash
# Générer un secret webhook (copier le résultat)
openssl rand -hex 32
```

### Étape 3 : Configurer les variables d'environnement

Créer le fichier `.env.local` :

```bash
# 1. Secret webhook (résultat de openssl rand -hex 32)
WEBHOOK_SECRET=votre-secret-genere-ici

# 2. URL webhook n8n
N8N_WEBHOOK_URL=http://78.47.62.117:5678/webhook/formulaire-briefing

# 3. (Optionnel) Turnstile - créer sur https://dash.cloudflare.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key

# 4. Domaine autorisé
ALLOWED_ORIGIN=https://nlproject.site
```

### Étape 4 : Sécuriser n8n (IMPORTANT)

Le webhook n8n doit **vérifier la signature** pour être protégé.

**Dans n8n, ajouter un nœud "Function" après le Webhook :**

```javascript
// Node: "Verify Signature" (Function)
const crypto = require('crypto');

// Récupérer signature et timestamp
const signature = $('Webhook Briefing').item.headers['x-webhook-signature'];
const timestamp = $('Webhook Briefing').item.headers['x-webhook-timestamp'];

// Secret (IMPORTANT: Le même que dans .env.local)
const secret = 'VOTRE_WEBHOOK_SECRET_ICI';

// Vérifier que la requête n'est pas trop vieille (5 minutes max)
const now = Date.now();
const requestTime = parseInt(timestamp, 10);
if (now - requestTime > 5 * 60 * 1000) {
  throw new Error('Request too old');
}

// Vérifier la signature
const payload = JSON.stringify($json.body);
const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

if (signature !== expectedSignature) {
  throw new Error('Invalid signature');
}

// Signature valide - continuer
return $json.body;
```

**Connecter ce nœud juste après "Webhook Briefing" et avant "Stocker Briefing Supabase".**

### Étape 5 : Redémarrer le serveur

```bash
npm run dev
# ou en production:
npm run build && npm start
```

---

## 🧪 TESTER LA SÉCURITÉ

### Test 1 : Rate Limiting

```bash
# Envoyer 4 requêtes rapidement (la 4ème doit être bloquée)
for i in {1..4}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "clientType": "Company",
      "businessObjective": "Test rate limiting",
      "budget": "5000€ - 10 000€"
    }'
  echo "\nRequest $i sent"
  sleep 1
done
```

**Résultat attendu :** La 4ème requête retourne une erreur `429 Too Many Requests`.

### Test 2 : Validation des données

```bash
# Test email invalide
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "invalid-email",
    "clientType": "Company",
    "businessObjective": "Test",
    "budget": "5000€ - 10 000€"
  }'
```

**Résultat attendu :** Erreur `400 Bad Request` avec message "Invalid email format".

### Test 3 : Injection SQL/XSS

```bash
# Test tentative d'injection
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "clientType": "Company",
    "businessObjective": "<script>alert(\"XSS\")</script> OR 1=1",
    "budget": "5000€ - 10 000€"
  }'
```

**Résultat attendu :** Erreur `400 Bad Request` avec message "Invalid content detected".

### Test 4 : Email temporaire

```bash
# Test email jetable
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@tempmail.com",
    "clientType": "Company",
    "businessObjective": "Test",
    "budget": "5000€ - 10 000€"
  }'
```

**Résultat attendu :** Erreur `400 Bad Request` avec message "Please use a valid professional email".

---

## 🔐 AJOUTER LE CAPTCHA (Optionnel mais recommandé)

### 1. Créer un compte Cloudflare Turnstile (GRATUIT)

1. Aller sur https://dash.cloudflare.com
2. Turnstile → Add Site
3. Copier **Site Key** et **Secret Key**

### 2. Ajouter au `.env.local`

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=votre-site-key
TURNSTILE_SECRET_KEY=votre-secret-key
```

### 3. Intégrer dans le formulaire

Dans `components/Contact.tsx`, ajouter avant le bouton submit :

```tsx
import { useEffect, useRef } from 'react';

// Dans le composant, ajouter:
const [turnstileToken, setTurnstileToken] = useState('');
const turnstileRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  // Charger le script Turnstile
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    if (turnstileRef.current && (window as any).turnstile) {
      (window as any).turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setTurnstileToken(token);
        },
      });
    }
  };

  return () => {
    document.body.removeChild(script);
  };
}, []);

// Dans handleSubmit, ajouter le token:
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData,
    turnstileToken, // ⬅️ Ajouter ici
  }),
});

// Dans le JSX, avant le bouton:
<div ref={turnstileRef} className="my-4" />
```

---

## 📊 MONITORING & LOGS

### Vérifier les logs de sécurité

```bash
# En développement
npm run dev

# Rechercher les incidents de sécurité dans les logs
grep "SECURITY ISSUE" logs.txt
grep "Rate limit exceeded" logs.txt
```

### Indicateurs à surveiller

- **429 errors** : Tentatives de spam
- **400 errors** : Tentatives d'injection/données invalides
- **SECURITY ISSUE logs** : Patterns suspects détectés

---

## 🚨 EN CAS D'ATTAQUE

### 1. Identifier l'IP

```bash
# Chercher dans les logs
grep "Rate limit exceeded" logs.txt
```

### 2. Bloquer l'IP

Ajouter dans `lib/security/rateLimit.ts` :

```typescript
const BLOCKED_IPS = [
  '192.168.1.1',
  '10.0.0.1',
  // ... IPs malveillantes
];

export function checkRateLimit(ip: string) {
  // Bloquer IPs en liste noire
  if (BLOCKED_IPS.includes(ip)) {
    return { allowed: false, remaining: 0, resetTime: Date.now() + 9999999 };
  }
  // ... reste du code
}
```

### 3. Augmenter la sécurité

Si attaque massive :
1. **Activer Turnstile** immédiatement
2. **Réduire rate limit** à 1 req/h
3. **Activer mode maintenance** temporairement

---

## ✅ CHECKLIST DE PRODUCTION

Avant de déployer en production :

- [ ] `.env.local` configuré avec tous les secrets
- [ ] `WEBHOOK_SECRET` généré avec `openssl rand -hex 32`
- [ ] Webhook n8n sécurisé avec vérification de signature
- [ ] Turnstile configuré (recommandé)
- [ ] Tests de sécurité passés
- [ ] Logs de monitoring activés
- [ ] Headers de sécurité vérifiés
- [ ] HTTPS activé sur le domaine
- [ ] Ancienne API `route.old.ts` supprimée

---

## 📚 RESSOURCES

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Zod Documentation](https://zod.dev/)

---

## 🆘 SUPPORT

En cas de problème :
1. Vérifier les logs serveur
2. Tester avec `curl` en local
3. Vérifier que tous les secrets sont configurés
4. S'assurer que n8n vérifie les signatures

**Votre système est maintenant blindé ! 🛡️**

