'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { Loader2, Trash2, Edit, Plus, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { useClients, useCreateClient, useUpdateClient, useDeleteClient } from '@/lib/api/queries';
import LayoutSidebar from '@/components/layout-sidebar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    if (!clients || !sortColumn || !sortDirection) return clients;
    
    return [...clients].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      // Gestion des valeurs nulles
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === null) return sortDirection === 'asc' ? -1 : 1;
      
      // Comparaison en fonction du type
      if (typeof aValue === 'boolean') {
        return sortDirection === 'asc' 
          ? (aValue === bValue ? 0 : aValue ? -1 : 1)
          : (aValue === bValue ? 0 : aValue ? 1 : -1);
      }
      
      // Comparaison de chaînes
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Comparaison numérique par défaut
      return sortDirection === 'asc' 
        ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
        : (aValue < bValue ? 1 : aValue > bValue ? -1 : 0);
    });
  }, [clients, sortColumn, sortDirection]);

  return (
    <LayoutSidebar>
      <div className="container py-8 mx-auto">
        <Card className="border-none shadow-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">{t('clients.title')}</CardTitle>
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                {t('clients.addNew')}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-all"
                checked={showAll}
                onCheckedChange={() => setShowAll(!showAll)}
              />
              <label htmlFor="show-all" className="text-sm text-muted-foreground cursor-pointer">
                {t('clients.showAll')}
              </label>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : sortedClients?.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">{t('clients.noClients')}</p>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <SortableHeader
                          column="name"
                          label={t('clients.name')}
                          currentSort={sortColumn}
                          currentDirection={sortDirection}
                          onSort={handleSort}
                        />
                      </TableHead>
                      <TableHead>
                        <SortableHeader
                          column="company_name"
                          label={t('clients.companyName')}
                          currentSort={sortColumn}
                          currentDirection={sortDirection}
                          onSort={handleSort}
                        />
                      </TableHead>
                      <TableHead>
                        <SortableHeader
                          column="city"
                          label={t('clients.city')}
                          currentSort={sortColumn}
                          currentDirection={sortDirection}
                          onSort={handleSort}
                        />
                      </TableHead>
                      <TableHead>
                        <SortableHeader
                          column="active"
                          label={t('clients.status')}
                          currentSort={sortColumn}
                          currentDirection={sortDirection}
                          onSort={handleSort}
                        />
                      </TableHead>
                      <TableHead className="text-right">
                        {t('actions.actions')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedClients?.map(client => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="font-medium">{client.name}</div>
                          {client.alias && (
                            <div className="text-sm text-muted-foreground">{client.alias}</div>
                          )}
                        </TableCell>
                        <TableCell>{client.company_name || '-'}</TableCell>
                        <TableCell>
                          {client.city || '-'}
                          {client.province && `, ${client.province}`}
                        </TableCell>
                        <TableCell>
                          {client.active ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                              {t('clients.active')}
                            </span>
                          ) : (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
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
    </LayoutSidebar>
  );
}
