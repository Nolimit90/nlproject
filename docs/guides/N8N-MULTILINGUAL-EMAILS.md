# 🌐 EMAILS MULTILINGUES DANS N8N

## 📋 CE QUI A ÉTÉ FAIT :

✅ Le formulaire Contact envoie maintenant le champ `lang` ('fr' ou 'en')  
✅ L'API transmet `lang` à n8n via le webhook

---

## 🔧 CE QU'IL FAUT FAIRE DANS N8N :

### 1️⃣ **POUR CHAQUE EMAIL** (4 chemins x 2-3 emails = ~10 emails à dupliquer)

#### A) Email de REFUS (< 3000€)

**Créer un node "IF Language"** après "Wait 15 min" :
- Condition : `{{ $('Webhook Briefing').item.json.body.lang === 'en' }}`
- TRUE → Email Refus EN
- FALSE → Email Refus FR (existant)

**Template EN** :
```
Subject: About your request — NL Project

Hi {{ $('Webhook Briefing').item.json.body.firstName }},

Thank you for taking the time to share your project details with us.

After analyzing your request, I want to be completely transparent with you: our custom conversion systems start from €3,000.

An alternative to get started:
Our 10-Point SYSTEM Audit could be an excellent starting point to structure your digital approach and identify growth opportunities.

[DOWNLOAD THE AUDIT]

We remain available if your project evolves towards a more substantial investment.

Best regards,
The NL Project Team
```

#### B) Email VIP (+10 000€)

**Créer un node "IF Language VIP"** après "IF VIP +10K" :
- TRUE → Email VIP Client EN
- FALSE → Email VIP Client FR (existant)

**Template EN** :
```
Subject: Your project with NL Project — {{ firstName }} {{ lastName }}

{{ firstName }},

Your project represents exactly the type of ambition we appreciate supporting.

The scope of your investment allows us to design a truly custom solution, designed to generate measurable impact on your business objectives.

Next steps:
- In-depth analysis of your briefing within 24h
- Direct contact for a strategic exchange
- Development of a personalized proposal adapted to your context

Your investment of {{ budget }} allows us to create an exceptional system, calibrated to perform sustainably.

I will personally supervise the study of your project and will contact you very soon.

Chris Henock
Founder, NL Project
```

#### C) Email QUALIFIÉ (5000-10000€)

**Template EN** :
```
Subject: Your briefing — {{ firstName }} {{ lastName }}

{{ firstName }},

Thank you for sharing your project details with us.

Your request has been registered and will be the subject of an in-depth analysis on our part.

Next steps:
- Detailed study of your needs (24-48h)
- Contact to deepen the context
- Development of a proposal adapted to your objectives

We will get back to you very soon to discuss the best approach for your SYSTEM.

The NL Project Team
```

#### D) Email STANDARD (3000-5000€)

**Template EN** :
```
Subject: Your request — {{ firstName }} {{ lastName }}

{{ firstName }},

Thank you for your request.

I have taken note of the information you have shared and I will study it carefully.

I will get back to you in the coming days to discuss your project.

If you have any questions in the meantime, please don't hesitate.

Chris Henock
Founder, NL Project
```

---

### 2️⃣ **EMAILS INTERNES** (à vous)

**Option 1** : Garder en français (c'est pour vous)  
**Option 2** : Ajouter `[EN]` ou `[FR]` dans le sujet pour identifier la langue du lead

Recommandation : **Garder en français**, mais ajouter la langue dans le corps :
```
Langue : {{ $('Webhook Briefing').item.json.body.lang || 'fr' }}
```

---

### 3️⃣ **TELEGRAM**

Ajouter la langue dans les notifications :
```
🏆 *ALERTE VIP* 🏆

*Langue:* {{ $('Webhook Briefing').item.json.body.lang || 'fr' }} 🌐
*Budget:* {{ budget }} 💰
...
```

---

## 🎯 STRUCTURE WORKFLOW APRÈS MODIFICATION :

```
Webhook Briefing
    ↓
Response + Stocker Supabase
    ↓
IF Budget < 3000€
    ↓ TRUE
    Wait 15 min
        ↓
    IF Language === 'en'
        ↓ TRUE          ↓ FALSE
    Email Refus EN    Email Refus FR
    
    ↓ FALSE
IF VIP +10K
    ↓ TRUE
    IF Language === 'en'
        ↓ TRUE              ↓ FALSE
    Email VIP EN        Email VIP FR
        ↓                   ↓
    Email Interne VIP (FR) → Telegram VIP
    
... (même logique pour Qualified et Standard)
```

---

## ✅ CHECKLIST :

- [ ] Créer 4 emails clients EN (Refus, VIP, Qualified, Standard)
- [ ] Ajouter 4 nodes "IF Language" dans le workflow
- [ ] Connecter les nodes correctement
- [ ] Tester avec `lang: 'en'` et `lang: 'fr'`
- [ ] (Optionnel) Ajouter langue dans emails internes
- [ ] (Optionnel) Ajouter langue dans Telegram

---

## 🧪 TESTS :

**Test FR** :
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"FR","email":"test@fr.com","clientType":"Company","businessObjective":"Test français","budget":"+10 000€","lang":"fr"}'
```

**Test EN** :
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"EN","email":"test@en.com","clientType":"Company","businessObjective":"English test","budget":"+10 000€","lang":"en"}'
```

---

## 📝 NOTES :

- Le champ `lang` est toujours transmis (défaut: 'fr')
- Si n8n reçoit un `lang` inconnu, il utilisera FR par défaut
- Les templates EN sont professionnels mais restent dans votre style épuré

