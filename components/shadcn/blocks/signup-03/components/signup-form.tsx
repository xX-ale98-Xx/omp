'use client'

import { useActionState } from 'react'
import { signup, SignupState, signUpWithGoogle } from '@/utils/actions/actions'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shadcn/ui/button'
import { Spinner } from '@/components/shadcn/ui/spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/shadcn/ui/field'
import { Input } from '@/components/shadcn/ui/input'
import Link from 'next/link'

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const initialState: SignupState = { message: null, errors: {}, success: null }
  const [state, formAction, pending] = useActionState(signup, initialState)

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crea il tuo account</CardTitle>
          <CardDescription>Registrati con Google o con email</CardDescription>
        </CardHeader>
        <CardContent>
          {state.success ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <p className="text-sm whitespace-pre-line">{state.message}</p>
              <Button variant="outline" asChild>
                <Link href="/login">Vai al Login</Link>
              </Button>
            </div>
          ) : (
            <FieldGroup>
            <Field>
              <form action={signUpWithGoogle}>
                <Button variant="outline" type="submit" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Registrati con Google
                </Button>
              </form>
            </Field>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Oppure continua con
            </FieldSeparator>

            <form action={formAction}>
              <FieldGroup>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="name">Nome</FieldLabel>
                    <Input id="name" name="name" type="text" placeholder="Mario" required />
                    {state.errors?.name && (
                      <p className="mt-1 text-sm text-destructive">{state.errors.name[0]}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="surname">Cognome</FieldLabel>
                    <Input id="surname" name="surname" type="text" placeholder="Rossi" required />
                    {state.errors?.surname && (
                      <p className="mt-1 text-sm text-destructive">{state.errors.surname[0]}</p>
                    )}
                  </Field>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                  {state.errors?.email && (
                    <p className="mt-1 text-sm text-destructive">{state.errors.email[0]}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" required />
                  <FieldDescription>Minimo 6 caratteri.</FieldDescription>
                  {state.errors?.password && (
                    <p className="mt-1 text-sm text-destructive">{state.errors.password[0]}</p>
                  )}
                </Field>

                {state.message && !state.success && (
                  <p className="text-center text-sm text-destructive">{state.message}</p>
                )}

                <Field>
                  <Button type="submit" className="w-full" disabled={pending}>
                    {pending && <Spinner data-icon="inline-start" />}
                    Crea un Account
                  </Button>
                  <FieldDescription className="text-center">
                    Hai già un account? <Link href="/login">Login</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
            </FieldGroup>
          )}
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Continuando, accetti i nostri <a href="#">Termini di Servizio</a> e la{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
