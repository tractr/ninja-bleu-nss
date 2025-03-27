export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      clients: {
        Row: {
          active: boolean | null
          address: string | null
          alias: string | null
          apartment: string | null
          city: string | null
          company_name: string | null
          country: string | null
          discount_amount: number | null
          electronic_payment_discount_percent: number | null
          id: string
          name: string
          payment_terms: string | null
          postal_code: string | null
          province: string | null
          reason: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          discount_amount?: number | null
          electronic_payment_discount_percent?: number | null
          id: string
          name: string
          payment_terms?: string | null
          postal_code?: string | null
          province?: string | null
          reason?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          discount_amount?: number | null
          electronic_payment_discount_percent?: number | null
          id?: string
          name?: string
          payment_terms?: string | null
          postal_code?: string | null
          province?: string | null
          reason?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          active: boolean | null
          birth_date: string | null
          client_id: string
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          language: string | null
          last_name: string | null
          mobile_phone: string | null
          office_phone: string | null
          position: string | null
          salutation: string | null
          title: string | null
        }
        Insert: {
          active?: boolean | null
          birth_date?: string | null
          client_id: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          language?: string | null
          last_name?: string | null
          mobile_phone?: string | null
          office_phone?: string | null
          position?: string | null
          salutation?: string | null
          title?: string | null
        }
        Update: {
          active?: boolean | null
          birth_date?: string | null
          client_id?: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          language?: string | null
          last_name?: string | null
          mobile_phone?: string | null
          office_phone?: string | null
          position?: string | null
          salutation?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          active: boolean | null
          address: string | null
          alias: string | null
          apartment: string | null
          billing_unit: string | null
          city: string | null
          client_id: string
          contact_id: string | null
          cost: number | null
          country: string | null
          end_date: string | null
          entry_method: string | null
          id: string
          language: string | null
          notes: string | null
          parent_contract_id: string | null
          postal_code: string | null
          price: number | null
          price_unit: string | null
          province: string | null
          service_days: string[] | null
          start_date: string | null
          status: string | null
          tasks: string[] | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          billing_unit?: string | null
          city?: string | null
          client_id: string
          contact_id?: string | null
          cost?: number | null
          country?: string | null
          end_date?: string | null
          entry_method?: string | null
          id: string
          language?: string | null
          notes?: string | null
          parent_contract_id?: string | null
          postal_code?: string | null
          price?: number | null
          price_unit?: string | null
          province?: string | null
          service_days?: string[] | null
          start_date?: string | null
          status?: string | null
          tasks?: string[] | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          billing_unit?: string | null
          city?: string | null
          client_id?: string
          contact_id?: string | null
          cost?: number | null
          country?: string | null
          end_date?: string | null
          entry_method?: string | null
          id?: string
          language?: string | null
          notes?: string | null
          parent_contract_id?: string | null
          postal_code?: string | null
          price?: number | null
          price_unit?: string | null
          province?: string | null
          service_days?: string[] | null
          start_date?: string | null
          status?: string | null
          tasks?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      extras: {
        Row: {
          active: boolean | null
          billing_unit: string | null
          contract_id: string
          cost: number | null
          description: string | null
          id: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          billing_unit?: string | null
          contract_id: string
          cost?: number | null
          description?: string | null
          id: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          billing_unit?: string | null
          contract_id?: string
          cost?: number | null
          description?: string | null
          id?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "extras_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extras_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          must_be_validated: boolean | null
          title: string
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          must_be_validated?: boolean | null
          title: string
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          must_be_validated?: boolean | null
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          active: boolean | null
          address: string | null
          alias: string | null
          apartment: string | null
          auth_user_id: string | null
          availability_blocks: string | null
          birth_date: string | null
          city: string | null
          company_name: string | null
          country: string | null
          coverage_radius_km: number | null
          first_name: string | null
          group_name: string | null
          id: string
          language: string | null
          last_name: string | null
          locationless: boolean | null
          mobile_phone: string | null
          notes: string | null
          office_phone: string | null
          position: string | null
          postal_code: string | null
          province: string | null
          role: string
          salutation: string | null
          supervisor_id: string | null
          transportation: string | null
          years_of_experience: number | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          auth_user_id?: string | null
          availability_blocks?: string | null
          birth_date?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          coverage_radius_km?: number | null
          first_name?: string | null
          group_name?: string | null
          id: string
          language?: string | null
          last_name?: string | null
          locationless?: boolean | null
          mobile_phone?: string | null
          notes?: string | null
          office_phone?: string | null
          position?: string | null
          postal_code?: string | null
          province?: string | null
          role: string
          salutation?: string | null
          supervisor_id?: string | null
          transportation?: string | null
          years_of_experience?: number | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          auth_user_id?: string | null
          availability_blocks?: string | null
          birth_date?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          coverage_radius_km?: number | null
          first_name?: string | null
          group_name?: string | null
          id?: string
          language?: string | null
          last_name?: string | null
          locationless?: boolean | null
          mobile_phone?: string | null
          notes?: string | null
          office_phone?: string | null
          position?: string | null
          postal_code?: string | null
          province?: string | null
          role?: string
          salutation?: string | null
          supervisor_id?: string | null
          transportation?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_backup: {
        Row: {
          active: boolean | null
          address: string | null
          alias: string | null
          apartment: string | null
          auth_user_id: string | null
          availability_blocks: string | null
          birth_date: string | null
          city: string | null
          company_name: string | null
          country: string | null
          coverage_radius_km: number | null
          email: string | null
          first_name: string | null
          group_name: string | null
          id: string | null
          language: string | null
          last_name: string | null
          locationless: boolean | null
          mobile_phone: string | null
          notes: string | null
          office_phone: string | null
          password_hash: string | null
          position: string | null
          postal_code: string | null
          province: string | null
          role: string | null
          salutation: string | null
          supervisor_id: string | null
          transportation: string | null
          username: string | null
          years_of_experience: number | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          auth_user_id?: string | null
          availability_blocks?: string | null
          birth_date?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          coverage_radius_km?: number | null
          email?: string | null
          first_name?: string | null
          group_name?: string | null
          id?: string | null
          language?: string | null
          last_name?: string | null
          locationless?: boolean | null
          mobile_phone?: string | null
          notes?: string | null
          office_phone?: string | null
          password_hash?: string | null
          position?: string | null
          postal_code?: string | null
          province?: string | null
          role?: string | null
          salutation?: string | null
          supervisor_id?: string | null
          transportation?: string | null
          username?: string | null
          years_of_experience?: number | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          alias?: string | null
          apartment?: string | null
          auth_user_id?: string | null
          availability_blocks?: string | null
          birth_date?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          coverage_radius_km?: number | null
          email?: string | null
          first_name?: string | null
          group_name?: string | null
          id?: string | null
          language?: string | null
          last_name?: string | null
          locationless?: boolean | null
          mobile_phone?: string | null
          notes?: string | null
          office_phone?: string | null
          password_hash?: string | null
          position?: string | null
          postal_code?: string | null
          province?: string | null
          role?: string | null
          salutation?: string | null
          supervisor_id?: string | null
          transportation?: string | null
          username?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      visit_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: number
          new_status: string | null
          notes: string | null
          previous_status: string | null
          visit_id: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: number
          new_status?: string | null
          notes?: string | null
          previous_status?: string | null
          visit_id?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: number
          new_status?: string | null
          notes?: string | null
          previous_status?: string | null
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visit_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visit_history_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "visits"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          active: boolean | null
          comment: string | null
          completed_tasks: string[] | null
          contract_id: string
          duration: string | null
          end_time: string | null
          evaluation: number | null
          extras: string[] | null
          id: string
          ninja_note: string | null
          note: string | null
          real_duration: string | null
          start_time: string | null
          status: string | null
          survey: string | null
          timer_end: string | null
          timer_start: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          comment?: string | null
          completed_tasks?: string[] | null
          contract_id: string
          duration?: string | null
          end_time?: string | null
          evaluation?: number | null
          extras?: string[] | null
          id: string
          ninja_note?: string | null
          note?: string | null
          real_duration?: string | null
          start_time?: string | null
          status?: string | null
          survey?: string | null
          timer_end?: string | null
          timer_start?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          comment?: string | null
          completed_tasks?: string[] | null
          contract_id?: string
          duration?: string | null
          end_time?: string | null
          evaluation?: number | null
          extras?: string[] | null
          id?: string
          ninja_note?: string | null
          note?: string | null
          real_duration?: string | null
          start_time?: string | null
          status?: string | null
          survey?: string | null
          timer_end?: string | null
          timer_start?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visits_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
