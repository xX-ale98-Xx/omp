import NavLinks from './nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:border-r border-gray-border md:px-4 md:py-6">
      <h1 className={`font-semibold mb-4 text-xl hidden md:text-2xl md:block`}>
        Dashboard
      </h1> 
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        {/* A cosa serve sto div? */}
        <div className="hidden bg-red-400 h-auto w-full grow rounded-md md:block"></div>

        <form action="/auth/signout" method="post">
          <button type="submit" className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-brand-background md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
          </button>
        </form>

      </div>
    </div>
  );
}