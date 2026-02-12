import { notFound } from 'next/navigation'
import { mockPatients } from '@/lib/mock-patients'
import { PatientDetailShell } from '@/components/pazienti/patient-detail-shell'

interface PatientDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = await params
  const patient = mockPatients.find((p) => p.id === id)

  if (!patient) {
    notFound()
  }

  return <PatientDetailShell patient={patient} />
}
