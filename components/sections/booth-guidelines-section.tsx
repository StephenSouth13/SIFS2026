"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, AlertCircle, Sparkles, Globe } from "lucide-react"

interface BoothGuidelinesProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Quy Định Gian Hàng",
    guidelines: [
      { title: "Giá Early Bird", content: "2.000.000 VND (Đến 30/01/2026)" },
      { title: "Tiêu chuẩn", content: "1.5m x 0.5m bao gồm: 1 bàn, 2 ghế, 1 ổ cắm." },
      { title: "Khu E (Global Partners)", content: "Hỗ trợ riêng cho đối tác quốc tế 24/7." },
      { title: "Setup", content: "14:00 - 21:00 ngày 05/02/2026." },
    ],
  },
  en: {
    title: "Booth Guidelines",
    guidelines: [
      { title: "Early Bird Price", content: "2,000,000 VND (Until Jan 30, 2026)" },
      { title: "Standard", content: "1.5m x 0.5m: 1 table, 2 chairs, 1 outlet." },
      { title: "Zone E", content: "Special support for global partners 24/7." },
      { title: "Setup", content: "14:00 - 21:00 Feb 05, 2026." },
    ],
  },
}

export default function BoothGuidelinesSection({ language }: BoothGuidelinesProps) {
  const t = content[language]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 px-4 bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 text-white font-serif italic uppercase tracking-tighter">{t.title}</h2>
        <div className="space-y-4">
          {t.guidelines.map((g, i) => (
            <div key={i} className="border-b border-white/10">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full py-6 flex justify-between items-center text-white font-bold uppercase text-left">
                <span>{g.title}</span>
                <ChevronDown className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="pb-6 text-gray-400 italic text-sm">{g.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}