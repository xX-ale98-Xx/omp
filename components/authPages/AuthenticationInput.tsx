'use client'

type AuthInputProps = {
  id: string
  name: string
  type: string
  placeholder: string
  errors?: string[]
}

// How to use:
// <AuthInput
//   id="name"
//   name="name"
//   type="text"
//   placeholder="Nome"
//   errors={signupState.errors?.name}
// />

export default function AuthInput({ id, name, type, placeholder, errors }: AuthInputProps) {
  return (
    <div className="space-y-1">
      <div className="border-myGray-border hover:bg-myGray-hover focus-within:ring-primary flex items-center rounded-md border transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:outline-none has-[input:focus-within]:bg-transparent md:rounded-lg">
        <input
          suppressHydrationWarning
          id={id}
          name={name}
          type={type}
          required
          placeholder={placeholder}
          aria-describedby={`${name}-error`}
          className="text-foreground placeholder:text-myGray-text block min-w-0 grow px-3 py-2 text-sm/6 focus:outline-none md:px-4 md:py-3 md:text-base/6"
        />
      </div>

      <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
        {errors?.map((error) => (
          <p className="mt-1 text-xs text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
    </div>
  )
}
