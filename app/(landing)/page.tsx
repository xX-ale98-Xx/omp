import type { Metadata } from 'next'
import LandingHeader from '@/components/landing/landing-header'
import HeroSection from '@/components/landing/hero-section'
import CoCreazioneSection from '@/components/landing/co-creazione-section'
import ChiSiamoSection from '@/components/landing/chi-siamo-section'
import MissionSection from '@/components/landing/mission-section'
import ProblemSection from '@/components/landing/problem-section'
import SolutionSection from '@/components/landing/solution-section'
import HowItWorksSection from '@/components/landing/how-it-works-section'
import BenefitsSection from '@/components/landing/benefits-section'
import DifferentiatorSection from '@/components/landing/differentiator-section'
import FaqSection from '@/components/landing/faq-section'
import CtaSection from '@/components/landing/cta-section'
import ContattiSection from '@/components/landing/contatti-section'
import LandingFooter from '@/components/landing/landing-footer'

export const metadata: Metadata = {
  title: 'OhMyPhysio - Gestione Fisioterapica Intelligente',
  description:
    'Piattaforma di gestione fisioterapica con IA. Monitoraggio remoto, esercizi guidati, gestione studio.',
}

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
      <LandingHeader />
      <main>
        <HeroSection />
        <CoCreazioneSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <BenefitsSection />
        <DifferentiatorSection />
        <FaqSection />
        <MissionSection />
        <ChiSiamoSection />
        <CtaSection />
        <ContattiSection />
      </main>
      <LandingFooter />
    </div>
  )
}
