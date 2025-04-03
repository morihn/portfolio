"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";

export function TeamSwitcher({
                               teams,
                             }: {
  teams: {
    name: string
    logo: string // Assuming this is a URL
    plan: string
    url: string
  }[]
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <a href={activeTeam.url} target="_blank">

          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg">
              {/* Use an <img> tag for the logo */}
              <Image src={activeTeam.logo} alt={activeTeam.name} className="" height="100" width="100"/>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeTeam.name}</span>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </div>
          </SidebarMenuButton>


        </a>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}