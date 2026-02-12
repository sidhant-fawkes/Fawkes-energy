'use client'

import React, { useRef } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ScrollProgressIndicator } from '@/components/ui/ScrollProgressIndicator'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import VisionSection from '@/components/sections/VisionSection'
import ProductStackSection from '@/components/sections/ProductStackSection'
import DifferentiatorsSection from '@/components/sections/DifferentiatorsSection'
import ValueDeliveredSection from '@/components/sections/ValueDeliveredSection'
import AboutSection from '@/components/sections/AboutSection'
import BlogSection from '@/components/sections/BlogSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomeClient() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-background font-body antialiased">
      <ScrollProgressIndicator container={mainRef} />
      <Header />
      <main ref={mainRef} className="h-screen overflow-y-auto scroll-smooth">
        <HeroSection />
        <ProblemSection />
        <VisionSection />
        <ProductStackSection />
        <DifferentiatorsSection />
        <ValueDeliveredSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}

