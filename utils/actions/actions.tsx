'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const FormLoginSchema = z.object({
  email: z.email({ message: 'Inserire una email valida.' }),
  password: z.string().min(6, { message: 'La password deve essere di almeno 6 caratteri.' }),
})

export type LoginState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

export async function login(prevState: LoginState, formData: FormData) {
  const supabase = await createClient()

  // Estraggo valori come stringhe sicure
  const email = formData.get('email')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  // Validazione dei campi
  const validatedFields = FormLoginSchema.safeParse({ email, password })

  if (!validatedFields.success) {
    const { fieldErrors } = validatedFields.error.flatten()

    return {
      errors: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
      message: 'Formato email o password non validi',
    }
  }

  // Dati validati
  const { email: validEmail, password: validPassword } = validatedFields.data

  // Login con Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email: validEmail,
    password: validPassword,
  })

  if (error) {
    // Login fallito: restituisco messaggio
    return {
      errors: {},
      message: 'Email o password non corretti.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

const FormSignupSchema = z.object({
  email: z.email({ message: 'Inserire una email valida.' }),
  password: z.string().min(6, { message: 'La password deve essere di almeno 6 caratteri.' }),
  name: z.string().min(2, { message: 'Inserire un nome valido' }),
  surname: z.string().min(2, { message: 'Inserire un nome valido' }),
})

export type SignupState = {
  errors?: {
    email?: string[]
    password?: string[]
    name?: string[]
    surname?: string[]
  }
  message?: string | null
  success?: boolean | null
}

export async function signup(prevState: SignupState, formData: FormData) {
  const supabase = await createClient()

  // Estraggo valori come stringhe sicure
  const email = formData.get('email')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''
  const name = formData.get('name')?.toString() ?? ''
  const surname = formData.get('surname')?.toString() ?? ''

  // Validazione dei campi
  const validatedFields = FormSignupSchema.safeParse({ email, password, name, surname })
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Errore di validazione',
    }
  }

  const { email: validEmail, password: validPassword, name: validName, surname: validSurname } =
    validatedFields.data

  const { data, error } = await supabase.auth.signUp({
    email: validEmail,
    password: validPassword,
    options: {
      data: {
        name: validName,
        surname: validSurname,
      },
    },
  })

  if (error) {
    return {
      success: false,
      message: 'Si è verificato un errore durante la registrazione.',
    }
  }

  // prendo l'id dell'utente creato
  const user = data.user
  if (!user) {
    return {
      success: false,
      message: 'Si è verificato un errore durante la registrazione.',
    }
  }

  // Aggiorna i dati del profilo creato dal trigger su auth.users
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ name: validName, surname: validSurname })
    .eq('user_id', user.id)

  if (profileError) {
    return {
      success: false,
      message: 'Si è verificato un errore durante la registrazione.',
    }
  }

  return {
    success: true,
    message:
      'Ti abbiamo inviato una mail di conferma.\nSegui il link per accedere al tuo nuovo profilo!',
  }
}

export async function signUpWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/dashboard`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    return
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logoutAction() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Logout error:', error)
  }
  redirect('/login')
}