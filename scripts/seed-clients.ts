import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Charger les variables d'environnement
dotenv.config();

// Récupérer les variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Les variables d\'environnement SUPABASE_URL et SUPABASE_ANON_KEY sont requises');
  process.exit(1);
}

// Créer un client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedClients() {
  console.log("Seeding clients data...");
  
  const clients = [
    {
      id: uuidv4(),
      name: 'Jean Tremblay',
      company_name: 'Constructions Tremblay Inc.',
      alias: 'Tremblay Construction',
      active: true,
      address: '123 Rue Principale',
      apartment: 'Suite 200',
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H2X 1Y6',
      country: 'Canada',
      payment_terms: 'Net 30',
      discount_amount: 0,
      electronic_payment_discount_percent: 2.5,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'Marie Lavoie',
      company_name: 'Boutique Lavoie',
      alias: 'Lavoie',
      active: true,
      address: '456 Boulevard St-Laurent',
      apartment: null,
      city: 'Québec',
      province: 'QC',
      postal_code: 'G1K 3B2',
      country: 'Canada',
      payment_terms: 'Net 15',
      discount_amount: 100,
      electronic_payment_discount_percent: 1.5,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'Robert Gagnon',
      company_name: 'Gagnon et Fils',
      alias: 'Gagnon',
      active: true,
      address: '789 Avenue du Parc',
      apartment: 'Étage 3',
      city: 'Sherbrooke',
      province: 'QC',
      postal_code: 'J1H 5H1',
      country: 'Canada',
      payment_terms: 'Net 45',
      discount_amount: 0,
      electronic_payment_discount_percent: 0,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'Sophie Bergeron',
      company_name: 'Restaurants Bergeron',
      alias: 'Bergeron',
      active: true,
      address: '234 Rue Wellington',
      apartment: null,
      city: 'Gatineau',
      province: 'QC',
      postal_code: 'J8X 2J3',
      country: 'Canada',
      payment_terms: 'Net 30',
      discount_amount: 50,
      electronic_payment_discount_percent: 2.0,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'Michel Côté',
      company_name: 'Technologies Côté',
      alias: 'Côté Tech',
      active: true,
      address: '567 Rue King',
      apartment: 'Bureau 400',
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H3B 2K5',
      country: 'Canada',
      payment_terms: 'Net 60',
      discount_amount: 0,
      electronic_payment_discount_percent: 3.0,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'Julie Lemieux',
      company_name: 'Designs Lemieux',
      alias: 'Lemieux Design',
      active: false,
      address: '890 Avenue Mont-Royal',
      apartment: null,
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H2J 1X8',
      country: 'Canada',
      payment_terms: 'Net 30',
      discount_amount: 0,
      electronic_payment_discount_percent: 0,
      reason: 'Closed business'
    },
    {
      id: uuidv4(),
      name: 'Pierre Bouchard',
      company_name: 'Consultants Bouchard',
      alias: 'Bouchard',
      active: true,
      address: '123 Rue Notre-Dame',
      apartment: 'Suite 500',
      city: 'Trois-Rivières',
      province: 'QC',
      postal_code: 'G9A 4X3',
      country: 'Canada',
      payment_terms: 'Net 15',
      discount_amount: 75,
      electronic_payment_discount_percent: 1.0,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'Isabelle Roy',
      company_name: 'Clinique Roy',
      alias: 'Roy',
      active: true,
      address: '456 Boulevard René-Lévesque',
      apartment: null,
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H2Z 1Z9',
      country: 'Canada',
      payment_terms: 'Net 30',
      discount_amount: 0,
      electronic_payment_discount_percent: 2.0,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'François Morin',
      company_name: 'Morin Électrique',
      alias: 'Morin',
      active: true,
      address: '789 Rue Sherbrooke',
      apartment: 'Local 300',
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H3A 1E9',
      country: 'Canada',
      payment_terms: 'Net 45',
      discount_amount: 0,
      electronic_payment_discount_percent: 1.5,
      reason: null
    },
    {
      id: uuidv4(),
      name: 'Nathalie Dubois',
      company_name: 'Immobilier Dubois',
      alias: 'Dubois',
      active: false,
      address: '234 Rue Peel',
      apartment: 'Bureau 800',
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H3C 2G7',
      country: 'Canada',
      payment_terms: 'Net 30',
      discount_amount: 0,
      electronic_payment_discount_percent: 0,
      reason: 'Inactive account'
    }
  ];

  try {
    // Insérer les clients un par un pour éviter les erreurs de clé dupliquée
    for (const client of clients) {
      const { error } = await supabase
        .from('clients')
        .upsert(client, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error(`Erreur lors de l'insertion du client ${client.id}:`, error);
      } else {
        console.log(`Client ${client.id} inséré avec succès`);
      }
    }
    
    console.log("Seeding clients terminé!");
  } catch (error) {
    console.error("Erreur lors du seeding des clients:", error);
  }
}

// Exécuter la fonction de seeding
seedClients()
  .catch(console.error)
  .finally(() => {
    console.log("Opération terminée");
    process.exit(0);
  });
