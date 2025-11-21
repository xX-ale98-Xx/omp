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
      <div className="w-full max-w-md rounded-2xl bg-background-sec p-4 md:p-8 shadow-lg">
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
        <h2 className="text-center text-lg md:text-2xl font-semibold text-foreground">
          Bentornato!
        </h2>
        <p className="text-center text-sm md:text-base text-myGray-text mb-6">
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
            className="w-full rounded-md md:rounded-lg bg-primary text-sm/6 px-3 py-2 md:text-base/6 md:py-3 md:px-4 font-medium text-background-sec 
            hover:bg-primary-hover transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus: ring-primary cursor-pointer"
          >
            Login
          </button>

          {/* Separator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-myGray-border"></div>
            <span className="text-myGray-text text-xs md:text-sm">oppure</span>
            <div className="flex-1 border-t border-myGray-border"></div>
          </div>

          {/* Google login */}
          <button
            type="button"
            className="w-full transition-all duration-300 ease-in-out rounded-md md:rounded-lg border border-myGray-border text-myGray-text 
                      text-sm/6 px-3 py-2 md:text-base/6 md:py-3 md:px-4 flex items-center justify-center gap-2
                      hover:bg-myGray-hover focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
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
          <p className="text-center text-xs md:text-sm text-myGray-text">
            Non hai un account?{" "}
            <Link
              href="/signup"
              className="transition-all duration-300 ease-in-out text-primary text-xs md:text-sm 
              hover:text-primary-hover focus:outline-none focus:border-b-2 focus:border-primary-hover font-medium cursor-pointer"
            >
              Registrati
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
