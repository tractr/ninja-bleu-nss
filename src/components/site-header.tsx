import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const t = useTranslations()
  const pathname = usePathname()
  
  // Déterminer le titre en fonction du chemin actuel
  let title = t('navigation.home')
  
  if (pathname === '/') {
    title = t('navigation.home')
  } else if (pathname.startsWith('/clients')) {
    title = t('navigation.clients')
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 lg:px-6 rounded-t-md">
      <div className="flex items-center gap-2 lg:gap-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-base font-normal">{title}</h1>
      </div>
    </header>
  )
}
