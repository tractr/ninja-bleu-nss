'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { 
  Loader2, 
  Trash2, 
  Edit, 
  Plus, 
  ChevronDown, 
  MoreHorizontal, 
  ArrowUpDown,
  Search
} from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useClients, useCreateClient, useUpdateClient, useDeleteClient } from '@/lib/api/queries';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { v4 as uuidv4 } from 'uuid';

const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  company_name: z.string().optional().nullable(),
  alias: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  apartment: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  payment_terms: z.string().optional().nullable(),
  discount_amount: z.number().optional().nullable(),
  electronic_payment_discount_percent: z.number().optional().nullable(),
  active: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

function ClientForm({ 
  client, 
  onSubmit, 
  onCancel, 
  isSubmitting 
}: { 
  client?: ClientFormValues; 
  onSubmit: (data: ClientFormValues) => void; 
  onCancel: () => void; 
  isSubmitting: boolean;
}) {
  const t = useTranslations();
  
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: client || {
      id: uuidv4(),
      name: '',
      company_name: '',
      alias: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postal_code: '',
      country: '',
      payment_terms: '',
      discount_amount: null,
      electronic_payment_discount_percent: null,
      active: true,
      reason: '',
    },
  });

  return (
    <Form {...form}>
      <form id="client-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('clients.name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('clients.companyName')}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('clients.alias')}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.address')}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.apartment')}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.city')}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.province')}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.postalCode')}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('clients.country')}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t('clients.active')}
                </FormLabel>
                <FormDescription>
                  {t('clients.activeDescription')}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        {!form.watch('active') && (
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.reason')}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}

export default function ClientsPage() {
  const t = useTranslations();
  const [selectedClient, setSelectedClient] = React.useState<ClientFormValues | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'inactive'>('all');
  
  // TanStack Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    alias: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  
  const { data: clients, isLoading } = useClients({ 
    active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined 
  });
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

  // Gérer la fermeture propre du dialogue
  const handleDialogClose = () => {
    // Fermer d'abord le dialogue
    setIsDialogOpen(false);
    
    // Réinitialiser les états après un court délai
    setTimeout(() => {
      setSelectedClient(undefined);
      setIsEditMode(false);
    }, 300);
  };

  const handleSubmit = async (data: ClientFormValues) => {
    try {
      if (isEditMode && selectedClient?.id) {
        await updateClientMutation.mutateAsync({
          id: selectedClient.id,
          client: data,
        });
      } else {
        await createClientMutation.mutateAsync({
          ...data,
          id: data.id || uuidv4(),
        });
      }
      handleDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (client: ClientFormValues) => {
    // Créer une copie du client pour éviter les références partagées
    const clientCopy = JSON.parse(JSON.stringify(client));
    setSelectedClient(clientCopy);
    setIsEditMode(true);
    
    // Ouvrir le dialogue après un court délai pour éviter les problèmes de rendu
    setTimeout(() => {
      setIsDialogOpen(true);
    }, 50);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('clients.confirmDelete'))) {
      try {
        await deleteClientMutation.mutateAsync(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddNew = () => {
    setSelectedClient(undefined);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  // Définition des colonnes pour TanStack Table
  const columns = React.useMemo<ColumnDef<ClientFormValues>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="pl-4">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="pl-4">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "alias",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="px-4 justify-start font-medium"
            >
              {t('clients.alias')}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="px-4">{row.getValue("alias") || "-"}</div>,
      },
      {
        accessorKey: "company_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="px-4 justify-start font-medium"
            >
              {t('clients.companyName')}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="px-4">{row.getValue("company_name") || "-"}</div>,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="px-4 justify-start font-medium"
            >
              {t('clients.name')}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="px-4">{row.getValue("name") || "-"}</div>,
      },
      {
        accessorKey: "address",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="px-4 justify-start font-medium"
            >
              {t('clients.address')}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="px-4">{row.getValue("address") || "-"}</div>,
      },
      {
        accessorKey: "city",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="px-4 justify-start font-medium"
            >
              {t('clients.city')}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="px-4">{row.getValue("city") || "-"}</div>,
      },
      {
        accessorKey: "active",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="px-4 justify-start font-medium"
            >
              {t('clients.status')}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const isActive = Boolean(row.getValue("active"));
          return (
            <div className="px-4">
              {isActive ? (
                <span className="inline-flex items-center rounded-full border border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                  {t('clients.active')}
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-transparent bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/20 dark:text-rose-300">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-rose-500 dark:bg-rose-400"></span>
                  {t('clients.inactive')}
                </span>
              )}
            </div>
          )
        },
        filterFn: (row, id, value) => {
          if (value === 'all') return true;
          const cellValue = row.getValue(id);
          if (cellValue === null || cellValue === undefined) return false;
          return value === 'active' ? Boolean(cellValue) : !Boolean(cellValue);
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: t('actions.actions'),
        cell: ({ row }) => {
          const client = row.original;
          return (
            <div className="text-right pr-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t('actions.actions')}</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleEdit(client)}>
                    <Edit className="mr-2 h-4 w-4" />
                    {t('clients.editClient')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => client.id && handleDelete(client.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('clients.deleteClient')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
        enableHiding: false,
      },
    ],
    [t]
  );

  // Initialisation de la table
  const table = useReactTable({
    data: clients || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
  });

  // Filtrer les données en fonction de la recherche globale
  React.useEffect(() => {
    if (globalFilter) {
      const filteredData = clients?.filter((client) => {
        return Object.entries(client)
          .filter(([key]) => key !== "id" && key !== "active" && typeof client[key as keyof typeof client] === "string")
          .some(([_, value]) => 
            value && String(value).toLowerCase().includes(globalFilter.toLowerCase())
          );
      });
      
      if (filteredData?.length === 0) {
        // Aucun résultat trouvé
        // Vous pouvez ajouter un message ici si nécessaire
      }
    }
  }, [globalFilter, clients]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t('clients.title')}</h1>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Input
                placeholder={t('clients.searchPlaceholder')}
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="h-9 pl-9"
                type="text"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 gap-1">
                  {t('clients.filter')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  {t('clients.showAll')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                  {t('clients.showActive')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                  {t('clients.showInactive')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 gap-1">
                  {t('clients.columns')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide() && column.id !== "actions")
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id === "name" ? t('clients.name') : 
                         column.id === "company_name" ? t('clients.companyName') : 
                         column.id === "city" ? t('clients.city') : 
                         column.id === "active" ? t('clients.status') : 
                         column.id === "alias" ? t('clients.alias') : 
                         column.id === "address" ? t('clients.address') : 
                         column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => handleAddNew()} className="h-9 gap-1" variant="outline">
              <Plus className="h-4 w-4" />
              {t('clients.addClient')}
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-t-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        onClick={(e) => {
                          // Vérifier si le clic est sur une checkbox ou dans la première colonne
                          const target = e.target as HTMLElement;
                          const isCheckboxOrFirstColumn = 
                            target.closest('input[type="checkbox"]') || 
                            target.closest('[data-column-id="select"]') ||
                            target.closest('td:first-child');
                          
                          // Ne pas déclencher l'édition si le clic est sur une checkbox ou dans la première colonne
                          if (!isCheckboxOrFirstColumn) {
                            handleEdit(row.original);
                          }
                        }}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell 
                            key={cell.id}
                            data-column-id={cell.column.id}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        {t('clients.noClients')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} {t('clients.of')}{" "}
                {table.getFilteredRowModel().rows.length} {t('clients.rowsSelected')}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {t('pagination.previous')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {t('pagination.next')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0 gap-0">
          <div className="p-6 pb-4 border-b shadow-sm z-10">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? t('clients.editClient') : t('clients.addClient')}
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="overflow-y-auto flex-grow px-6 py-4">
            <ClientForm
              key={selectedClient?.id || 'new-client'} 
              client={selectedClient}
              onSubmit={handleSubmit}
              onCancel={() => handleDialogClose()}
              isSubmitting={createClientMutation.isPending || updateClientMutation.isPending}
            />
          </div>
          <DialogFooter className="p-6 pt-4 border-t shadow-sm z-10 bg-background">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleDialogClose()}
            >
              {t('actions.cancel')}
            </Button>
            <Button 
              type="submit" 
              form="client-form"
              disabled={createClientMutation.isPending || updateClientMutation.isPending}
            >
              {createClientMutation.isPending || updateClientMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('actions.saving')}
                </>
              ) : (
                t('actions.save')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
