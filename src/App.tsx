import { EmbeddablesProvider } from '@embeddables/core/react'
import { Route, Routes } from 'react-router'

import { embeddablesConfig, modules, publishableKey } from '@/embeddables.ts'
import { ForcePage } from '@/ForcePage.tsx'
import {
  AdoptaContactoPage,
  AdoptaEnergiaPage,
  AdoptaHogarPage,
  AdoptaLandingPage,
  AdoptaMatchPage,
  CompaniaPage,
  EnergiaPage,
  GraciasPage,
  HogarPage,
  MatchPage,
  ReservaPage,
  WelcomePage,
} from '@/funnel/screens.tsx'

export default function App() {
  return (
    <EmbeddablesProvider
      config={embeddablesConfig}
      modules={modules}
      publishableKey={publishableKey}
    >
      <ForcePage />
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="quiz/energia" element={<EnergiaPage />} />
        <Route path="quiz/hogar" element={<HogarPage />} />
        <Route path="quiz/compania" element={<CompaniaPage />} />
        <Route path="match" element={<MatchPage />} />
        <Route path="reserva" element={<ReservaPage />} />
        <Route path="gracias" element={<GraciasPage />} />
        <Route path="adopta" element={<AdoptaLandingPage />} />
        <Route path="adopta/energia" element={<AdoptaEnergiaPage />} />
        <Route path="adopta/hogar" element={<AdoptaHogarPage />} />
        <Route path="adopta/match" element={<AdoptaMatchPage />} />
        <Route path="adopta/contacto" element={<AdoptaContactoPage />} />
      </Routes>
    </EmbeddablesProvider>
  )
}
