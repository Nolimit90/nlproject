-- =====================================================
-- SCHÉMA SUPABASE POUR LA PAGE AUDIT SYSTÈME
-- =====================================================

-- Table pour stocker les leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100) NOT NULL DEFAULT 'audit-systeme-page',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Métadonnées optionnelles
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  
  -- Champs pour le suivi
  email_sent BOOLEAN DEFAULT FALSE,
  email_opened BOOLEAN DEFAULT FALSE,
  email_clicked BOOLEAN DEFAULT FALSE,
  
  -- Timestamps pour le suivi
  email_sent_at TIMESTAMP WITH TIME ZONE,
  email_opened_at TIMESTAMP WITH TIME ZONE,
  email_clicked_at TIMESTAMP WITH TIME ZONE
);

-- Index pour améliorer les performances
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_status ON leads(status);

-- Table pour les logs d'emails
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'audit-systeme',
  subject TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  
  -- Métadonnées
  email_service VARCHAR(50), -- 'sendgrid', 'mailgun', 'gmail', etc.
  template_id VARCHAR(100)
);

-- Index pour email_logs
CREATE INDEX idx_email_logs_lead_id ON email_logs(lead_id);
CREATE INDEX idx_email_logs_email ON email_logs(email);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);

-- Table pour les événements de tracking
CREATE TABLE IF NOT EXISTS lead_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'page_view', 'form_submit', 'email_open', 'email_click', etc.
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Métadonnées
  ip_address INET,
  user_agent TEXT,
  referrer TEXT
);

-- Index pour lead_events
CREATE INDEX idx_lead_events_lead_id ON lead_events(lead_id);
CREATE INDEX idx_lead_events_type ON lead_events(event_type);
CREATE INDEX idx_lead_events_created_at ON lead_events(created_at);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Vue pour les statistiques
CREATE OR REPLACE VIEW lead_stats AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(CASE WHEN email_sent = TRUE THEN 1 END) as emails_sent,
  COUNT(CASE WHEN email_opened = TRUE THEN 1 END) as emails_opened,
  COUNT(CASE WHEN email_clicked = TRUE THEN 1 END) as emails_clicked,
  ROUND(
    (COUNT(CASE WHEN email_sent = TRUE THEN 1 END)::DECIMAL / 
     NULLIF(COUNT(*), 0) * 100), 
    2
  ) as email_sent_rate,
  ROUND(
    (COUNT(CASE WHEN email_opened = TRUE THEN 1 END)::DECIMAL / 
     NULLIF(COUNT(CASE WHEN email_sent = TRUE THEN 1 END), 0) * 100), 
    2
  ) as email_open_rate,
  ROUND(
    (COUNT(CASE WHEN email_clicked = TRUE THEN 1 END)::DECIMAL / 
     NULLIF(COUNT(CASE WHEN email_opened = TRUE THEN 1 END), 0) * 100), 
    2
  ) as email_click_rate
FROM leads
WHERE source = 'audit-systeme-page';

-- Vue pour les leads récents
CREATE OR REPLACE VIEW recent_leads AS
SELECT 
  id,
  email,
  source,
  status,
  email_sent,
  email_opened,
  email_clicked,
  created_at
FROM leads
WHERE source = 'audit-systeme-page'
ORDER BY created_at DESC
LIMIT 100;

-- Politique de sécurité RLS (Row Level Security)
-- Active RLS sur la table leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion depuis l'API publique
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated read" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Commentaires pour la documentation
COMMENT ON TABLE leads IS 'Table principale pour stocker les leads capturés depuis la page audit-systeme';
COMMENT ON COLUMN leads.email IS 'Adresse email du lead (unique)';
COMMENT ON COLUMN leads.source IS 'Source d''acquisition du lead';
COMMENT ON COLUMN leads.status IS 'Statut du lead: new, contacted, converted, etc.';
COMMENT ON TABLE email_logs IS 'Logs de tous les emails envoyés aux leads';
COMMENT ON TABLE lead_events IS 'Événements de tracking pour analyser le comportement des leads';

-- =====================================================
-- REQUÊTES UTILES POUR L'ANALYSE
-- =====================================================

-- Voir tous les leads récents
-- SELECT * FROM recent_leads;

-- Voir les statistiques globales
-- SELECT * FROM lead_stats;

-- Leads qui n'ont pas encore reçu l'email
-- SELECT email, created_at 
-- FROM leads 
-- WHERE email_sent = FALSE 
-- ORDER BY created_at DESC;

-- Taux de conversion par jour
-- SELECT 
--   DATE(created_at) as date,
--   COUNT(*) as total_leads,
--   COUNT(CASE WHEN email_opened = TRUE THEN 1 END) as opened,
--   ROUND(
--     COUNT(CASE WHEN email_opened = TRUE THEN 1 END)::DECIMAL / COUNT(*) * 100,
--     2
--   ) as open_rate
-- FROM leads
-- WHERE source = 'audit-systeme-page'
-- GROUP BY DATE(created_at)
-- ORDER BY date DESC;

-- Performance par source
-- SELECT 
--   source,
--   COUNT(*) as total,
--   COUNT(CASE WHEN email_opened = TRUE THEN 1 END) as opened
-- FROM leads
-- GROUP BY source
-- ORDER BY total DESC;









