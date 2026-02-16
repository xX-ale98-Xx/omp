'use client'

import * as React from 'react'
import {
  CalendarDays,
  Dumbbell,
  Eye,
  LayoutDashboard,
  MessageCircle,
  Receipt,
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
      label: 'Panoramica',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: 'Clinica',
      items: [
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
        {
          title: 'Chat',
          url: '/dashboard/chat',
          icon: MessageCircle,
        },
        {
          title: 'Terapia Attiva',
          url: '/dashboard/terapia-attiva',
          icon: Dumbbell,
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
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Area Paziente Demo',
      url: '/dashboard/area-paziente',
      icon: Eye,
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
