'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Moon, SlidersHorizontal, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Separator } from '@/components/shadcn/ui/separator'
import { SidebarTrigger } from '@/components/shadcn/ui/sidebar'
import { Button } from '@/components/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { useSensitiveData } from '@/providers/sensitive-data-provider'

export function SiteHeader() {
  const { hidden, toggleHidden } = useSensitiveData()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <header className="bg-background sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">
          <span className="text-primary">OhMy</span>Physio
        </h1>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Impostazioni rapide">
                <SlidersHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Impostazioni rapide</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => { e.preventDefault(); toggleHidden() }}>
                <div className="flex items-center gap-3">
                  {hidden ? <EyeOff className="size-4 shrink-0" /> : <Eye className="size-4 shrink-0" />}
                  <div>
                    <p className="text-sm font-medium">Dati sensibili</p>
                    <p className="text-muted-foreground text-xs">{hidden ? 'Nascosti' : 'Visibili'}</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => { e.preventDefault(); if (mounted) setTheme(isDark ? 'light' : 'dark') }}
              >
                <div className="flex items-center gap-3">
                  {isDark ? <Moon className="size-4 shrink-0" /> : <Sun className="size-4 shrink-0" />}
                  <div>
                    <p className="text-sm font-medium">Tema</p>
                    <p className="text-muted-foreground text-xs">{isDark ? 'Scuro' : 'Chiaro'}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
