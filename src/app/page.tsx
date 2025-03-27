'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import DashboardLayout from '@/components/dashboard-layout';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, ChartPieIcon, FileText, Settings, TrendingDown, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';

// Exemple de données pour le tableau
const tableData = [
  {
    id: 1,
    header: "Rapport mensuel",
    type: "Rapport",
    status: "Done",
    target: "Q2 2024",
    limit: "30 Juin",
    reviewer: "John Doe"
  },
  {
    id: 2,
    header: "Analyse clients",
    type: "Analyse",
    status: "In Progress",
    target: "Q2 2024",
    limit: "15 Juillet",
    reviewer: "Jane Smith"
  },
  {
    id: 3,
    header: "Prévisions ventes",
    type: "Prévision",
    status: "Done",
    target: "Q3 2024",
    limit: "1 Août",
    reviewer: "Robert Johnson"
  },
  {
    id: 4,
    header: "Plan marketing",
    type: "Plan",
    status: "In Progress",
    target: "Q3 2024",
    limit: "15 Août",
    reviewer: "Sarah Williams"
  },
  {
    id: 5,
    header: "Étude de marché",
    type: "Étude",
    status: "Pending",
    target: "Q3 2024",
    limit: "30 Août",
    reviewer: "Michael Brown"
  }
];

export default function HomePage() {
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const t = useTranslations('home');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Cartes de statistiques */}
        <div className="*:data-[slot=card]:shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Total Clients</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                1,234
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <TrendingUp className="size-3" />
                  +12.5%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Croissance ce mois-ci <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Comparé au mois précédent
              </div>
            </CardFooter>
          </Card>
          
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Nouveaux Clients</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                89
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <TrendingDown className="size-3" />
                  -5.2%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Baisse légère <TrendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Acquisition à améliorer
              </div>
            </CardFooter>
          </Card>
          
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Clients Actifs</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                876
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <TrendingUp className="size-3" />
                  +8.7%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Bonne rétention <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Engagement en hausse
              </div>
            </CardFooter>
          </Card>
          
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Taux de Conversion</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                4.8%
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <TrendingUp className="size-3" />
                  +1.2%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Performance stable <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Conforme aux prévisions
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Graphique interactif */}
        <div className="px-0 lg:px-0">
          <ChartAreaInteractive />
        </div>

        {/* Tableau de données */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold">Rapports récents</h2>
            <p className="text-sm text-muted-foreground">Liste des derniers rapports et analyses</p>
          </div>
          <DataTable data={tableData} />
        </div>

        {/* Cartes de navigation */}
        <div className="*:data-[slot=card]:shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Clients</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Gestion des clients
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <Users className="size-3" />
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Gérez vos clients et leurs informations
              </div>
              <div className="mt-2">
                <Button asChild variant="outline" className="text-sm flex items-center justify-between w-full gap-1 hover:bg-blue-50 rounded-full">
                  <Link href="/clients">
                    <span>Voir tous les clients</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Statistiques</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Analyse des données
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <BarChart className="size-3" />
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Visualisez les tendances et performances
              </div>
              <div className="mt-2">
                <Button asChild variant="outline" className="text-sm flex items-center justify-between w-full gap-1 hover:bg-blue-50 rounded-full">
                  <Link href="#">
                    <span>Analyser les tendances</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Rapports</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Rapports mensuels
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <BarChart className="size-3" />
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Accédez aux rapports mensuels
              </div>
              <div className="mt-2">
                <Button asChild variant="outline" className="text-sm flex items-center justify-between w-full gap-1 hover:bg-blue-50 rounded-full">
                  <Link href="#">
                    <span>Voir l'historique</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Paramètres</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Configuration
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <Settings className="size-3" />
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Configurez votre application
              </div>
              <div className="mt-2">
                <Button asChild variant="outline" className="text-sm flex items-center justify-between w-full gap-1 hover:bg-blue-50 rounded-full">
                  <Link href="#">
                    <span>Gérer les paramètres</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
