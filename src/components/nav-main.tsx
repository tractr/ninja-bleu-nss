"use client"

import * as React from "react"
import { LucideIcon, PlusCircleIcon, FileText } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {
  const t = useTranslations()
  
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <div className="px-4 mb-2">
          <Button 
            className="w-full rounded-full bg-gradient-to-r from-[hsl(var(--ninja-blue))] to-[hsl(var(--ninja-blue-light))] text-white hover:text-white transition duration-200 ease-linear shadow-md hover:shadow-lg flex items-center gap-2 justify-center hover:translate-y-[-1px]"
          >
            <div className="bg-black bg-opacity-20 rounded-full p-1 flex items-center justify-center">
              <PlusCircleIcon className="size-4" />
            </div>
            <span>Quick Create</span>
          </Button>
        </div>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild
                tooltip={item.title}
                className={cn(item.isActive && "bg-accent")}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
