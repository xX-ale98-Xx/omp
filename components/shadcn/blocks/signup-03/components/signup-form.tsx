'use client'

import { useActionState } from 'react'
import { signup, SignupState } from '@/utils/actions/actions'
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
          <CardDescription>Inserisci i tuoi dati per registrarti</CardDescription>
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
            <form action={formAction}>
              <FieldGroup>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="name">Nome</FieldLabel>
                    <Input id="name" name="name" type="text" placeholder="Mario" required />
                    {state.errors?.name && (
                      <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="surname">Cognome</FieldLabel>
                    <Input id="surname" name="surname" type="text" placeholder="Rossi" required />
                    {state.errors?.surname && (
                      <p className="mt-1 text-sm text-red-500">{state.errors.surname[0]}</p>
                    )}
                  </Field>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                  {state.errors?.email && (
                    <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" required />
                  <FieldDescription>Minimo 6 caratteri.</FieldDescription>
                  {state.errors?.password && (
                    <p className="mt-1 text-sm text-red-500">{state.errors.password[0]}</p>
                  )}
                </Field>

                {state.message && !state.success && (
                  <p className="text-center text-sm text-red-500">{state.message}</p>
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
