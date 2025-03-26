import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createTodo,
    deleteTodo,
    getTodos,
    TodoInsert,
    TodoUpdate,
    updateTodo,
} from "./todos";
import {
    Client,
    ClientInsert,
    ClientUpdate,
    createClient,
    deleteClient,
    getClient,
    getClients,
    updateClient,
} from "./clients";
import { useToast } from "@/hooks/use-toast";

export function useTodos({ done }: { done?: boolean } = {}) {
    return useQuery({
        queryKey: ["todos", { done }],
        queryFn: () => getTodos({ done }),
    });
}

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (todo: TodoInsert) => createTodo(todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({
                title: "Success",
                description: "Todo created successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}

export function useUpdateTodo() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, todo }: { id: number; todo: TodoUpdate }) =>
            updateTodo(id, todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({
                title: "Success",
                description: "Todo updated successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}

export function useDeleteTodo() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({
                title: "Success",
                description: "Todo deleted successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}

export function useClients({ active }: { active?: boolean } = {}) {
    return useQuery({
        queryKey: ["clients", { active }],
        queryFn: () => getClients({ active }),
    });
}

export function useClient(id: string) {
    return useQuery({
        queryKey: ["clients", id],
        queryFn: () => getClient(id),
        enabled: !!id,
    });
}

export function useCreateClient() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (client: ClientInsert) => createClient(client),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast({
                title: "Success",
                description: "Client created successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}

export function useUpdateClient() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, client }: { id: string; client: ClientUpdate }) =>
            updateClient(id, client),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast({
                title: "Success",
                description: "Client updated successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}

export function useDeleteClient() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: string) => deleteClient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast({
                title: "Success",
                description: "Client deleted successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}
