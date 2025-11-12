'use client'

type AuthInputProps = {
  id: string,
  name: string, 
  type: string,
  placeholder: string,
  errors?: string[]
};

// How to use:
// <AuthInput
//   id="name"
//   name="name"
//   type="text"
//   placeholder="Nome"
//   errors={signupState.errors?.name}
// />

export default function AuthInput({id, name, type, placeholder, errors}: AuthInputProps){
    return (
        <div className="space-y-1">
            <div className="flex items-center transition-all duration-300 ease-in-out rounded-md md:rounded-lg bg-white outline-1 
                  -outline-offset-1 outline-gray-300 has-[input:focus-within]:bg-transparent hover:bg-gray-100 hover:border-gray-300
                  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-brand-main"
            >
              <input
                suppressHydrationWarning
                id={id}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                aria-describedby={`${name}-error`}
                className="block min-w-0 grow  text-sm/6 py-2 px-3
                          text-gray-900 placeholder:text-gray-400 focus:outline-none md:text-base/6 md:py-3 md:px-4"
              />
            </div>

            <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
              {errors?.map((error) => (
                  <p className="mt-1 text-xs text-red-500" key={error}>{error}</p>
                ))
              }
            </div>
        </div>
    )
}