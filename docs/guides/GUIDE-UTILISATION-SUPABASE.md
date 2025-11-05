# 🚀 GUIDE D'UTILISATION SUPABASE - NL PROJECT

## 📋 TABLE DES MATIÈRES
1. [Migration initiale](#migration)
2. [Structure finale](#structure)
3. [Requêtes pour campagnes marketing](#campagnes)
4. [Export pour outils externes](#export)
5. [Maintenance](#maintenance)

---

## 🔄 ÉTAPE 1 : MIGRATION INITIALE {#migration}

### **Dans Supabase :**

1. **Allez dans "SQL Editor"**
2. **Collez le contenu de** `MIGRATION-SUPABASE.sql`
3. **Cliquez sur "Run"**

✅ **Résultat attendu :**
```
✅ MIGRATION TERMINÉE AVEC SUCCÈS !
Briefings dans la nouvelle table : X
Emails dans la nouvelle table : X
Tables créées : briefings, emails_leads
Vues disponibles : 5
```

⚠️ **Important :** Les anciennes données sont sauvegardées dans `briefings_backup_old` et `emails_leads_backup_old`

---

## 📊 ÉTAPE 2 : STRUCTURE FINALE {#structure}

### **Table 1 : `briefings`**
Tous les briefings du formulaire avec segmentation automatique

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `firstName` | TEXT | Prénom |
| `lastName` | TEXT | Nom |
| `email` | TEXT | Email |
| `telephone` | TEXT | Téléphone |
| `clientType` | TEXT | Type de client |
| `businessObjective` | TEXT | Objectif business |
| `existingWebsite` | TEXT | Site existant |
| `budget` | TEXT | Budget (< 3000€, 3000-5000€, etc.) |
| **`status`** | TEXT | **refused / standard / qualified / vip** |
| `source` | TEXT | Source (website_briefing_form) |
| `created_at` | TIMESTAMP | Date de création |
| `contacted_at` | TIMESTAMP | Date du premier contact |
| `converted` | BOOLEAN | Est devenu client |
| `notes` | TEXT | Notes internes |

### **Table 2 : `emails_leads`**
Emails collectés via la page audit

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `email` | TEXT | Email (unique) |
| `source` | TEXT | Source (page_audit_pdf) |
| `created_at` | TIMESTAMP | Date d'inscription |
| `subscribed` | BOOLEAN | Abonné newsletter |
| `converted_to_briefing` | BOOLEAN | A rempli le briefing après |
| `last_email_sent` | TIMESTAMP | Dernier email envoyé |
| `notes` | TEXT | Notes internes |

---

## 🎯 ÉTAPE 3 : REQUÊTES POUR CAMPAGNES {#campagnes}

### 🚫 **CAMPAGNE 1 : Refusés (< 3000€)**

**Objectif :** Remarketing après 6 mois (budget peut avoir évolué)

```sql
-- Tous les refusés de plus de 6 mois
SELECT 
  email, 
  firstName, 
  lastName,
  businessObjective,
  days_since_briefing
FROM v_leads_refused 
WHERE days_since_briefing > 180
ORDER BY days_since_briefing DESC;
```

**📧 Email type :** "Votre projet a évolué ? Discutons-en"

---

### 📚 **CAMPAGNE 2 : Emails audit uniquement**

**Objectif :** Newsletter hebdomadaire / nurturing

```sql
-- Tous les emails qui ont téléchargé l'audit mais jamais rempli le briefing
SELECT 
  email,
  days_since_download
FROM v_leads_audit_only
ORDER BY created_at DESC;
```

**📧 Email type :** "Astuce SYSTÈME #1", "Cas client", "Ressources"

---

### 🏆 **CAMPAGNE 3 : VIP non convertis (URGENT)**

**Objectif :** Relance immédiate

```sql
-- VIP (+10K€) pas encore contactés
SELECT 
  email,
  firstName,
  lastName,
  telephone,
  businessObjective,
  days_waiting
FROM v_leads_vip_unconverted
WHERE contacted_at IS NULL
ORDER BY days_waiting DESC;
```

**📧 Action :** APPEL TÉLÉPHONIQUE prioritaire

---

### 🔥 **CAMPAGNE 4 : Qualified non convertis**

**Objectif :** Relance après 1 semaine

```sql
-- Qualified (5-10K€) non convertis de plus de 7 jours
SELECT 
  email,
  firstName,
  lastName,
  telephone,
  budget,
  days_waiting
FROM v_leads_qualified_unconverted
WHERE days_waiting > 7
  AND (contacted_at IS NULL OR contacted_at < NOW() - INTERVAL '7 days')
ORDER BY days_waiting DESC;
```

**📧 Email type :** "Avez-vous des questions sur votre projet ?"

---

### 📌 **CAMPAGNE 5 : Standard non convertis**

**Objectif :** Nurturing doux

```sql
-- Standard (3-5K€) non convertis de plus de 14 jours
SELECT 
  firstName,
  lastName,
  email,
  budget,
  EXTRACT(DAY FROM NOW() - created_at)::INTEGER as days_waiting
FROM public.briefings
WHERE status = 'standard'
  AND converted = false
  AND created_at < NOW() - INTERVAL '14 days'
ORDER BY created_at ASC;
```

**📧 Email type :** Cas clients, témoignages, offre spéciale

---

## 📤 ÉTAPE 4 : EXPORT POUR OUTILS EXTERNES {#export}

### **Export pour Mailchimp / Brevo / SendGrid**

```sql
-- Export CSV : Newsletter complète
SELECT email FROM v_newsletter_all;
```

### **Export pour CRM (HubSpot, Pipedrive)**

```sql
-- Export avec toutes les infos pour import CRM
SELECT 
  email,
  firstName,
  lastName,
  telephone,
  budget,
  status,
  businessObjective,
  existingWebsite,
  created_at,
  converted
FROM public.briefings
WHERE converted = false
ORDER BY 
  CASE status
    WHEN 'vip' THEN 1
    WHEN 'qualified' THEN 2
    WHEN 'standard' THEN 3
    WHEN 'refused' THEN 4
  END,
  created_at DESC;
```

### **Export pour Telegram / WhatsApp campagne**

```sql
-- Tous les téléphones de leads qualifiés
SELECT 
  firstName,
  lastName,
  telephone,
  status
FROM public.briefings
WHERE telephone IS NOT NULL 
  AND telephone != ''
  AND status IN ('qualified', 'vip')
  AND converted = false
ORDER BY status, created_at DESC;
```

---

## 🔧 ÉTAPE 5 : MAINTENANCE QUOTIDIENNE {#maintenance}

### **Marquer un lead comme contacté**

```sql
UPDATE public.briefings 
SET contacted_at = NOW()
WHERE email = 'client@example.com';
```

### **Marquer un lead comme converti (devenu client payant)**

```sql
UPDATE public.briefings 
SET converted = true
WHERE email = 'nouveauclient@example.com';
```

### **Désabonner un email de la newsletter**

```sql
UPDATE public.emails_leads 
SET subscribed = false
WHERE email = 'unsubscribe@example.com';
```

### **Ajouter des notes sur un lead**

```sql
UPDATE public.briefings 
SET notes = 'A rappelé le 15/12, intéressé mais pas dispo avant janvier'
WHERE email = 'client@example.com';
```

---

## 📊 STATISTIQUES DE CONVERSION

### **Voir les stats globales**

```sql
SELECT * FROM get_briefing_stats();
```

**Résultat attendu :**
```
status      | total_count | converted_count | conversion_rate
------------|-------------|-----------------|----------------
vip         | 5           | 2               | 40.00
qualified   | 12          | 3               | 25.00
standard    | 23          | 4               | 17.39
refused     | 45          | 0               | 0.00
```

---

## 🎯 AUTOMATISATION AVEC N8N

Vous pouvez créer des workflows n8n qui :

1. **Relancent automatiquement les VIP** après 48h sans contact
2. **Envoient la newsletter hebdo** aux emails audit
3. **Relancent les qualified** après 7 jours
4. **Rappellent les refusés** après 6 mois

---

## 🚀 RÉSUMÉ : QUI CONTACTER QUAND ?

| Segment | Quand contacter | Canal | Priorité |
|---------|----------------|-------|----------|
| **VIP** | Sous 24h | Appel + Email | 🔴 URGENTE |
| **Qualified** | Sous 48h puis 7j | Email + SMS | 🟠 HAUTE |
| **Standard** | Sous 14j | Email | 🟡 MOYENNE |
| **Refused** | Après 6 mois | Email remarketing | 🟢 BASSE |
| **Audit only** | Hebdo | Newsletter | 🔵 NURTURING |

---

## ✅ CHECKLIST HEBDOMADAIRE

- [ ] Contacter tous les VIP non contactés
- [ ] Relancer les qualified > 7 jours
- [ ] Exporter les emails pour newsletter
- [ ] Vérifier les stats de conversion
- [ ] Marquer les leads convertis

---

**Vous avez maintenant un système de segmentation COMPLET et SCALABLE !** 🎉
