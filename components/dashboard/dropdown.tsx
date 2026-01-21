'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, Bars3Icon , PowerIcon} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutAction } from '@/utils/actions/actions'

// Tipi TypeScript per le voci del menu
interface UserMenuItem {
  name: string
  href: string
}

const userMenuItems: UserMenuItem[] = [
  { name: 'Profilo', href: '/dashboard/profile' },
  { name: 'Impostazioni', href: '/dashboard/settings' },
  //{ name: 'Logout', href: '/dashboard/logout' },
]

function LogoutItem({ onClose }: { onClose: () => void }) {
  return (
    <form action={ logoutAction } className="w-full" onSubmit={onClose}>
        <button
          type="submit"
          className="hover:bg-brand-background flex h-[48px] w-full grow items-center justify-center gap-2 bg-red-500 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <span className="hidden md:block">Sign Out</span>
        </button>
    </form>
  )
}

export function MenuDropdown() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={clsx(
            'h-[48px] flex items-center gap-2 p-3 text-sm font-medium',
            {
              'bg-primary-hover text-white': open,
              'hover:bg-background-sec hover:text-brand-main hover:font-semibold': !open,
            }
          )}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Bars3Icon className="w-6" />
          <ChevronDownIcon 
            className={clsx('w-4 h-4 transition-transform duration-200', {
              'rotate-180': open,
            })} 
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end" 
        className="w-48 mt-2 border-gray-200 shadow-lg z-[9999]"
      >
        {userMenuItems.map((item) => (
          <DropdownMenuItem 
            key={item.name}
            asChild
          >
            <Link
              href={item.href}
              className={clsx(
                'flex items-center gap-2 text-sm font-medium text-gray-700 w-full',
                {
                  'bg-primary-hover text-white': pathname === item.href,
                  'hover:bg-background-sec hover:text-brand-main hover:font-semibold': pathname !== item.href,
                }
              )}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <LogoutItem onClose={() => setOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// export default function MenuDropdown() {
//   const pathname = usePathname()
//   const [isOpen, setIsOpen] = useState<boolean>(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false)
//       }
//     }

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [isOpen])

//   return (
//     <div ref={dropdownRef} className="relative">
//       {/* Bottone principale dropdown */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={clsx(
//           'flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium',
//           {
//             'bg-brand-main text-white': isOpen,
//             'hover:bg-brand-100 hover:text-brand-main hover:font-semibold': !isOpen,
//           }
//         )}
//         aria-haspopup="true"
//         aria-expanded={isOpen}
//       >
//         <Bars3Icon className="w-6" />
//         <ChevronDownIcon className={clsx('w-4 h-4 transition-transform', {
//           'rotate-180': isOpen,
//         })} />
//       </button>

//       {/* Menu dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[9999] py-1">
//           {userMenuItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={clsx(
//                 'flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700',
//                 {
//                   'bg-brand-main text-white': pathname === item.href,
//                   'hover:bg-brand-100 hover:text-brand-main hover:font-semibold': pathname !== item.href,
//                 }
//               )}
//               onClick={() => setIsOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
