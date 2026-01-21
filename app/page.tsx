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

  // FIX LỖI "Rendered fewer hooks": 
  // Luôn phải để logic render chính ở cuối, không return sớm giữa chừng.
  return (
    <main className="bg-linear-to-b from-[#050505] via-[#1a0000] to-[#050505] text-white overflow-hidden selection:bg-primary/30 min-h-screen">
      {loading ? (
        <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[999]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-primary font-black uppercase tracking-widest text-[10px] animate-pulse">SIFS 2026 is Loading...</p>
        </div>
      ) : (
        <>
          <Starfield />
          
          {/* FIX LỖI 2741: Truyền data={content?.header} */}
          <Header 
            language={language} 
            onLanguageChange={setLanguage} 
            data={content?.header} 
          />

          <div id="home">
            <HeroSection language={language} data={content?.hero} />
          </div>

          <PillarsSection language={language} data={content?.pillars} />
          <USPSection language={language} data={content?.usp} />

          <div id="advisors">
            {/* TRUYỀN DATA CMS VÀO ADVISORS */}
            <AdvisorsSection language={language} data={content?.advisors} />
          </div>

          <BoothMapSection language={language} data={content?.boothMap} />

          <div id="agenda">
            <AgendaSection language={language} data={content?.agenda} />
          </div>

          <ContactSection language={language} data={content?.contact} />
          
          {/* TRUYỀN DATA CMS VÀO FOOTER */}
          <Footer language={language} data={content?.footer} />
          
          <BackToTop visible={showBackToTop} />
        </>
      )}
    </main>
  )
}