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
  Search,
  Calendar
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
import { useContracts, useCreateContract, useUpdateContract, useDeleteContract, useClients } from '@/lib/api/queries';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from "@/components/ui/date-picker";
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const contractSchema = z.object({
  id: z.string().optional(),
  client_id: z.string().min(1, 'Client is required'),
  contact_id: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  parent_contract_id: z.string().optional().nullable(),
  alias: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  apartment: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  price_unit: z.string().optional().nullable(),
  billing_unit: z.string().optional().nullable(),
  cost: z.number().optional().nullable(),
  status: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  entry_method: z.string().optional().nullable(),
  service_days: z.array(z.string()).optional().nullable(),
  tasks: z.array(z.string()).optional().nullable(),
  notes: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
});

type ContractFormValues = z.infer<typeof contractSchema>;

// Type étendu pour inclure les relations
interface ContractWithRelations extends ContractFormValues {
  clients?: {
    name: string;
    company_name: string | null;
  } | null;
  contacts?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
  users?: {
    name: string | null;
  } | null;
}

function ContractForm({ 
  contract, 
  onSubmit, 
  onCancel, 
  isSubmitting 
}: { 
  contract?: ContractFormValues; 
  onSubmit: (data: ContractFormValues) => void; 
  onCancel: () => void; 
  isSubmitting: boolean;
}) {
  const t = useTranslations();
  const { data: clients } = useClients();
  
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: contract || {
      id: uuidv4(),
      client_id: '',
      contact_id: null,
      user_id: null,
      parent_contract_id: null,
      alias: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postal_code: '',
      country: '',
      start_date: null,
      end_date: null,
      price: null,
      price_unit: '',
      billing_unit: '',
      cost: null,
      status: 'active',
      language: '',
      entry_method: '',
      service_days: [],
      tasks: [],
      notes: '',
      active: true,
    },
  });

  // Fonction pour convertir une Date en string ISO
  const handleDateChange = (field: string, date: Date | undefined) => {
    form.setValue(field as any, date ? date.toISOString() : null);
  };

  return (
    <Form {...form}>
      <form id="contract-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contracts.client')}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('contracts.selectClient')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.company_name ? `${client.company_name} (${client.name})` : client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contracts.alias')}</FormLabel>
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
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('contracts.startDate')}</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={(date: Date | undefined) => handleDateChange('start_date', date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('contracts.endDate')}</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={(date: Date | undefined) => handleDateChange('end_date', date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contracts.price')}</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    value={field.value === null ? '' : field.value}
                    onChange={e => field.onChange(e.target.value === '' ? null : parseFloat(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contracts.priceUnit')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('contracts.selectPriceUnit')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hour">{t('contracts.hour')}</SelectItem>
                    <SelectItem value="day">{t('contracts.day')}</SelectItem>
                    <SelectItem value="week">{t('contracts.week')}</SelectItem>
                    <SelectItem value="month">{t('contracts.month')}</SelectItem>
                    <SelectItem value="year">{t('contracts.year')}</SelectItem>
                    <SelectItem value="fixed">{t('contracts.fixed')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="billing_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contracts.billingUnit')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('contracts.selectBillingUnit')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hour">{t('contracts.hour')}</SelectItem>
                    <SelectItem value="day">{t('contracts.day')}</SelectItem>
                    <SelectItem value="week">{t('contracts.week')}</SelectItem>
                    <SelectItem value="month">{t('contracts.month')}</SelectItem>
                    <SelectItem value="year">{t('contracts.year')}</SelectItem>
                    <SelectItem value="fixed">{t('contracts.fixed')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contracts.status')}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || 'active'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('contracts.selectStatus')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">{t('contracts.draft')}</SelectItem>
                  <SelectItem value="active">{t('contracts.active')}</SelectItem>
                  <SelectItem value="completed">{t('contracts.completed')}</SelectItem>
                  <SelectItem value="cancelled">{t('contracts.cancelled')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contracts.notes')}</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ''} />
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
                  {t('contracts.active')}
                </FormLabel>
                <FormDescription>
                  {t('contracts.activeDescription')}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default function ContractsPage() {
  const t = useTranslations();
  const [selectedContract, setSelectedContract] = React.useState<ContractFormValues | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'inactive'>('all');
  
  // TanStack Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    alias: false,
    address: false,
    city: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  
  const { data: contracts, isLoading } = useContracts({ 
    active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined 
  });
  const createContractMutation = useCreateContract();
  const updateContractMutation = useUpdateContract();
  const deleteContractMutation = useDeleteContract();

  // Gérer la fermeture propre du dialogue
  const handleDialogClose = () => {
    // Fermer d'abord le dialogue
    setIsDialogOpen(false);
    
    // Réinitialiser les états après un court délai
    setTimeout(() => {
      setSelectedContract(undefined);
      setIsEditMode(false);
    }, 300);
  };

  const handleSubmit = async (data: ContractFormValues) => {
    try {
      if (isEditMode && selectedContract?.id) {
        await updateContractMutation.mutateAsync({
          id: selectedContract.id,
          contract: data,
        });
      } else {
        await createContractMutation.mutateAsync({
          ...data,
          id: data.id || uuidv4(),
        });
      }
      handleDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  // Traiter les données de contrat pour les adapter à notre interface
  const processContractData = (contract: any): ContractWithRelations => {
    // Extraire les relations et les données de base
    const {
      clients,
      contacts,
      users,
      ...contractData
    } = contract;

    // Construire un objet ContractWithRelations
    return {
      ...contractData,
      clients: clients ? {
        name: clients.name || '',
        company_name: clients.company_name
      } : null,
      contacts: contacts ? {
        first_name: contacts.first_name,
        last_name: contacts.last_name
      } : null,
      users: users ? {
        name: users.name
      } : null
    };
  };

  const handleEdit = (contract: any) => {
    // Créer une copie du contract pour éviter les références partagées
    const contractCopy = JSON.parse(JSON.stringify(contract));
    // Extraire seulement les propriétés du contrat sans les relations
    const { clients, contacts, users, ...contractData } = contractCopy;
    setSelectedContract(contractData);
    setIsEditMode(true);
    
    // Ouvrir le dialogue après un court délai pour éviter les problèmes de rendu
    setTimeout(() => {
      setIsDialogOpen(true);
    }, 50);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('contracts.confirmDelete'))) {
      try {
        await deleteContractMutation.mutateAsync(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddNew = () => {
    setSelectedContract(undefined);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  // Formater la date pour l'affichage
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return '-';
    }
  };

  // Définition des colonnes pour TanStack Table
  const columns = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }: any) => (
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
      cell: ({ row }: any) => (
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
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-4 justify-start font-medium"
          >
            {t('contracts.alias')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: any) => <div className="px-4">{row.getValue("alias") || "-"}</div>,
    },
    {
      id: "client",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-4 justify-start font-medium"
          >
            {t('contracts.client')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: any) => {
        const contract = row.original;
        return (
          <div className="px-4">
            {contract.clients ? (contract.clients.company_name || contract.clients.name) : "-"}
          </div>
        );
      },
      accessorFn: (row: any) => row.clients?.company_name || row.clients?.name || '',
    },
    {
      accessorKey: "start_date",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-4 justify-start font-medium"
          >
            {t('contracts.startDate')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: any) => <div className="px-4">{formatDate(row.getValue("start_date"))}</div>,
    },
    {
      accessorKey: "end_date",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-4 justify-start font-medium"
          >
            {t('contracts.endDate')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: any) => <div className="px-4">{formatDate(row.getValue("end_date"))}</div>,
    },
    {
      accessorKey: "price",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-4 justify-start font-medium"
          >
            {t('contracts.price')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: any) => {
        const price = row.getValue("price");
        const priceUnit = row.original.price_unit;
        return (
          <div className="px-4">
            {price ? `${price} ${priceUnit ? `/ ${priceUnit}` : ''}` : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-4 justify-start font-medium"
          >
            {t('contracts.status')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: any) => {
        const status = row.getValue("status") as string;
        return (
          <div className="px-4">
            {status === 'active' ? (
              <span className="inline-flex items-center rounded-full border border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                {t('contracts.active')}
              </span>
            ) : status === 'completed' ? (
              <span className="inline-flex items-center rounded-full border border-transparent bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                {t('contracts.completed')}
              </span>
            ) : status === 'cancelled' ? (
              <span className="inline-flex items-center rounded-full border border-transparent bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/20 dark:text-rose-300">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-rose-500 dark:bg-rose-400"></span>
                {t('contracts.cancelled')}
              </span>
            ) : status === 'draft' ? (
              <span className="inline-flex items-center rounded-full border border-transparent bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900/20 dark:text-gray-300">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                {t('contracts.draft')}
              </span>
            ) : (
              <span>-</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "active",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-4 justify-start font-medium"
          >
            {t('contracts.active')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: any) => {
        const isActive = Boolean(row.getValue("active"));
        return (
          <div className="px-4">
            {isActive ? (
              <span className="inline-flex items-center rounded-full border border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                {t('contracts.active')}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full border border-transparent bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/20 dark:text-rose-300">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-rose-500 dark:bg-rose-400"></span>
                {t('contracts.inactive')}
              </span>
            )}
          </div>
        )
      },
      filterFn: (row: any, id: string, value: any) => {
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
      cell: ({ row }: any) => {
        const contract = row.original;
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
                <DropdownMenuItem onClick={() => handleEdit(contract)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t('contracts.editContract')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => contract.id && handleDelete(contract.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('contracts.deleteContract')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableHiding: false,
    },
  ], [t]);
  
  // Initialisation de la table
  const table = useReactTable({
    data: contracts || [],
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
      const filteredData = contracts?.filter((contract: any) => {
        return Object.entries(contract)
          .filter(([key]) => key !== "id" && key !== "active" && typeof contract[key as keyof typeof contract] === "string")
          .some(([_, value]) => 
            value && String(value).toLowerCase().includes(globalFilter.toLowerCase())
          );
      });
      
      if (filteredData?.length === 0) {
        // Aucun résultat trouvé
        // Vous pouvez ajouter un message ici si nécessaire
      }
    }
  }, [globalFilter, contracts]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t('contracts.title')}</h1>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Input
                placeholder={t('contracts.searchPlaceholder')}
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
                  {t('contracts.filter')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('contracts.filter')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  {t('contracts.showAll')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                  {t('contracts.showActive')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                  {t('contracts.showInactive')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 gap-1">
                  {t('contracts.columns')}
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
                        {column.id === "alias" ? t('contracts.alias') : 
                         column.id === "client" ? t('contracts.client') : 
                         column.id === "start_date" ? t('contracts.startDate') : 
                         column.id === "end_date" ? t('contracts.endDate') : 
                         column.id === "price" ? t('contracts.price') : 
                         column.id === "status" ? t('contracts.status') : 
                         column.id === "active" ? t('contracts.active') : 
                         column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => handleAddNew()} className="h-9 gap-1" variant="outline">
              <Plus className="h-4 w-4" />
              {t('contracts.addContract')}
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
                        {t('contracts.noContracts')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} {t('contracts.of')}{" "}
                {table.getFilteredRowModel().rows.length} {t('contracts.rowsSelected')}
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
                {isEditMode ? t('contracts.editContract') : t('contracts.addContract')}
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="overflow-y-auto flex-grow px-6 py-4">
            <ContractForm
              key={selectedContract?.id || 'new-contract'} 
              contract={selectedContract}
              onSubmit={handleSubmit}
              onCancel={() => handleDialogClose()}
              isSubmitting={createContractMutation.isPending || updateContractMutation.isPending}
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
              form="contract-form"
              disabled={createContractMutation.isPending || updateContractMutation.isPending}
            >
              {createContractMutation.isPending || updateContractMutation.isPending ? (
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
