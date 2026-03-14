import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/shadcn/blocks/login-03/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <Image src="/OMP-Favicon-Light.svg" alt="OhMyPhysio" width={24} height={24} className="rounded-md dark:hidden" />
          <Image src="/OMP-Favicon-Dark.svg" alt="OhMyPhysio" width={24} height={24} className="hidden rounded-md dark:block" />
          OhMyPhysio!
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
