-- Script pour nettoyer la table users et supprimer les champs redondants avec auth.users
-- Exécuter ce script dans l'interface SQL de Supabase

-- 1. Créer une sauvegarde de la table users avant modification (optionnel)
CREATE TABLE IF NOT EXISTS users_backup AS SELECT * FROM users;

-- 2. Supprimer les contraintes qui pourraient bloquer les modifications
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_key CASCADE;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_username_key CASCADE;

-- 3. Supprimer les champs redondants avec auth.users
ALTER TABLE users 
  DROP COLUMN IF EXISTS password_hash,
  DROP COLUMN IF EXISTS email,
  DROP COLUMN IF EXISTS username;

-- 4. Ajouter une contrainte de clé étrangère vers auth.users (si elle n'existe pas déjà)
-- Vérifier d'abord si la contrainte existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'users_auth_user_id_fkey'
  ) THEN
    ALTER TABLE users 
      ADD CONSTRAINT users_auth_user_id_fkey 
      FOREIGN KEY (auth_user_id) 
      REFERENCES auth.users(id) 
      ON DELETE CASCADE;
  END IF;
END
$$;

-- 5. Créer un index sur auth_user_id pour améliorer les performances (si il n'existe pas déjà)
CREATE INDEX IF NOT EXISTS users_auth_user_id_idx ON users(auth_user_id);

-- 6. Vérifier que tout s'est bien passé
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM 
  information_schema.columns 
WHERE 
  table_name = 'users' 
ORDER BY 
  ordinal_position;
