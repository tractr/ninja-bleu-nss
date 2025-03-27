'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { Loader2, Trash2, Edit, Plus, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { useClients, useCreateClient, useUpdateClient, useDeleteClient } from '@/lib/api/queries';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          name="payment_terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('clients.paymentTerms')}</FormLabel>
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
            name="discount_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.discountAmount')}</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    value={field.value === null ? '' : field.value}
                    onChange={(e) => {
                      const value = e.target.value === '' ? null : parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="electronic_payment_discount_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('clients.electronicPaymentDiscountPercent')}</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    value={field.value === null ? '' : field.value}
                    onChange={(e) => {
                      const value = e.target.value === '' ? null : parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
                <FormLabel>{t('clients.active')}</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
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
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('actions.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Composant pour le tri des colonnes
type SortDirection = 'asc' | 'desc' | null;
type SortableColumn = 'name' | 'company_name' | 'city' | 'active';

interface SortableHeaderProps {
  column: SortableColumn;
  label: string;
  currentSort: SortableColumn | null;
  currentDirection: SortDirection;
  onSort: (column: SortableColumn) => void;
}

function SortableHeader({ column, label, currentSort, currentDirection, onSort }: SortableHeaderProps) {
  return (
    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => onSort(column)}>
      <span>{label}</span>
      {currentSort === column ? (
        currentDirection === 'asc' ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      )}
    </div>
  );
}

export default function ClientsPage() {
  const t = useTranslations();
  const [showAll, setShowAll] = React.useState(true);
  const [selectedClient, setSelectedClient] = React.useState<ClientFormValues | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [sortColumn, setSortColumn] = React.useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  
  const { data: clients, isLoading } = useClients({ active: showAll ? undefined : true });
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

  const handleSubmit = async (data: ClientFormValues) => {
    try {
      if (selectedClient?.id) {
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
      setIsDialogOpen(false);
      setSelectedClient(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (client: ClientFormValues) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
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
    setIsDialogOpen(true);
  };

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Fonction pour trier les clients
  const sortedClients = React.useMemo(() => {
    if (!clients) return [];
    
    return [...clients].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      const direction = sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      }

      if (aValue === bValue) return 0;
      return aValue < bValue ? -1 * direction : 1 * direction;
    });
  }, [clients, sortColumn, sortDirection]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t('clients.title')}</h1>
            <p className="text-muted-foreground">Gérez vos clients et leurs informations</p>
          </div>
          <Button onClick={() => handleAddNew()} className="gap-1">
            <Plus className="h-4 w-4" />
            {t('clients.addClient')}
          </Button>
        </div>
        
        <Card className="shadow-sm overflow-hidden border bg-card">
          <CardHeader className="px-6 py-4 border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{t('clients.list')}</CardTitle>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      {t('clients.filter')}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowAll(true)}>
                      {t('clients.showAll')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowAll(false)}>
                      {t('clients.showActive')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : sortedClients?.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                {t('clients.noClients')}
              </div>
            ) : (
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <SortableHeader
                        column="name"
                        label={t('clients.name')}
                        currentSort={sortColumn}
                        currentDirection={sortDirection}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        column="company_name"
                        label={t('clients.companyName')}
                        currentSort={sortColumn}
                        currentDirection={sortDirection}
                        onSort={handleSort}
                      />
                      <SortableHeader
                        column="city"
                        label={t('clients.city')}
                        currentSort={sortColumn}
                        currentDirection={sortDirection}
                        onSort={handleSort}
                      />
                      <TableHead>{t('clients.status')}</TableHead>
                      <TableHead className="text-right">{t('actions.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedClients.map(client => (
                      <TableRow key={client.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.company_name || '-'}</TableCell>
                        <TableCell>{client.city || '-'}</TableCell>
                        <TableCell>
                          {client.active ? (
                            <span className="inline-flex items-center rounded-full border border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
                              {t('clients.active')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-transparent bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/20 dark:text-rose-300">
                              {t('clients.inactive')}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(client)}
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(client.id)}
                              disabled={deleteClientMutation.isPending}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedClient ? t('clients.editClient') : t('clients.addClient')}
            </DialogTitle>
          </DialogHeader>
          <ClientForm
            client={selectedClient}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            isSubmitting={createClientMutation.isPending || updateClientMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
