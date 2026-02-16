import { AppSidebar } from '@/components/shadcn/blocks/dashboard-01/components/app-sidebar'
import { SiteHeader } from '@/components/shadcn/blocks/dashboard-01/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/shadcn/ui/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="max-h-svh overflow-y-auto">
        <SiteHeader />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
