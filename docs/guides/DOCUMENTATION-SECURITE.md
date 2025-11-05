# 🔐 DOCUMENTATION SÉCURITÉ - NL PROJECT

## 📋 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture de sécurité](#architecture-de-sécurité)
3. [Protections implémentées](#protections-implémentées)
4. [Configuration](#configuration)
5. [Monitoring & Alertes](#monitoring--alertes)
6. [Maintenance](#maintenance)
7. [Tests de sécurité](#tests-de-sécurité)

---

## Vue d'ensemble

Le système NL Project implémente une **stratégie de sécurité en profondeur** (Defense in Depth) avec plusieurs couches de protection :

```
┌─────────────────────────────────────────────┐
│          👤 UTILISATEUR                     │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  🌐 FRONTEND (Next.js)                      │
│  ├─ Honeypot (champ caché anti-bot)        │
│  ├─ Timestamp de soumission                │
│  └─ Validation côté client                 │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  🛡️ API ROUTE (/api/contact)               │
│  ├─ 1. CORS strict                          │
│  ├─ 2. Rate Limiting (5 req/15min)         │
│  ├─ 3. Honeypot verification               │
│  ├─ 4. Validation Zod + Sanitization       │
│  ├─ 5. Anti-injection (SQL, XSS)           │
│  ├─ 6. Signature HMAC pour n8n             │
│  └─ 7. Monitoring & Logging                │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  ⚙️ N8N WORKFLOW                            │
│  ├─ Vérification signature (TODO)          │
│  ├─ Validation IP source                   │
│  └─ Traitement sécurisé                    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  🗄️ SUPABASE DATABASE                      │
│  ├─ Row Level Security (RLS)               │
│  ├─ Triggers de validation                 │
│  ├─ Fonctions anti-injection               │
│  └─ Audit log                              │
└─────────────────────────────────────────────┘
```

---

## Architecture de sécurité

### 1. Frontend (React/Next.js)

**Fichiers:**
- `components/Contact.tsx`

**Protections:**
- ✅ Champ honeypot caché (`_website`)
- ✅ Timestamp de début de formulaire (`_submit_time`)
- ✅ Validation basique côté client

**Code:**
```typescript
// Honeypot: doit rester vide
_website: ''

// Timestamp pour détecter soumissions trop rapides
_submit_time: Date.now().toString()
```

---

### 2. API Route (Next.js)

**Fichier:**
- `app/api/contact/route.ts`

**Protections:**

#### 🔐 Protection 1: CORS Strict
```typescript
import { getCorsHeaders, isOriginAllowed } from '@/lib/security/cors';

// Vérifier l'origine
if (origin && !isOriginAllowed(origin)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

**Domaines autorisés:**
- `https://nlproject.site`
- `https://www.nlproject.site`
- `http://localhost:3000` (dev uniquement)

---

#### 🚦 Protection 2: Rate Limiting

**Configuration:**
- **5 requêtes** maximum par **15 minutes** par IP
- Blocage d'**1 heure** après **3 violations**
- Store en mémoire (pour production: utiliser Redis/Upstash)

**Fichier:** `lib/security/rateLimit.ts`

```typescript
const RATE_LIMIT_CONFIG = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,      // 15 minutes
  blockDuration: 60 * 60 * 1000, // 1 heure
  maxViolations: 3,
};
```

**Réponse en cas de dépassement:**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "retryAfter": 900
}
```

---

#### 🍯 Protection 3: Honeypot

**Fichier:** `lib/security/honeypot.ts`

Détecte les bots via :
1. **Champ caché** : Si rempli → bot détecté
2. **Timestamp** : Si soumis en < 2 secondes → bot détecté

```typescript
// Champ honeypot (doit être vide)
const honeypotField = data._website || data.website;

// Temps de soumission (doit être > 2 secondes)
const timeDiff = Date.now() - parseInt(data._submit_time);
if (timeDiff < 2000) {
  // Bot détecté !
}
```

**Réponse en cas de bot:**
- ✅ Retourne `success: true` pour **tromper le bot**
- 🚨 Log l'événement dans le monitoring

---

#### 🛡️ Protection 4: Validation & Sanitization

**Fichier:** `lib/security/validation.ts`

**Technologies:**
- **Zod** : Validation de schéma stricte
- **validator.js** : Validation avancée (email, URL)
- **Regex** : Patterns spécifiques

**Validations:**

```typescript
firstName: z.string()
  .min(2).max(50)
  .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/), // Lettres uniquement

email: z.string()
  .email()
  .refine(email => validator.isEmail(email)), // Double validation

telephone: z.string()
  .refine(phone => /^[\d\s\+\(\)\-\.]+$/.test(phone)),

businessObjective: z.string()
  .min(10).max(1000), // Longueur contrôlée
```

**Anti-injection:**

1. **Domaines email suspects bloqués:**
   - tempmail.com
   - guerrillamail.com
   - 10minutemail.com
   - yopmail.com
   - etc.

2. **Patterns dangereux détectés:**
   - `<script>...</script>`
   - `<iframe>...</iframe>`
   - `javascript:`
   - `onclick=`, `onerror=`
   - SQL keywords: `UNION`, `SELECT`, `DROP`, etc.

3. **Sanitization:**
   - Trim whitespace
   - Escape HTML entities
   - Normalise espaces

---

#### 🔐 Protection 5: Signature HMAC

**Objectif:** Authentifier les requêtes vers n8n

```typescript
const webhookSecret = process.env.N8N_WEBHOOK_SECRET;
const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(payloadString)
  .digest('hex');

// Envoyer avec header
'X-Webhook-Signature': signature
```

**⚠️ TODO:** Vérifier la signature côté n8n

---

#### 📊 Protection 6: Monitoring & Logging

**Fichier:** `lib/security/monitoring.ts`

**Événements loggés:**
- `bot_detected` - Bot détecté via honeypot
- `rate_limit_exceeded` - Rate limit dépassé
- `suspicious_content` - Contenu suspect (email jetable)
- `injection_attempt` - Tentative d'injection SQL/XSS
- `validation_failed` - Erreur de validation
- `blocked_ip` - IP bloquée (CORS, etc.)

**Sévérités:**
- `low` - Erreur de validation simple
- `medium` - Bot détecté, email suspect
- `high` - Rate limit dépassé répétitivement
- `critical` - Tentative d'injection SQL/XSS

**Alertes Telegram:**
- Envoyées automatiquement pour `high` et `critical`
- Configurées via `TELEGRAM_BOT_TOKEN` et `TELEGRAM_ALERT_CHAT_ID`

---

### 3. Supabase (Base de données)

**Fichier:** `SUPABASE-RLS-SECURITY.sql`

#### 🔐 Row Level Security (RLS)

**Politiques:**
```sql
-- Lecture publique INTERDITE
CREATE POLICY "briefings_no_public_read" 
ON public.briefings 
FOR SELECT 
USING (false);

-- Insertion autorisée (pour n8n)
CREATE POLICY "briefings_public_insert" 
ON public.briefings 
FOR INSERT 
WITH CHECK (true);

-- Update/Delete INTERDITS
CREATE POLICY "briefings_no_public_update" 
ON public.briefings 
FOR UPDATE 
USING (false);
```

#### 🛡️ Triggers de validation

```sql
-- Validation avant insertion
CREATE TRIGGER validate_briefing_trigger
  BEFORE INSERT ON public.briefings
  FOR EACH ROW
  EXECUTE FUNCTION validate_briefing_before_insert();
```

**Validations:**
- ✅ Format email valide
- ✅ Détection SQL injection dans `businessObjective`
- ✅ Détection SQL injection dans `firstName` / `lastName`

#### 📋 Audit Log

Table `security_audit_log` pour tracer les événements suspects.

---

## Configuration

### Variables d'environnement

Créez `.env.local` avec :

```bash
# N8N
N8N_WEBHOOK_URL=http://78.47.62.117:5678/webhook/formulaire-briefing
N8N_WEBHOOK_SECRET=votre-secret-unique-et-long

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-publique
SUPABASE_SERVICE_KEY=votre-cle-service

# Sécurité
ALLOWED_ORIGINS=https://nlproject.site,https://www.nlproject.site
SECURITY_MODE=production

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MINUTES=15

# Alertes
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_ALERT_CHAT_ID=6442589987

# Dashboard Admin
SECURITY_DASHBOARD_TOKEN=nl-project-admin-2024
```

### Générer un secret fort

```bash
# Pour N8N_WEBHOOK_SECRET
openssl rand -hex 32

# Pour SECURITY_DASHBOARD_TOKEN
openssl rand -hex 16
```

---

## Monitoring & Alertes

### Dashboard de sécurité

**Endpoint:** `/api/security/dashboard`

**Authentication:** Bearer token

```bash
curl -H "Authorization: Bearer nl-project-admin-2024" \
  https://nlproject.site/api/security/dashboard
```

**Réponse:**
```json
{
  "success": true,
  "data": {
    "security": {
      "totalEvents": 42,
      "bySeverity": {
        "low": 10,
        "medium": 20,
        "high": 10,
        "critical": 2
      },
      "byType": {
        "bot_detected": 15,
        "rate_limit_exceeded": 8,
        "injection_attempt": 2
      },
      "topOffendingIPs": [
        { "ip": "192.168.1.100", "count": 15 },
        { "ip": "10.0.0.50", "count": 8 }
      ]
    },
    "rateLimit": {
      "totalIPs": 120,
      "blockedIPs": 5,
      "ips": [...]
    },
    "recentEvents": [...]
  }
}
```

### Alertes Telegram

Configuration dans `.env.local` :
```bash
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_ALERT_CHAT_ID=6442589987
```

**Format du message:**
```
🔴 ALERTE SÉCURITÉ CRITICAL

Type: INJECTION ATTEMPT
IP: `192.168.1.100`
Détails: SQL injection detected in businessObjective field
Date: 05/11/2025 15:30:45

⚠️ Action requise: Vérifier les logs
```

---

## Maintenance

### Nettoyage périodique

```typescript
import { cleanupOldSecurityEvents } from '@/lib/security/monitoring';

// Nettoyer événements > 7 jours
cleanupOldSecurityEvents(7);
```

### Déblocage d'IP

```bash
curl -X POST https://nlproject.site/api/security/dashboard \
  -H "Authorization: Bearer nl-project-admin-2024" \
  -H "Content-Type: application/json" \
  -d '{"action": "reset_rate_limit", "ip": "192.168.1.100"}'
```

### Mise à jour Supabase RLS

Exécutez le script SQL :
```bash
psql -h your-supabase-db.supabase.co -U postgres -d postgres -f SUPABASE-RLS-SECURITY.sql
```

---

## Tests de sécurité

### 1. Test Honeypot

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bot",
    "lastName": "Test",
    "email": "bot@test.com",
    "clientType": "Company",
    "businessObjective": "Test",
    "budget": "< 3000€",
    "_website": "http://spam.com"
  }'

# Attendu: success: true (pour tromper le bot)
# Log: Bot detected via honeypot
```

### 2. Test Rate Limiting

```bash
# Envoyer 6 requêtes rapidement
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{...}'
done

# Attendu après 5ème: HTTP 429 Too Many Requests
```

### 3. Test Injection SQL

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "clientType": "Company",
    "businessObjective": "SELECT * FROM users; DROP TABLE briefings;",
    "budget": "+10 000€"
  }'

# Attendu: HTTP 400 avec "Suspicious patterns detected"
# Log: SECURITY ALERT - injection_attempt
```

### 4. Test CORS

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Origin: https://evil-site.com" \
  -H "Content-Type: application/json" \
  -d '{...}'

# Attendu: HTTP 403 Forbidden
```

---

## Checklist de déploiement

Avant de mettre en production :

- [ ] Générer des secrets forts (`N8N_WEBHOOK_SECRET`, etc.)
- [ ] Configurer `.env.local` avec les vraies valeurs
- [ ] Activer RLS sur Supabase (`SUPABASE-RLS-SECURITY.sql`)
- [ ] Configurer les alertes Telegram
- [ ] Tester tous les scénarios d'attaque
- [ ] Vérifier que le rate limiting fonctionne
- [ ] Configurer le monitoring en production
- [ ] Documenter les procédures de déblocage d'IP
- [ ] Former l'équipe sur le dashboard de sécurité

---

## Support

Pour toute question de sécurité :
- 📧 Email: contact.nlproject@gmail.com
- 💬 Telegram: [@nlproject_security]

**En cas d'incident de sécurité :**
1. Bloquer immédiatement l'IP suspecte
2. Consulter le dashboard `/api/security/dashboard`
3. Analyser les logs Supabase `security_audit_log`
4. Contacter l'équipe technique

---

**Dernière mise à jour :** 05/11/2025  
**Version :** 1.0.0  
**Auteur :** NL Project Security Team

