"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  language: "vi" | "en"
  onLanguageChange: (lang: "vi" | "en") => void
}

const content = {
  vi: {
    nav: [
      { label: "Trang Chủ", id: "home" },
      { label: "Chương Trình", id: "agenda" },
      { label: "Ban Cố Vấn", id: "advisors" },
     
      { label: "Gian Hàng", id: "booth" },
    ],
    register: "Đăng ký",
  },
  en: {
    nav: [
      { label: "Home", id: "home" },
      { label: "Agenda", id: "agenda" },
      { label: "Advisors", id: "advisors" },
      
      { label: "Booths", id: "booth" },
    ],
    register: "Register",
  },
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const t = content[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass neon-glow-gold" : "bg-gradient-to-b from-orange-100/80 to-transparent"
      }`}
      style={{
        borderBottom: isScrolled ? "2px solid #FFD700" : "none",
        backdropFilter: isScrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection("home")}
          className="font-bold text-2xl text-primary cursor-pointer"
        >
          SIFS 2026
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {t.nav.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ color: "#DC143C" }}
              className="text-foreground font-medium transition-colors cursor-pointer border-none bg-none"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex gap-2 bg-white/30 rounded-lg p-1">
            {["vi", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang as "vi" | "en")}
                className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                  language === lang ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/80 neon-glow transition-all"
          >
            {t.register}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-border"
        >
          <div className="px-4 py-4 space-y-4">
            {t.nav.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  scrollToSection(item.id)
                  setIsOpen(false)
                }}
                className="block w-full text-left text-foreground hover:text-primary transition-colors border-none bg-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-2 pt-4 border-t border-border">
              {["vi", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang as "vi" | "en")}
                  className={`flex-1 py-2 rounded text-sm font-semibold transition-all ${
                    language === lang ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
