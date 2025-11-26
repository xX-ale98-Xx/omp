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
    <div className="bg-background box-border flex min-h-dvh w-full flex-col items-center justify-center overflow-auto p-5 md:p-8">
      {/* Popup for comunicating to user the state of the signup action*/}
      {showPopup && (
        <SignupPopup type={popupType} message={signupState.message} setShowPopup={setShowPopup} />
      )}

      <div className="bg-background-sec border-myGray-border box-border flex w-full max-w-sm flex-col items-center justify-between rounded-2xl border-1 px-8 py-6 shadow-lg md:max-w-md md:px-12 md:py-10">
        <div className="mb-4 flex max-w-11/12 flex-col items-center justify-start gap-2 md:mb-6 md:w-full md:gap-4">
          {/* Logo placeholder */}
          <div className="w-full p-2 md:p-3">
            <div className="relative flex h-8 w-full flex-none items-center justify-center md:h-10">
              <Image src="/OMP_logo.svg" alt="Logo" fill className="object-contain" />
            </div>
          </div>

          {/* Form */}
          <form className="w-full space-y-1 md:space-y-2" suppressHydrationWarning>
            {/* Title */}
            <h2 className="text-foreground text-center text-lg font-semibold md:text-2xl">
              Benvenuto!
            </h2>
            <p className="text-myGray-text mb-6 text-center text-sm md:text-base">
              Registrati per iniziare a usare il tuo account
            </p>

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
            <div className="mt-2 mb-3 flex items-center gap-4 md:mt-4 md:mb-5">
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
      </div>
    </div>
  )
}
