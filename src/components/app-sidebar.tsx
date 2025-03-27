"use client"

import * as React from "react"
import {
  ChevronUp,
  FileText,
  Home,
  LogOut,
  Monitor,
  SettingsIcon,
  User2,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useCurrentUser } from "@/hooks/use-current-user"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import supabaseClient from "@/lib/supabase-client"
import { SettingsModal } from "@/components/settings-modal"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useCurrentUser();
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const t = useTranslations();

  const _logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert(error.message);
    }

    window.location.reload();
  };

  const navMainItems = [
    {
      title: t('navigation.home'),
      url: "/",
      icon: Home,
      isActive: pathname === "/"
    },
    {
      title: t('navigation.clients'),
      url: "/clients",
      icon: Users,
      isActive: pathname === "/clients"
    },
    {
      title: t('navigation.contracts'),
      url: "/contracts",
      icon: FileText,
      isActive: pathname === "/contracts"
    },
  ];

  const navSecondaryItems = [
    {
      title: t('actions.openSettings'),
      onClick: () => setShowSettings(true),
      icon: SettingsIcon,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="flex items-center">
            <Image src="/images/logo-180x180.webp" alt={t('common.logo')} width={50} height={50} />
            <span className="ml-3 font-bold text-ninja-blue">Admin NinjaBleu</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton data-testid="user-button">
                    <User2 />
                    {currentUser?.data?.email ? (
                      <span className="h-6 inline-flex items-center text-sm truncate flex-shrink">
                        {currentUser?.data?.email}
                      </span>
                    ) : (
                      <Skeleton className="h-6 w-full" />
                    )}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem onClick={_logout}>
                    <LogOut className="h-[1.2rem] w-[1.2rem]" />
                    <span data-testid="logout-button">{t('actions.logout')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSettings(true)}>
                    <Monitor className="h-[1.2rem] w-[1.2rem]" />
                    <span>{t('actions.openSettings')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>

          <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
