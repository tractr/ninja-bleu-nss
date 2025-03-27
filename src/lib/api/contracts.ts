import supabaseClient from "@/lib/supabase-client";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

export type Contract = Tables<"contracts">;
export type ContractInsert = TablesInsert<"contracts">;
export type ContractUpdate = TablesUpdate<"contracts">;

export async function getContracts({ active, clientId }: { active?: boolean, clientId?: string } = {}) {
    let query = supabaseClient
        .from("contracts")
        .select("*, clients(name, company_name), contacts(first_name, last_name), users(first_name, last_name)")
        .order("start_date", { ascending: false });

    if (active !== undefined) {
        query = query.eq("active", active);
    }

    if (clientId) {
        query = query.eq("client_id", clientId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

export async function getContract(id: string) {
    const { data, error } = await supabaseClient
        .from("contracts")
        .select("*, clients(name, company_name), contacts(first_name, last_name), users(first_name, last_name)")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
}

export async function createContract(contract: ContractInsert) {
    const { data, error } = await supabaseClient
        .from("contracts")
        .insert(contract)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateContract(id: string, contract: ContractUpdate) {
    const { data, error } = await supabaseClient
        .from("contracts")
        .update(contract)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteContract(id: string) {
    const { error } = await supabaseClient
        .from("contracts")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
