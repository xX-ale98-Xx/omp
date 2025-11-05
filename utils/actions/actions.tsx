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

const FormSignupSchema = z.object({
  email: z.email({ message: 'Inserire una email valida.' }),
  password: z.string().min(6, { message: 'La password deve essere di almeno 6 caratteri.' }),
  name: z.string().min(2, { message: 'Inserire un nome valido' }),
  surname: z.string().min(2, { message: 'Inserire un nome valido' }),
});

export type SignupState = {
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    surname?: string[];
  };
  message?: string | null;
};

export async function signup(prevState: SignupState, formData: FormData) {
  const supabase = await createClient()

  await supabase.auth.signOut();

  // Estraggo valori come stringhe sicure
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const name = formData.get('name')?.toString() ?? '';
  const surname = formData.get('surname')?.toString() ?? '';
  
  // Validazione dei campi
  const validatedFields = FormSignupSchema.safeParse({ email, password, name, surname })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Errore di validazione",
    }
  };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data:{
        name,
        surname
      },
    }
  });

  if (error) {
    return { message: error.message };
  };

  // prendo l'id dell'utente creato
  const user = data.user;
  if (!user) {
    return { message: "Errore: utente non creato" }
  };

  // Aggiorna i dati del profilo creato dal trigger su auth.users
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ name, surname })
    .eq('user_id', user.id);

  if (profileError) {
    return { message: 'Errore aggiornamento profilo: ' + profileError.message };
  }

  // Redirect e revalidazione
  revalidatePath('/', 'layout');
  redirect('/home');
}