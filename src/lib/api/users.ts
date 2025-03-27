import supabaseClient from "@/lib/supabase-client";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

export type User = Tables<"users">;
export type UserInsert = TablesInsert<"users">;
export type UserUpdate = TablesUpdate<"users">;

export async function getUsers({ active }: { active?: boolean } = {}) {
    let query = supabaseClient
        .from("users")
        .select("*")
        .order("last_name", { ascending: true });

    if (active !== undefined) {
        query = query.eq("active", active);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

export async function getUser(id: string) {
    const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
}

export async function createUser(user: UserInsert) {
    const { data, error } = await supabaseClient
        .from("users")
        .insert(user)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateUser(id: string, user: UserUpdate) {
    const { data, error } = await supabaseClient
        .from("users")
        .update(user)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteUser(id: string) {
    const { error } = await supabaseClient
        .from("users")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
