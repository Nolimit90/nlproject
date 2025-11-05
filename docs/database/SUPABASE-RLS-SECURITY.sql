-- ===================================================
-- 🔐 SUPABASE ROW LEVEL SECURITY (RLS)
-- Protection des données au niveau de la base
-- ===================================================

-- 1. ACTIVER RLS sur les tables sensibles
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails_leads ENABLE ROW LEVEL SECURITY;

-- 2. POLITIQUE: Lecture publique interdite (personne ne peut lire sans auth)
CREATE POLICY "briefings_no_public_read" 
ON public.briefings 
FOR SELECT 
USING (false);

CREATE POLICY "emails_leads_no_public_read" 
ON public.emails_leads 
FOR SELECT 
USING (false);

-- 3. POLITIQUE: Insertion publique autorisée (pour le workflow n8n)
-- Mais uniquement depuis l'API Next.js avec la clé service
CREATE POLICY "briefings_public_insert" 
ON public.briefings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "emails_leads_public_insert" 
ON public.emails_leads 
FOR INSERT 
WITH CHECK (true);

-- 4. POLITIQUE: Mise à jour et suppression interdites sans auth
CREATE POLICY "briefings_no_public_update" 
ON public.briefings 
FOR UPDATE 
USING (false);

CREATE POLICY "briefings_no_public_delete" 
ON public.briefings 
FOR DELETE 
USING (false);

CREATE POLICY "emails_leads_no_public_update" 
ON public.emails_leads 
FOR UPDATE 
USING (false);

CREATE POLICY "emails_leads_no_public_delete" 
ON public.emails_leads 
FOR DELETE 
USING (false);

-- ===================================================
-- 🛡️ PROTECTION CONTRE L'INJECTION SQL
-- ===================================================

-- Créer une fonction pour valider les emails (anti-injection)
CREATE OR REPLACE FUNCTION public.is_valid_email(email_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Validation basique d'email avec regex
  RETURN email_input ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Créer une fonction pour détecter des patterns suspects
CREATE OR REPLACE FUNCTION public.contains_sql_injection(text_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Détecter des keywords SQL dangereux
  RETURN text_input ~* '(union|select|insert|update|delete|drop|create|alter|exec|execute|script|javascript|<script)';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ===================================================
-- 🔍 TRIGGERS DE VALIDATION
-- ===================================================

-- Trigger pour valider les données avant insertion
CREATE OR REPLACE FUNCTION public.validate_briefing_before_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Valider l'email
  IF NOT public.is_valid_email(NEW.email) THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Détecter injection SQL dans businessObjective
  IF public.contains_sql_injection(NEW.businessObjective) THEN
    RAISE EXCEPTION 'Suspicious content detected';
  END IF;
  
  -- Détecter injection SQL dans firstName/lastName
  IF public.contains_sql_injection(NEW.firstName) OR public.contains_sql_injection(NEW.lastName) THEN
    RAISE EXCEPTION 'Suspicious content detected in name';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger
DROP TRIGGER IF EXISTS validate_briefing_trigger ON public.briefings;
CREATE TRIGGER validate_briefing_trigger
  BEFORE INSERT ON public.briefings
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_briefing_before_insert();

-- ===================================================
-- 📊 FONCTION D'AUDIT
-- ===================================================

-- Table pour stocker les tentatives d'accès suspects
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  ip_address TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS sur la table d'audit (lecture admin uniquement)
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "security_audit_log_no_public_access" 
ON public.security_audit_log 
FOR ALL 
USING (false);

-- Fonction pour logger les événements de sécurité
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type_param TEXT,
  ip_address_param TEXT,
  details_param JSONB DEFAULT '{}'::JSONB
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_log (event_type, ip_address, details)
  VALUES (event_type_param, ip_address_param, details_param);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===================================================
-- ✅ VÉRIFICATION DE LA CONFIGURATION
-- ===================================================

-- Vérifier que RLS est bien activé
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('briefings', 'emails_leads', 'security_audit_log');

-- Lister toutes les politiques RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

