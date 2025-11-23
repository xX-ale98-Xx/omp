import NavLinks from './nav-links'
import { PowerIcon } from '@heroicons/react/24/outline'

export default function SideNav() {
  return (
    <div className="border-myGray-border flex h-full flex-col px-3 py-4 md:border-r md:px-4 md:py-6">
      <h1 className={`mb-4 hidden text-xl font-semibold md:block md:text-2xl`}>Dashboard</h1>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />

        {/* A cosa serve sto div? */}
        <div className="bg-myRed-100 hidden h-auto w-full grow rounded-md md:block"></div>

        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="hover:bg-brand-background flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}
