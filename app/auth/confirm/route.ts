import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const VALID_OTP_TYPES: EmailOtpType[] = [
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
  'email',
]

function sanitizeRedirectPath(rawNext: string | null): string {
  const fallback = '/home'
  if (!rawNext) return fallback

  let decoded: string
  try {
    decoded = decodeURIComponent(rawNext)
  } catch {
    return fallback
  }

  decoded = decoded.replace(/\\/g, '/')
  decoded = decoded.replace(/[\x00-\x1f\x7f]/g, '')

  if (!decoded.startsWith('/') || decoded.startsWith('//')) return fallback
  if (decoded.includes('://')) return fallback

  try {
    const parsed = new URL(decoded, 'http://localhost')
    if (parsed.hostname !== 'localhost') return fallback
  } catch {
    return fallback
  }
  

  return decoded
}

function createSupabaseClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
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
    },
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const code = searchParams.get('code')
  const next = sanitizeRedirectPath(searchParams.get('next'))

  // Verifica OTP via email
  if (token_hash && type) {
    if (!VALID_OTP_TYPES.includes(type as EmailOtpType)) {
      return NextResponse.redirect(new URL('/error', request.url))
    }

    const response = NextResponse.redirect(new URL(next, request.url))
    const supabase = createSupabaseClient(request, response)

    const { data, error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    })

    if (!error && data.session) {
      return response
    } else {
      return NextResponse.redirect(new URL('/error', request.url))
    }
  }

  // OAuth con provider esterno (Google)
  if (code) {
    const response = NextResponse.redirect(new URL(next, request.url))
    const supabase = createSupabaseClient(request, response)

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return response
  }

  // Nessun parametro valido: redirect al login
  return NextResponse.redirect(new URL('/login', request.url))
}
