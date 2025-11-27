'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import type { User } from '@supabase/supabase-js'

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
      message: 'Mail o password sbagliati, riprova',
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
  redirect('/home')
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
  user?: User | null
}

export async function signup(prevState: SignupState, formData: FormData) {
  const supabase = await createClient()

  await supabase.auth.signOut()

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
      user: null,
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        surname,
      },
    },
  })

  if (error) {
    return {
      success: false,
      message: error.message,
      user: null,
    }
  }

  // prendo l'id dell'utente creato
  const user = data.user
  if (!user) {
    return {
      success: false,
      message: 'Errore: utente non creato',
      user: null,
    }
  }

  // Aggiorna i dati del profilo creato dal trigger su auth.users
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ name, surname })
    .eq('user_id', user.id)

  if (profileError) {
    return {
      success: false,
      message: 'Errore aggiornamento profilo: ' + profileError.message,
      user: null,
    }
  }

  return {
    success: true,
    message:
      'Ti abbiamo inviato una mail di conferma.\nSegui il link per accedere al tuo nuovo profilo!',
    user: data.user,
  }
}

export async function signUpWithGoogle() {
  console.log('🔍 NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL)
  console.log('🔍 redirectTo:', `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm?next=/home`)
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm?next=/home`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('OAuth error:', error)
      return { error: error.message, url: null }
    }
    return { error: null, url: data.url }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { error: 'Errore durante il login con Google', url: null }
  }
}