"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/sections/hero-section"
import PillarsSection from "@/components/sections/pillars-section"
import AgendaSection from "@/components/sections/agenda-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import Starfield from "@/components/starfield"
import BackToTop from "@/components/back-to-top"
import USPSection from "@/components/sections/usp-section"
import AdvisorsSection from "@/components/sections/advisors-section"
import BoothMapSection from "@/components/sections/booth-map-section"

import { useContent } from "@/hooks/useContent"
import { SiteData } from "@/types/cms"

export default function Home() {
  const [language, setLanguage] = useState<"vi" | "en">("vi")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { content, loading } = useContent<SiteData>()

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="bg-linear-to-b from-[#050505] via-[#1a0000] to-[#050505] text-white overflow-hidden selection:bg-primary/30">
      <Starfield />
      <Header language={language} onLanguageChange={setLanguage} />

      <div id="home">
        <HeroSection language={language} data={content?.hero} />
      </div>

      <PillarsSection language={language} data={content?.pillars} />
      <USPSection language={language} data={content?.usp} />

      <div id="advisors">
        <AdvisorsSection language={language} data={content?.advisors} />
      </div>

      <BoothMapSection language={language} data={content?.boothMap} />

      <div id="agenda">
        <AgendaSection language={language} data={content?.agenda} />
      </div>

      <ContactSection language={language} data={content?.contact} />
      <Footer language={language} data={content?.footer} />
      <BackToTop visible={showBackToTop} />
    </main>
  )
}