'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { login, LoginState } from '@/utils/actions/actions'
import AuthenticationInput from '@/components/authPages/AuthenticationInput'

export default function LoginPage() {
  const initialLoginState: LoginState = { message: null, errors: {} }
  const [loginState, loginAction] = useActionState(login, initialLoginState)

  return (
    <div className="bg-background box-border flex min-h-screen w-full flex-col items-center justify-center overflow-auto p-5 md:p-8">
      <div className="bg-background-sec border-myGray-border box-border flex w-full max-w-sm flex-col items-center justify-between rounded-2xl border-1 p-8 shadow-lg md:max-w-md md:px-16 md:py-12">
        <div className="mb-4 flex w-11/12 flex-col gap-4 md:mb-6 md:w-full md:gap-8">
          {/* Logo placeholder */}
          <div className="w-full p-2 md:p-3">
            <div className="relative flex h-8 w-full flex-none items-center justify-center md:h-10">
              <Image src="/OMP_logo.svg" alt="Logo" fill className="object-contain" />
            </div>
          </div>

          {/* Form */}
          <form className="w-full space-y-4" suppressHydrationWarning>
            {/* Title */}
            <h2 className="text-foreground text-center text-lg font-semibold md:text-2xl">
              Bentornato!
            </h2>
            <p className="text-myGray-text mb-6 text-center text-sm md:text-base">
              Fai il login per continuare sul tuo account
            </p>

            {/* Email */}
            <AuthenticationInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              errors={loginState?.errors?.email}
            />

            {/* Password */}
            <AuthenticationInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              errors={loginState?.errors?.password}
            />

            {/* Login button */}
            <button
              formAction={loginAction}
              className="bg-primary text-background-sec hover:bg-primary-hover focus: ring-primary w-full cursor-pointer rounded-md px-3 py-2 text-sm/6 font-medium transition-all duration-300 ease-in-out focus:ring-2 focus:outline-none md:rounded-lg md:px-4 md:py-3 md:text-base/6"
            >
              Login
            </button>

            {/* Separator */}
            <div className="flex items-center gap-2">
              <div className="border-myGray-border flex-1 border-t"></div>
              <span className="text-myGray-text text-xs md:text-sm">oppure</span>
              <div className="border-myGray-border flex-1 border-t"></div>
            </div>

            {/* Google login */}
            <button
              type="button"
              className="border-myGray-border text-myGray-text hover:bg-myGray-hover focus:ring-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm/6 transition-all duration-300 ease-in-out focus:ring-2 focus:outline-none md:rounded-lg md:px-4 md:py-3 md:text-base/6"
            >
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                width={20}
                height={20}
              />
              Continua con Google
            </button>
          </form>
        </div>

        {/* Signup */}
        <p className="text-myGray-text text-center text-xs md:text-sm">
          Non hai un account?{' '}
          <Link
            href="/signup"
            className="text-primary hover:text-primary-hover focus:border-primary-hover cursor-pointer text-xs font-medium transition-all duration-300 ease-in-out focus:border-b-2 focus:outline-none md:text-sm"
          >
            Registrati
          </Link>
        </p>
      </div>
    </div>
  )
}
