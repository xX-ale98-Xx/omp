import Image from "next/image";

import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-100">
      <div className="w-full max-w-sm md:max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo placeholder */}
        <div className="flex justify-center">
          <div className="relative w-full h-10 mb-8 mt-4">
            <Image
              src="/OMP_logo.svg"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-black-text">
          Bentornato!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Fai il login per continuare sul tuo account
        </p>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex items-center rounded-md md:rounded-lg bg-white outline-1 -outline-offset-1 outline-gray-300 
          has-[input:focus-within]:outline-2 
          has-[input:focus-within]:-outline-offset-2
          has-[input:focus-within]:outline-brand-main">
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="block min-w-0 grow  text-sm/6 py-2 px-3
                        text-gray-900 placeholder:text-gray-400 focus:outline-none md:text-base/6 md:py-3 md:px-4"
            />
          </div>

          <div className="flex items-center rounded-md md:rounded-lg bg-white outline-1 -outline-offset-1 outline-gray-300 
          has-[input:focus-within]:outline-2 
          has-[input:focus-within]:-outline-offset-2
          has-[input:focus-within]:outline-brand-main">
            <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            className="block min-w-0 grow py-2 px-3 text-sm/6 md:text-base/6 md:py-3 md:px-4 text-gray-900 placeholder:text-gray-400 
                      focus:outline-none"
            />
          </div>

          {/* Login button */}
          <button
            formAction={login}
            className="w-full rounded-md md:rounded-lg bg-brand-main text-sm/6 px-3 py-2 md:text-base/6 md:py-3 md:px-4 
                      font-medium text-white hover:bg-brand-700 transition cursor-pointer"
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
            className="w-full rounded-md md:rounded-lg border text-gray-500 border-gray-border 
                      text-sm/6 px-3 py-2 md:text-base/6 md:py-3 md:px-4 flex items-center justify-center gap-2
                      hover:bg-gray-100 hover:border-gray-300 transition cursor-pointer"
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
            <button
              formAction={signup}
              className="text-brand-main text-xs md:text-sm hover:text-brand-hover font-medium cursor-pointer"
            >
              Registrati
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
