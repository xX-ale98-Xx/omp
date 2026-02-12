import type { Patient } from '@/types/patient'
import { PatientCard } from './patient-card'
import { PatientAddCard } from './patient-add-card'

interface PatientGridProps {
  patients: Patient[]
}

export function PatientGrid({ patients }: PatientGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <PatientAddCard />
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  )
}
