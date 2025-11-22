import SideNav from '@/components/dashboard/sidenav'
import Header from '@/components/dashboard/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6 md:px-4 md:py-6">{children}</div>
      </div>
    </div>
  )
}
