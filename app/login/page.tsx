"use client";

import { useActionState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { login, LoginState } from "../../utils/actions/actions";
import AuthenticationInput from '@/components/authPages/AuthenticationInput'

export default function LoginPage() {
  const initialLoginState: LoginState = { message: null, errors: {} };
  const [loginState, loginAction] = useActionState(login, initialLoginState);
  
  return (
    <div className="flex min-h-screen items-center justify-center  bg-background">
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
          Bentornato!
        </h2>
        <p className="text-center text-sm md:text-base text-gray-500 mb-6">
          Fai il login per continuare sul tuo account
        </p>

        {/* Form */}
        <form className="space-y-4" suppressHydrationWarning>

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
            className="w-full rounded-md md:rounded-lg bg-primary text-sm/6 px-3 py-2 md:text-base/6 md:py-3 md:px-4 
                      font-medium text-white hover:bg-brand-700 transition-all duration-300 ease-in-out focus:outline-brand-700 cursor-pointer"
          >
            Login
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

          {/* Signup */}
          <p className="text-center text-xs md:text-sm text-gray-500">
            Non hai un account?{" "}
            <Link
              href="/signup"
              className="transition-all duration-300 ease-in-out text-brand-main text-xs md:text-sm hover:text-brand-hover focus:outline-brand-main font-medium cursor-pointer"
            >
              Registrati
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
