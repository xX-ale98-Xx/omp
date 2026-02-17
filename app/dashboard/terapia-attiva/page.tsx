'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import { ExerciseDatabaseTab } from '@/components/terapia-attiva/exercise-database-tab'
import { AssignedProgramsTab } from '@/components/terapia-attiva/assigned-programs-tab'

export default function TerapiaAttivaPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-6 text-primary-foreground shadow-sm dark:from-brand-500 dark:to-brand-300">
        <h1 className="text-2xl font-bold tracking-tight">Terapia Attiva</h1>
        <p className="mt-1 text-sm text-primary-foreground/80">
          Gestisci esercizi e programmi di riabilitazione
        </p>
      </div>

      <Tabs defaultValue="database">
        <TabsList>
          <TabsTrigger value="database">Database Esercizi</TabsTrigger>
          <TabsTrigger value="programmi">Programmi Assegnati</TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="mt-4">
          <ExerciseDatabaseTab />
        </TabsContent>

        <TabsContent value="programmi" className="mt-4">
          <AssignedProgramsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
