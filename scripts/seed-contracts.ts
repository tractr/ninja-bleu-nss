import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { addDays, format, subDays } from 'date-fns';

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

// Fonction pour récupérer les clients existants
async function getExistingClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('id, name, company_name')
    .eq('active', true);

  if (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    return [];
  }

  return data || [];
}

// Fonction pour récupérer les contacts existants
async function getExistingContacts() {
  const { data, error } = await supabase
    .from('contacts')
    .select('id, client_id, first_name, last_name')
    .eq('active', true);

  if (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    return [];
  }

  return data || [];
}

// Fonction pour formater une date au format ISO
function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

async function seedContracts() {
  console.log("Seeding contracts data...");
  
  // Récupérer les clients et contacts existants
  const clients = await getExistingClients();
  const contacts = await getExistingContacts();
  
  if (clients.length === 0) {
    console.error('Aucun client trouvé. Veuillez d\'abord exécuter le script seed-clients.ts');
    process.exit(1);
  }

  // Statuts possibles pour les contrats
  const statuses = ['draft', 'active', 'completed', 'cancelled'];
  
  // Unités de prix possibles
  const priceUnits = ['hour', 'day', 'week', 'month', 'fixed'];
  
  // Unités de facturation possibles
  const billingUnits = ['hour', 'day', 'week', 'month', 'fixed'];
  
  // Jours de service possibles
  const allServiceDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Tâches possibles
  const allTasks = [
    'cleaning', 'maintenance', 'repair', 'installation', 'inspection', 
    'consultation', 'training', 'support', 'development', 'design'
  ];

  // Générer des contrats pour chaque client
  const contracts = [];
  
  for (const client of clients) {
    // Trouver les contacts associés à ce client
    const clientContacts = contacts.filter(contact => contact.client_id === client.id);
    
    // Nombre de contrats à créer pour ce client (1 à 3)
    const numContracts = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numContracts; i++) {
      const today = new Date();
      const startDate = subDays(today, Math.floor(Math.random() * 180)); // Date de début entre aujourd'hui et 6 mois en arrière
      const endDate = addDays(startDate, Math.floor(Math.random() * 365) + 30); // Date de fin entre 1 mois et 1 an après la date de début
      
      // Sélectionner aléatoirement un contact de ce client, s'il en existe
      const contactId = clientContacts.length > 0 
        ? clientContacts[Math.floor(Math.random() * clientContacts.length)].id 
        : null;
      
      // Sélectionner aléatoirement un statut
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Sélectionner aléatoirement une unité de prix
      const priceUnit = priceUnits[Math.floor(Math.random() * priceUnits.length)];
      
      // Sélectionner aléatoirement une unité de facturation
      const billingUnit = billingUnits[Math.floor(Math.random() * billingUnits.length)];
      
      // Sélectionner aléatoirement des jours de service (2 à 5 jours)
      const numServiceDays = Math.floor(Math.random() * 4) + 2;
      const shuffledServiceDays = [...allServiceDays].sort(() => 0.5 - Math.random());
      const serviceDays = shuffledServiceDays.slice(0, numServiceDays);
      
      // Sélectionner aléatoirement des tâches (1 à 3 tâches)
      const numTasks = Math.floor(Math.random() * 3) + 1;
      const shuffledTasks = [...allTasks].sort(() => 0.5 - Math.random());
      const tasks = shuffledTasks.slice(0, numTasks);
      
      // Générer un prix aléatoire entre 50 et 5000
      const price = Math.floor(Math.random() * 4950) + 50;
      
      // Générer un coût aléatoire entre 30% et 70% du prix
      const cost = Math.floor(price * (0.3 + Math.random() * 0.4));
      
      // Créer le contrat
      const contract = {
        id: uuidv4(),
        client_id: client.id,
        contact_id: contactId,
        user_id: null,
        parent_contract_id: null,
        alias: `Contrat ${client.company_name || client.name} ${i + 1}`,
        address: null, // Utiliser l'adresse du client par défaut
        apartment: null,
        city: null,
        province: null,
        postal_code: null,
        country: null,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        price: price,
        price_unit: priceUnit,
        billing_unit: billingUnit,
        cost: cost,
        status: status,
        language: Math.random() > 0.3 ? 'fr' : 'en', // 70% français, 30% anglais
        entry_method: 'manual',
        service_days: serviceDays,
        tasks: tasks,
        notes: `Notes pour le contrat ${i + 1} de ${client.company_name || client.name}`,
        active: status !== 'cancelled',
      };
      
      contracts.push(contract);
    }
  }

  try {
    // Insérer les contrats un par un pour éviter les erreurs de clé dupliquée
    for (const contract of contracts) {
      const { error } = await supabase
        .from('contracts')
        .upsert(contract, { 
          onConflict: 'id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error(`Erreur lors de l'insertion du contrat pour ${contract.alias}:`, error);
      } else {
        console.log(`Contrat inséré avec succès: ${contract.alias}`);
      }
    }

    console.log(`${contracts.length} contrats insérés avec succès!`);
  } catch (error) {
    console.error('Erreur lors du seeding des contrats:', error);
  }
}

// Exécuter la fonction de seeding
seedContracts()
  .catch(console.error)
  .finally(() => {
    console.log('Script de seeding des contrats terminé');
    process.exit(0);
  });
