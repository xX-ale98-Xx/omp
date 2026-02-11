'use client'

import * as React from 'react'
import {
  Activity,
  BarChart3,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  Settings,
  Store,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { NavMain } from '@/components/shadcn/blocks/dashboard-01/components/nav-main'
import { NavSecondary } from '@/components/shadcn/blocks/dashboard-01/components/nav-secondary'
import { NavUser } from '@/components/shadcn/blocks/dashboard-01/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/shadcn/ui/sidebar'

const data = {
  user: {
    name: 'Utente',
    email: 'utente@esempio.it',
    avatar: '',
  },
  navGroups: [
    {
      label: 'Principale',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Agenda',
          url: '/dashboard/agenda',
          icon: CalendarDays,
        },
        {
          title: 'Pazienti',
          url: '/dashboard/pazienti',
          icon: Users,
        },
      ],
    },
    {
      label: 'Clinica',
      items: [
        {
          title: 'Cartella Clinica',
          url: '/dashboard/cartella-clinica',
          icon: ClipboardList,
        },
        {
          title: 'Tele-riabilitazione',
          url: '/dashboard/teleriabilitazione',
          icon: Activity,
        },
      ],
    },
    {
      label: 'Gestione',
      items: [
        {
          title: 'Fatturazione',
          url: '/dashboard/fatturazione',
          icon: Receipt,
        },
        {
          title: 'Analytics',
          url: '/dashboard/analytics',
          icon: BarChart3,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Marketplace',
      url: '/dashboard/marketplace',
      icon: Store,
    },
    {
      title: 'Formazione',
      url: '/dashboard/formazione',
      icon: GraduationCap,
    },
    {
      title: 'Impostazioni',
      url: '/dashboard/impostazioni',
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <Image
                  src="/OMP_logo.svg"
                  alt="OhMyPhysio"
                  width={20}
                  height={20}
                  className="size-5"
                />
                <span className="text-base font-semibold">OhMyPhysio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.navGroups} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
