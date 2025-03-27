"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { useCurrentUser } from "@/hooks/use-current-user"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const currentUser = useCurrentUser()
  const sidebarOpen = currentUser.data?.id || currentUser.isLoading ? undefined : false

  return (
    <SidebarProvider open={sidebarOpen}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 rounded-md">
            <div className="flex flex-col gap-3 py-3 md:gap-4 md:py-4">
              <div className="px-4 lg:px-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
