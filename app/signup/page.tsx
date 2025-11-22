'use client'

import { useActionState, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signup, SignupState } from '@/utils/actions/actions'
import SignupPopup from '@/components/authPages/SignupPopup'
import AuthenticationInput from '@/components/authPages/AuthenticationInput'

export default function SignupPage() {
  const initialSignupState: SignupState = { success: null, message: null, errors: {} }
  const [signupState, signupAction, isPendingSignup] = useActionState(signup, initialSignupState)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    if (signupState.success === true) {
      setPopupType('success')
      setShowPopup(true)
    } else if (
      signupState.success === false &&
      signupState.message &&
      !signupState.errors?.email &&
      !signupState.errors?.password
    ) {
      // errori di processo (non validazione)
      setPopupType('error')
      setShowPopup(true)
    }
  }, [signupState])

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      {/* Popup for comunicating to user the state of the signup action*/}
      {showPopup && (
        <SignupPopup type={popupType} message={signupState.message} setShowPopup={setShowPopup} />
      )}

      <div className="bg-background-sec w-full max-w-md rounded-2xl p-4 shadow-lg md:p-8">
        {/* Logo placeholder */}
        <div className="flex justify-center">
          <div className="relative mt-4 mb-8 h-8 w-full md:h-10">
            <Image src="/OMP_logo.svg" alt="Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-foreground text-center text-lg font-semibold md:text-2xl">
          Benvenuto!
        </h2>
        <p className="text-myGray-text mb-6 text-center text-sm md:text-base">
          Registrati per iniziare a usare il tuo account
        </p>

        {/* Form */}
        <form className="space-y-4" suppressHydrationWarning>
          {/* Name */}
          <AuthenticationInput
            id="name"
            name="name"
            type="text"
            placeholder="Nome"
            errors={signupState.errors?.name}
          />

          {/* Surname */}
          <AuthenticationInput
            id="surname"
            name="surname"
            type="text"
            placeholder="Cognome"
            errors={signupState.errors?.surname}
          />

          {/*Email*/}
          <AuthenticationInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            errors={signupState.errors?.email}
          />

          {/*Password*/}
          <AuthenticationInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            errors={signupState.errors?.password}
          />

          {/* Signup button */}
          <button
            formAction={signupAction}
            className="bg-primary text-background-sec hover:bg-primary-hover focus: ring-primary w-full cursor-pointer rounded-md px-3 py-2 text-sm/6 font-medium transition-all duration-300 ease-in-out focus:ring-2 focus:outline-none md:rounded-lg md:px-4 md:py-3 md:text-base/6"
          >
            {isPendingSignup ? 'Registrazione in corso...⏳' : 'Registrati'}
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

          {/* Login link */}
          <p className="text-myGray-text text-center text-xs md:text-sm">
            Hai già un account?{' '}
            <Link
              href="/login"
              className="text-primary hover:text-primary-hover focus:border-primary-hover cursor-pointer text-xs font-medium transition-all duration-300 ease-in-out focus:border-b-2 focus:outline-none md:text-sm"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
