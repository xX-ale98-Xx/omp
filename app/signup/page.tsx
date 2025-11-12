"use client";

import { useActionState, useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { signup, SignupState } from "@/utils/actions/actions";
import SignupPopup from './components/SignupPopup'
import AuthenticationInput from './components/AuthenticationInput'

export default function SignupPage() {
  const initialSignupState: SignupState = { success: null, message: null, errors: {} };
  const [signupState, signupAction, isPendingSignup] = useActionState(signup, initialSignupState);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);


  useEffect(() => {
  if (signupState.success === true) {
    setPopupType("success");
    setShowPopup(true);
  } else if (signupState.success === false && signupState.message && !signupState.errors?.email && !signupState.errors?.password) {
    // errori di processo (non validazione)
    setPopupType("error");
    setShowPopup(true);
  }
}, [signupState]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-100">

      {/* Popup for comunicating to user the state of the signup action*/}
      {showPopup && (
        <SignupPopup
          type={popupType}
          message={signupState.message}
          setShowPopup={setShowPopup}
        />
      )}

      <div className="w-full max-w-md rounded-2xl bg-white p-4 md:p-8 shadow-lg">
        {/* Logo placeholder */}
        <div className="flex justify-center">
          <div className="relative w-full h-8 md:h-10 mb-8 mt-4">
            <Image
              src="/OMP_logo.svg"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg md:text-2xl font-semibold text-black-text">
          Benvenuto!
        </h2>
        <p className="text-center text-sm md:text-base text-gray-500 mb-6">
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
            className="w-full transition-all duration-300 ease-in-out rounded-md md:rounded-lg bg-brand-main text-sm/6 px-3 py-2 md:text-base/6 md:py-3 md:px-4 
                      font-medium text-white hover:bg-brand-700 focus:outline-brand-700 cursor-pointer"
          >
            {isPendingSignup ? 'Registrazione in corso...⏳' : 'Registrati'}
          </button>

          {/* Separator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-gray-border"></div>
            <span className="text-gray-500 text-xs md:text-sm">oppure</span>
            <div className="flex-1 border-t border-gray-border"></div>
          </div>

          {/* Google login */}
          <button
            type="button"
            className="w-full transition-all duration-300 ease-in-out rounded-md md:rounded-lg border text-gray-500 border-gray-border 
                      text-sm/6 px-3 py-2 md:text-base/6 md:py-3 md:px-4 flex items-center justify-center gap-2
                      hover:bg-gray-100 hover:border-gray-300 focus:outline-brand-main cursor-pointer"
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
          <p className="text-center text-xs md:text-sm text-gray-500">
            Hai già un account?{" "}
            <Link
              href="/login"
              className="transition-all duration-300 ease-in-out text-brand-main text-xs md:text-sm hover:text-brand-hover focus:outline-brand-main font-medium cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
