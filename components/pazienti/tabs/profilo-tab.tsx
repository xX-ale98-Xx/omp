'use client'

import { AnagraficaSection } from '../sections/anagrafica-section'
import { StileVitaSection } from '../sections/stile-vita-section'
import { SportivoSection } from '../sections/sportivo-section'
import { RefertiSection } from '../sections/referti-section'
import type {
  Anagrafica,
  StileVita,
  PazienteSportivo,
  RefertoMedico,
} from '@/types/patient'

interface ProfiloTabProps {
  anagrafica: Anagrafica
  stileVita: StileVita
  sportivo: PazienteSportivo
  refertiMedici: RefertoMedico[]
  isSportivo: boolean
  onSaveAnagrafica: (data: Anagrafica) => void
  onSaveStileVita: (data: StileVita) => void
  onSaveSportivo: (data: PazienteSportivo) => void
  onSaveReferti: (data: RefertoMedico[]) => void
}

export function ProfiloTab({
  anagrafica,
  stileVita,
  sportivo,
  refertiMedici,
  isSportivo,
  onSaveAnagrafica,
  onSaveStileVita,
  onSaveSportivo,
  onSaveReferti,
}: ProfiloTabProps) {
  return (
    <div className="space-y-6">
      <AnagraficaSection anagrafica={anagrafica} onSave={onSaveAnagrafica} />
      <StileVitaSection data={stileVita} onSave={onSaveStileVita} />
      {isSportivo && <SportivoSection data={sportivo} onSave={onSaveSportivo} />}
      <RefertiSection referti={refertiMedici} onSave={onSaveReferti} />
    </div>
  )
}
