'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

// Tipi TypeScript per le voci del menu
interface UserMenuItem {
  name: string
  href: string
}

const userMenuItems: UserMenuItem[] = [
  { name: 'Profilo', href: '/dashboard/profile' },
  { name: 'Impostazioni', href: '/dashboard/settings' },
  { name: 'Logout', href: '/dashboard/logout' },
]

export default function MenuDropdown() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bottone principale dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium',
          {
            'bg-brand-main text-white': isOpen,
            'hover:bg-brand-100 hover:text-brand-main hover:font-semibold': !isOpen,
          }
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Bars3Icon className="w-6" />
        <ChevronDownIcon className={clsx('w-4 h-4 transition-transform', {
          'rotate-180': isOpen,
        })} />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[9999] py-1">
          {userMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700',
                {
                  'bg-brand-main text-white': pathname === item.href,
                  'hover:bg-brand-100 hover:text-brand-main hover:font-semibold': pathname !== item.href,
                }
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
