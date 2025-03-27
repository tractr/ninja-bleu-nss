'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import DashboardLayout from '@/components/dashboard-layout';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const t = useTranslations('home');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
            <span className={userLoading ? 'opacity-0' : 'opacity-100'}>
              {t('welcome', {
                email: currentUser?.email || 'john.doe@example.com',
              })}
            </span>
            {userLoading && <Skeleton className="absolute inset-0" />}
          </h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
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
                <Button asChild size="sm" className="gap-1">
                  <Link href="/clients">
                    Accéder aux clients
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
                <Button asChild size="sm" variant="outline" className="gap-1">
                  <Link href="#">
                    Bientôt disponible
                    <TrendingUp className="h-4 w-4" />
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
