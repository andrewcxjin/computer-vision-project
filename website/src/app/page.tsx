'use client'

import { LoadingScreen } from '@/components/LoadingScreen'
import { Navigation } from '@/components/Navigation'
import { ScrollProgress } from '@/components/ScrollProgress'
import { HeroSection } from '@/components/sections/HeroSection'
import { MissionSection } from '@/components/sections/MissionSection'
import { TechnologySection } from '@/components/sections/TechnologySection'
import { ApplicationsSection } from '@/components/sections/ApplicationsSection'
import { DatasetSection } from '@/components/sections/DatasetSection'
import { DemoSection } from '@/components/sections/DemoSection'
import { FutureSection } from '@/components/sections/FutureSection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navigation />

      <main className="relative">
        <HeroSection />
        <MissionSection />
        <TechnologySection />
        <ApplicationsSection />
        <DatasetSection />
        <DemoSection />
        <FutureSection />
        <Footer />
      </main>
    </>
  )
}
