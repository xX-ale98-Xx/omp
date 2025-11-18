import { createClient } from '@/utils/supabase/server'

//...

export default async function Home() {
  
  const supabase = await createClient()
  
      const {
          data: { user },
      } = await supabase.auth.getUser()
  
  return (
    <div>
      <h1>Ciao, questa potrebbe essere la home della dashboard</h1>
      <h1>L&apos;utente attualmente loggato è: {user?.email}</h1>
      <h1>Il suo id è: {user?.id}</h1>
    </div>
  );
}