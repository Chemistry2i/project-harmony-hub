CREATE TYPE public.lead_type AS ENUM ('contact', 'quote');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'quoted', 'won', 'lost');

CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE DEFAULT ('LIV-' || to_char(now(), 'YYYY') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))),
  type public.lead_type NOT NULL DEFAULT 'contact',
  status public.lead_status NOT NULL DEFAULT 'new',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  institution TEXT,
  location TEXT,
  message TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  annual_volume TEXT,
  timeline TEXT,
  budget_range TEXT,
  internal_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff can read leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can update leads" ON public.leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff can delete leads" ON public.leads FOR DELETE TO authenticated USING (true);

CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'Sales',
  notify BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage team members" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;

INSERT INTO public.team_members (name, email, role) VALUES
  ('Sales Desk', 'sales@livanlabsupplies.co.ug', 'Sales'),
  ('Technical Support', 'support@livanlabsupplies.co.ug', 'Service Engineer'),
  ('Procurement Lead', 'procurement@livanlabsupplies.co.ug', 'Procurement');

INSERT INTO public.leads (type, status, full_name, email, phone, institution, location, message, items, annual_volume, timeline, budget_range) VALUES
  ('quote', 'new', 'Dr. Sarah Nakato', 'snakato@mulagohospital.go.ug', '+256 772 445 019', 'Mulago National Referral Hospital', 'Kampala, Uganda', 'We are expanding our chemistry bench and need two analyzers plus a reagent contract.', '[{"name":"Roche Cobas c111 Analyzer","sku":"RCH-C111-001","quantity":2}]'::jsonb, '45,000 tests', 'Within 1 month', 'UGX 150M - 250M'),
  ('contact', 'contacted', 'Emmanuel Okiror', 'e.okiror@must.ac.ug', '+256 701 336 208', 'Mbarara University of Science & Technology', 'Mbarara, Uganda', 'Requesting a service visit for six teaching microscopes before the new semester.', '[]'::jsonb, NULL, NULL, NULL),
  ('quote', 'quoted', 'Grace Atim', 'procurement@lacorhospital.org', '+256 782 110 774', 'St. Mary''s Hospital Lacor', 'Gulu, Uganda', 'Hematology analyzer replacement for the outpatient laboratory.', '[{"name":"Sysmex XP-300 Analyzer","sku":"SYS-XP300-001","quantity":1},{"name":"Mindray BC-3000Plus","sku":"MDR-BC3000-001","quantity":1}]'::jsonb, '30,000 tests', 'Within 3 months', 'UGX 60M - 120M');