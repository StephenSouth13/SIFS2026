"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap, ArrowRight } from "lucide-react"
import { HeaderSectionData } from "@/types/cms"

interface HeaderProps {
  language: "vi" | "en"
  onLanguageChange: (lang: "vi" | "en") => void
  data: HeaderSectionData | undefined
}

export default function Header({ language, onLanguageChange, data }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // CHUYỂN HOOK LÊN TRƯỚC LỆNH RETURN ĐIỀU KIỆN
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // NẾU KHÔNG CÓ DATA, CHỈ RETURN NULL SAU KHI CÁC HOOK ĐÃ ĐƯỢC KHAI BÁO
  if (!data) return null;

  const nav = language === "vi" 
    ? [
        { label: "Trang Chủ", id: "home" },
        { label: "Chương Trình", id: "agenda" },
        { label: "Gian Hàng", id: "booth-map" },
        { label: "Liên Hệ", id: "contact" },
      ]
    : [
        { label: "Home", id: "home" },
        { label: "Agenda", id: "agenda" },
        { label: "Booth Map", id: "booth-map" },
        { label: "Contact", id: "contact" },
      ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-700 font-sans ${
        isScrolled 
        ? "py-4 bg-black/70 backdrop-blur-2xl border-b border-white/[0.08]" 
        : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* LOGO CMS */}
        <div onClick={() => scrollToSection("home")} className="flex items-center gap-4 cursor-pointer group">
          {data.logo_url ? (
            <img src={data.logo_url} className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" alt="Logo" />
          ) : (
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white fill-white" size={24} />
            </div>
          )}
          {data.logo_text && (
            <span className="text-2xl md:text-3xl font-black text-white italic tracking-tighter font-serif uppercase">
              {data.logo_text}
            </span>
          )}
        </div>

        {/* NAVIGATION & BUTTONS (Giữ nguyên logic của bạn) */}
        <nav className="hidden lg:flex items-center gap-12 text-gray-300 text-sm font-bold uppercase tracking-[0.2em]">
           {nav.map((item, index) => (
             <button key={index} onClick={() => scrollToSection(item.id)} className="hover:text-primary transition-all relative group italic">
               {item.label}
               <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-full" />
             </button>
           ))}
        </nav>

        <div className="hidden lg:flex items-center gap-8">
           <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-2xl p-1">
             {["vi", "en"].map((l) => (
               <button key={l} onClick={() => onLanguageChange(l as "vi" | "en")}
                 className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                   language === l ? "bg-primary text-white shadow-lg" : "text-gray-500 hover:text-white"
                 }`}>
                 {l}
               </button>
             ))}
           </div>
           <button onClick={() => scrollToSection("contact")} className="px-10 py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 italic">
             {language === "vi" ? data.register_text_vi : data.register_text_en}
             <ArrowRight size={16} />
           </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </motion.header>
  )
}