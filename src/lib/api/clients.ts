import supabaseClient from "@/lib/supabase-client";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

export type Client = Tables<"clients">;
export type ClientInsert = TablesInsert<"clients">;
export type ClientUpdate = TablesUpdate<"clients">;

export async function getClients({ active }: { active?: boolean } = {}) {
    let query = supabaseClient
        .from("clients")
        .select("*")
        .order("name", { ascending: true });

    if (active !== undefined) {
        query = query.eq("active", active);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

export async function getClient(id: string) {
    const { data, error } = await supabaseClient
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
}

export async function createClient(client: ClientInsert) {
    const { data, error } = await supabaseClient
        .from("clients")
        .insert(client)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateClient(id: string, client: ClientUpdate) {
    const { data, error } = await supabaseClient
        .from("clients")
        .update(client)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteClient(id: string) {
    const { error } = await supabaseClient
        .from("clients")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
