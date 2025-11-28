import Image from 'next/image'
import Link from 'next/link'
import MenuDropdown from './dropdown'

export default function Header() {
  return (
    <div className="border-myGray-border flex h-16 w-full flex-row items-center justify-between overflow-hidden border-b pr-6 pl-3 md:pr-8 md:pl-4">
      <Link href="/">
        <div className="relative hidden aspect-[631/211] h-8 md:block">
          <Image src="/OMP_logo.svg" alt="Logo" fill className="object-contain" />
        </div>
      </Link>
      <div className="relative flex w-auto flex-row items-center gap-2">
        <div className="bg-brand-main hover:bg-brand-600 relative rounded-xl px-4 py-2 text-white">
          Fai cose
        </div>
        <MenuDropdown />
        <div className="relative h-10 w-10 rounded-full bg-gray-500" />
      </div>
    </div>
  )
}
