'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation' 
import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'

const FormLoginSchema = z.object({
  email: z.email({ message: 'Inserire una email valida.' }),
  password: z.string().min(6, { message: 'La password deve essere di almeno 6 caratteri.' }),
});

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function login(prevState: LoginState, formData: FormData) {
  const supabase = await createClient();

  // Estraggo valori come stringhe sicure
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  
  // Validazione dei campi
  const validatedFields = FormLoginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
  const { fieldErrors } = validatedFields.error.flatten();

  return {
    errors: {
      email: fieldErrors.email,
      password: fieldErrors.password,
    },
    message: 'Mail o password sbagliati, riprova',
  };
}

  // Dati validati
  const { email: validEmail, password: validPassword } = validatedFields.data;

  // Login con Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email: validEmail,
    password: validPassword,
  });

  if (error) {
    // Login fallito: restituisco messaggio
    return {
      errors: {},
      message: "Email o password non corretti.",
    };
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/home')
}