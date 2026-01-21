"use client"

import { motion } from "framer-motion"
import { Facebook, MessageSquare, Mail, Phone, Zap } from "lucide-react"
import { FooterSectionData } from "@/types/cms"

interface FooterProps {
  language: "vi" | "en"
  data: FooterSectionData | undefined
}

export default function Footer({ language, data }: FooterProps) {
  if (!data) return null;

  const t = {
    quickLinks: language === "vi" ? "Khám phá" : "Explore",
    contact: language === "vi" ? "Kết nối" : "Contact",
    nav: language === "vi" 
      ? [
          { label: "Trang Chủ", id: "home" },
          { label: "Chương Trình", id: "agenda" },
          { label: "Gian Hàng", id: "booth-map" },
          { label: "Liên Hệ", id: "contact" }
        ] 
      : [
          { label: "Home", id: "home" },
          { label: "Agenda", id: "agenda" },
          { label: "Booths", id: "booth-map" },
          { label: "Contact", id: "contact" }
        ]
  }

  return (
    <footer className="bg-[#050505] pt-32 pb-16 px-6 border-t border-white/[0.03] relative overflow-hidden font-sans">
      {/* Subtle Glow - Điểm nhấn ánh sáng nhẹ phía dưới */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
          
          {/* CỘT 1: BRAND IDENTITY */}
          <div className="md:col-span-6 space-y-10">
            <div className="flex items-center gap-5">
              {data.logo_url ? (
                <img src={data.logo_url} alt="SIFS" className="h-16 w-auto object-contain brightness-110" />
              ) : (
                <div className="w-14 h-14 bg-primary rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-primary/20">
                  <Zap className="text-white fill-white" size={28} />
                </div>
              )}
              {data.logo_text && (
                <span className="text-4xl font-black text-white italic tracking-tighter font-serif uppercase">
                  {data.logo_text}
                </span>
              )}
            </div>

            {(language === "vi" ? data.description_vi : data.description_en) && (
              <p className="text-gray-400 text-lg leading-relaxed max-w-md font-medium italic opacity-80">
                {language === "vi" ? data.description_vi : data.description_en}
              </p>
            )}

            {/* SOCIAL ICONS - TINH TẾ HƠN */}
            <div className="flex gap-5 pt-4">
              {data.facebook_url && (
                <a href={data.facebook_url} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-500 shadow-xl">
                  <Facebook size={22} fill="currentColor" />
                </a>
              )}
              {data.zalo_url && (
                <a href={data.zalo_url} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-teal-600 hover:border-teal-600 transition-all duration-500 shadow-xl">
                  <MessageSquare size={22} fill="currentColor" />
                </a>
              )}
            </div>
          </div>

          {/* CỘT 2: NAVIGATION */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] opacity-30">{t.quickLinks}</h4>
            <ul className="space-y-5">
              {t.nav.map((link, i) => (
                <li key={i}>
                  <a href={`#${link.id}`} className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-primary transition-all flex items-center gap-3 group">
                    <span className="w-0 h-px bg-primary group-hover:w-6 transition-all duration-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: CONTACT INFO */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] opacity-30">{t.contact}</h4>
            <div className="space-y-6">
              {data.email && (
                <a href={`mailto:${data.email}`} className="block group">
                  <p className="text-[10px] font-black text-gray-600 uppercase mb-1 tracking-widest group-hover:text-primary transition-colors">Email Support</p>
                  <p className="text-base font-bold text-gray-300 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    {data.email}
                  </p>
                </a>
              )}
              {data.phone && (
                <a href={`tel:${data.phone}`} className="block group">
                  <p className="text-[10px] font-black text-gray-600 uppercase mb-1 tracking-widest group-hover:text-primary transition-colors">Hotline 24/7</p>
                  <p className="text-base font-bold text-gray-300 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    {data.phone}
                  </p>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM: CHỈ GIỮ LẠI COPYRIGHT - SẠCH SẼ TUYỆT ĐỐI */}
        <div className="pt-12 border-t border-white/[0.03] flex justify-center">
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] text-center">
            {language === "vi" ? data.copyright_vi : data.copyright_en}
          </p>
        </div>
      </div>
    </footer>
  )
}