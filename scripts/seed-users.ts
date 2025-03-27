import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { format, subYears } from 'date-fns';
import dotenv from 'dotenv';

// Définir les types pour la table users
type UserInsert = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  active: boolean | null;
  address: string | null;
  apartment: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  country: string | null;
  mobile_phone: string | null;
  office_phone: string | null;
  birth_date: string | null;
  language: string | null;
  position: string | null;
  company_name: string | null;
  notes: string | null;
  transportation: string | null;
  years_of_experience: number | null;
  coverage_radius_km: number | null;
  locationless: boolean | null;
  group_name: string | null;
  availability_blocks: string | null;
  auth_user_id: string | null;
};

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

// Fonction pour récupérer les utilisateurs existants dans auth.users
async function getAuthUsers(): Promise<any[]> {
  try {
    // Dans une vraie implémentation, nous utiliserions une requête pour récupérer les utilisateurs auth
    // Pour l'instant, nous retournons un tableau vide pour éviter les erreurs de clé étrangère
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs auth:', error);
    return [];
  }
}

// Fonction pour formater une date au format ISO
function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

// Fonction pour générer un numéro de téléphone aléatoire
function generatePhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

// Fonction pour générer des données d'utilisateurs
async function seedUsers(): Promise<void> {
  console.log('Seeding users data...');

  // Récupérer les utilisateurs auth existants
  const authUsers = await getAuthUsers();
  console.log(`${authUsers.length} utilisateurs auth trouvés`);

  // Créer des utilisateurs de base
  const users: UserInsert[] = [
    {
      id: uuidv4(),
      first_name: 'Admin',
      last_name: 'Système',
      role: 'admin',
      active: true,
      address: '123 Rue Principale',
      apartment: null,
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H2X 1Y6',
      country: 'Canada',
      mobile_phone: generatePhoneNumber(),
      office_phone: generatePhoneNumber(),
      birth_date: formatDate(subYears(new Date(), 35)),
      language: 'fr',
      position: 'Administrateur système',
      company_name: 'Ninja Bleu',
      notes: 'Utilisateur administrateur principal',
      transportation: 'Voiture',
      years_of_experience: 10,
      coverage_radius_km: 50,
      locationless: false,
      group_name: 'Administration',
      availability_blocks: null,
      auth_user_id: null
    },
    {
      id: uuidv4(),
      first_name: 'Marie',
      last_name: 'Gestion',
      role: 'admin', 
      active: true,
      address: '456 Boulevard St-Laurent',
      apartment: null,
      city: 'Québec',
      province: 'QC',
      postal_code: 'G1K 3B2',
      country: 'Canada',
      mobile_phone: generatePhoneNumber(),
      office_phone: generatePhoneNumber(),
      birth_date: formatDate(subYears(new Date(), 42)),
      language: 'fr',
      position: 'Superviseur des opérations',
      company_name: 'Ninja Bleu',
      notes: 'Responsable des opérations quotidiennes',
      transportation: 'Voiture',
      years_of_experience: 15,
      coverage_radius_km: 30,
      locationless: false,
      group_name: 'Gestion',
      availability_blocks: null,
      auth_user_id: null
    },
    {
      id: uuidv4(),
      first_name: 'Jean',
      last_name: 'Ninja',
      role: 'ninja',
      active: true,
      address: '789 Avenue du Parc',
      apartment: null,
      city: 'Sherbrooke',
      province: 'QC',
      postal_code: 'J1H 5H1',
      country: 'Canada',
      mobile_phone: generatePhoneNumber(),
      office_phone: generatePhoneNumber(),
      birth_date: formatDate(subYears(new Date(), 28)),
      language: 'fr',
      position: 'Technicien senior',
      company_name: 'Ninja Bleu',
      notes: 'Spécialiste en réparation de climatiseurs',
      transportation: 'Camionnette',
      years_of_experience: 5,
      coverage_radius_km: 15,
      locationless: false,
      group_name: 'Équipe A',
      availability_blocks: null,
      auth_user_id: null
    },
    {
      id: uuidv4(),
      first_name: 'Sophie',
      last_name: 'Tech',
      role: 'ninja',
      active: true,
      address: '234 Rue Wellington',
      apartment: null,
      city: 'Gatineau',
      province: 'QC',
      postal_code: 'J8X 2J3',
      country: 'Canada',
      mobile_phone: generatePhoneNumber(),
      office_phone: generatePhoneNumber(),
      birth_date: formatDate(subYears(new Date(), 32)),
      language: 'fr',
      position: 'Technicienne',
      company_name: 'Ninja Bleu',
      notes: 'Spécialiste en réparation de réfrigérateurs',
      transportation: 'Voiture',
      years_of_experience: 8,
      coverage_radius_km: 25,
      locationless: false,
      group_name: 'Équipe B',
      availability_blocks: null,
      auth_user_id: null
    },
    {
      id: uuidv4(),
      first_name: 'Michel',
      last_name: 'Inactif',
      role: 'ninja',
      active: false,
      address: '567 Rue King',
      apartment: null,
      city: 'Montréal',
      province: 'QC',
      postal_code: 'H3C 2N5',
      country: 'Canada',
      mobile_phone: generatePhoneNumber(),
      office_phone: generatePhoneNumber(),
      birth_date: formatDate(subYears(new Date(), 45)),
      language: 'fr',
      position: 'Technicien',
      company_name: 'Ninja Bleu',
      notes: 'Compte inactif - ancien employé',
      transportation: 'Voiture',
      years_of_experience: 12,
      coverage_radius_km: 20,
      locationless: false,
      group_name: 'Équipe A',
      availability_blocks: null,
      auth_user_id: null
    }
  ];

  // Associer les utilisateurs auth aux utilisateurs de l'application si possible
  for (const authUser of authUsers) {
    const matchingUser = users.find(user => 
      (user.first_name === authUser.user_metadata?.first_name && 
       user.last_name === authUser.user_metadata?.last_name) || 
      (user.first_name && user.last_name && 
       `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}` === 
       `${authUser.user_metadata?.first_name?.toLowerCase() || ''} ${authUser.user_metadata?.last_name?.toLowerCase() || ''}`.trim())
    );
    
    if (matchingUser) {
      matchingUser.auth_user_id = authUser.id;
      console.log(`Utilisateur auth associé: ${authUser.email}`);
    } else {
      // Créer un nouvel utilisateur basé sur l'utilisateur auth
      const newUser: UserInsert = {
        id: uuidv4(),
        first_name: authUser.user_metadata?.first_name || null,
        last_name: authUser.user_metadata?.last_name || null,
        role: 'ninja', 
        active: true,
        address: '',
        apartment: null,
        city: '',
        province: '',
        postal_code: '',
        country: '',
        mobile_phone: '',
        office_phone: '',
        birth_date: null,
        language: 'fr',
        position: '',
        company_name: '',
        notes: 'Utilisateur créé automatiquement',
        transportation: '',
        years_of_experience: null,
        coverage_radius_km: null,
        locationless: true,
        group_name: '',
        availability_blocks: null,
        auth_user_id: null 
      };
      users.push(newUser);
      console.log(`Nouvel utilisateur créé pour auth: ${authUser.email}`);
    }
  }

  // Insérer les utilisateurs dans la base de données
  let successCount = 0;
  for (const user of users) {
    const { error } = await supabase
      .from('users')
      .upsert(user, {
        onConflict: 'id',
        ignoreDuplicates: false
      });
    
    if (error) {
      console.error(`Erreur lors de l'insertion de l'utilisateur ${user.first_name} ${user.last_name}:`, error);
    } else {
      console.log(`Utilisateur ${user.first_name} ${user.last_name} inséré avec succès`);
      successCount++;
    }
  }
  
  console.log(`${successCount} utilisateurs insérés avec succès!`);
  console.log('Opération terminée');
}

// Exécuter la fonction de seeding
seedUsers().catch(error => {
  console.error('Erreur lors du seeding:', error);
  process.exit(1);
});
