-- Seed data for clients table
INSERT INTO public.clients (id, name, company_name, alias, active, address, apartment, city, province, postal_code, country, payment_terms, discount_amount, electronic_payment_discount_percent, reason)
VALUES
  ('c001', 'Jean Tremblay', 'Constructions Tremblay Inc.', 'Tremblay Construction', true, '123 Rue Principale', 'Suite 200', 'Montréal', 'QC', 'H2X 1Y6', 'Canada', 'Net 30', 0, 2.5, NULL),
  ('c002', 'Marie Lavoie', 'Boutique Lavoie', 'Lavoie', true, '456 Boulevard St-Laurent', NULL, 'Québec', 'QC', 'G1K 3B2', 'Canada', 'Net 15', 100, 1.5, NULL),
  ('c003', 'Robert Gagnon', 'Gagnon et Fils', 'Gagnon', true, '789 Avenue du Parc', 'Étage 3', 'Sherbrooke', 'QC', 'J1H 5H1', 'Canada', 'Net 45', 0, 0, NULL),
  ('c004', 'Sophie Bergeron', 'Restaurants Bergeron', 'Bergeron', true, '234 Rue Wellington', NULL, 'Gatineau', 'QC', 'J8X 2J3', 'Canada', 'Net 30', 50, 2.0, NULL),
  ('c005', 'Michel Côté', 'Technologies Côté', 'Côté Tech', true, '567 Rue King', 'Bureau 400', 'Montréal', 'QC', 'H3B 2K5', 'Canada', 'Net 60', 0, 3.0, NULL),
  ('c006', 'Julie Lemieux', 'Designs Lemieux', 'Lemieux Design', false, '890 Avenue Mont-Royal', NULL, 'Montréal', 'QC', 'H2J 1X8', 'Canada', 'Net 30', 0, 0, 'Closed business'),
  ('c007', 'Pierre Bouchard', 'Consultants Bouchard', 'Bouchard', true, '123 Rue Notre-Dame', 'Suite 500', 'Trois-Rivières', 'QC', 'G9A 4X3', 'Canada', 'Net 15', 75, 1.0, NULL),
  ('c008', 'Isabelle Roy', 'Clinique Roy', 'Roy', true, '456 Boulevard René-Lévesque', NULL, 'Montréal', 'QC', 'H2Z 1Z9', 'Canada', 'Net 30', 0, 2.0, NULL),
  ('c009', 'François Morin', 'Morin Électrique', 'Morin', true, '789 Rue Sherbrooke', 'Local 300', 'Montréal', 'QC', 'H3A 1E9', 'Canada', 'Net 45', 0, 1.5, NULL),
  ('c010', 'Nathalie Dubois', 'Immobilier Dubois', 'Dubois', false, '234 Rue Peel', 'Bureau 800', 'Montréal', 'QC', 'H3C 2G7', 'Canada', 'Net 30', 0, 0, 'Inactive account');