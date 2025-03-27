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
import {
    Contract,
    ContractInsert,
    ContractUpdate,
    createContract,
    deleteContract,
    getContract,
    getContracts,
    updateContract,
} from "./contracts";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    type User,
    type UserInsert,
    type UserUpdate,
} from "./users";
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

export function useUsers({ active }: { active?: boolean } = {}) {
    return useQuery({
        queryKey: ["users", { active }],
        queryFn: () => getUsers({ active }),
    });
}

export function useUser(id: string) {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (user: UserInsert) => createUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                title: "Success",
                description: "User created successfully",
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

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, user }: { id: string; user: UserUpdate }) =>
            updateUser(id, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                title: "Success",
                description: "User updated successfully",
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

export function useDeleteUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                title: "Success",
                description: "User deleted successfully",
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

export function useContracts({ active, clientId }: { active?: boolean, clientId?: string } = {}) {
    return useQuery({
        queryKey: ["contracts", { active, clientId }],
        queryFn: () => getContracts({ active, clientId }),
    });
}

export function useContract(id: string) {
    return useQuery({
        queryKey: ["contracts", id],
        queryFn: () => getContract(id),
        enabled: !!id,
    });
}

export function useCreateContract() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (contract: ContractInsert) => createContract(contract),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contracts"] });
            toast({
                title: "Success",
                description: "Contract created successfully",
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

export function useUpdateContract() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, contract }: { id: string; contract: ContractUpdate }) =>
            updateContract(id, contract),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contracts"] });
            toast({
                title: "Success",
                description: "Contract updated successfully",
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

export function useDeleteContract() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: string) => deleteContract(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contracts"] });
            toast({
                title: "Success",
                description: "Contract deleted successfully",
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
