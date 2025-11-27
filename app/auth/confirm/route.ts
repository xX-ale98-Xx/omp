import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/home'
  console.log('🔍 Callback auth ricevuta con params:', { code: !!code, token_hash: !!token_hash, type})

  // Verifica OTP via email
  if (token_hash && type) {
    console.log('🔍 Processing OTP flow')
    const response = NextResponse.redirect(new URL(next, request.url))
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // ✅ Verifica OTP
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error && data.session) {
      // ✅ Se la sessione è valida, i cookie vengono automaticamente impostati
      // dal client SSR che hai appena creato
      return response
    } else {
      console.error('Errore verifica OTP:', error)
      return NextResponse.redirect(new URL('/error', request.url))
    }
  }

  if (code) {
    // OAuth con provider esterno (Google)
    console.log('🔍 OAuth callback ricevuta con code:', !!code)
    const response = NextResponse.redirect(new URL(next, request.url))
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    console.log('🔍 Client Supabase creato')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    console.log('🔍 exchangeCodeForSession result:', { 
    success: !error, 
    error: error?.message,
    data: !!data?.session 
    })

    if (error) {
      console.error('Errore autenticazione OAuth:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  
    // Se il codice OAuth non è presente, reindirizza al login
    if (!code) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    console.log('🔍 OAuth flow completato con successo')
  return response
  }
  console.log('🔍 Nessun parametro di autenticazione trovato, reindirizzamento al login')
}
