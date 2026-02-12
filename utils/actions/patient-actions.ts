'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

const CreatePatientSchema = z.object({
  nome: z.string().min(2, { message: 'Il nome deve avere almeno 2 caratteri.' }),
  cognome: z.string().min(2, { message: 'Il cognome deve avere almeno 2 caratteri.' }),
  sesso: z.enum(['M', 'F', 'Altro', '']).optional(),
  dataNascita: z.string().optional(),
  luogoNascita: z.string().optional(),
  statoNascita: z.string().optional(),
  codiceFiscale: z
    .string()
    .transform((v) => v.toUpperCase())
    .pipe(
      z.string().regex(/^$|^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/, {
        message: 'Codice Fiscale non valido.',
      })
    )
    .optional(),
  cartaIdentita: z.string().optional(),
  indirizzoResidenza: z.string().optional(),
  indirizzoDomicilio: z.string().optional(),
  domicilioUgualeResidenza: z.string().optional(),
  cap: z
    .string()
    .regex(/^$|^\d{5}$/, { message: 'Il CAP deve essere di 5 cifre.' })
    .optional(),
  telefono: z.string().optional(),
  email: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z.string().refine((v) => v === '' || z.string().email().safeParse(v).success, {
        message: 'Inserire una email valida.',
      })
    )
    .optional(),
  aslAppartenenza: z.string().optional(),
  medicoCurante: z.string().optional(),
  tipoAssicurazione: z.enum(['SSN', 'Privata', 'Mista', 'Nessuna', '']).optional(),
  compagniaAssicurativa: z.string().optional(),
  numeroPolizza: z.string().optional(),
})

export type CreatePatientState = {
  errors?: { [field: string]: string[] }
  message?: string | null
  success?: boolean | null
}

export async function createPatientAction(
  prevState: CreatePatientState,
  formData: FormData
): Promise<CreatePatientState> {
  const rawData: Record<string, string> = {}
  for (const [key, val] of formData.entries()) {
    rawData[key] = val.toString()
  }

  const validatedFields = CreatePatientSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as { [field: string]: string[] },
      message: 'Verifica i campi evidenziati.',
    }
  }

  // TODO: salvare su Supabase quando il backend sarà pronto
  // Per ora simuliamo un breve delay e redirect
  await new Promise((resolve) => setTimeout(resolve, 500))

  redirect('/dashboard/pazienti?created=1')
}
