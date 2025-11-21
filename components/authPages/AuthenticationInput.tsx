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
            <div className="flex items-center transition-all duration-300 ease-in-out rounded-md md:rounded-lg border border-myGray-border
                  hover:bg-myGray-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-primary has-[input:focus-within]:bg-transparent">
              <input
                suppressHydrationWarning
                id={id}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                aria-describedby={`${name}-error`}
                className="block min-w-0 grow  text-sm/6 py-2 px-3
                          text-foreground placeholder:text-myGray-text focus:outline-none md:text-base/6 md:py-3 md:px-4"
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