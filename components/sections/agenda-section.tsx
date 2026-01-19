"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Calendar } from "lucide-react"
import { AgendaSectionData } from "@/types/cms"

interface AgendaSectionProps {
  language: "vi" | "en"
  data: AgendaSectionData | undefined
}

export default function AgendaSection({ language, data }: AgendaSectionProps) {
  const [activeDay, setActiveDay] = useState(0)
  if (!data) return null;

  const title = language === "vi" ? data.title_vi : data.title_en;
  const days = data.days || [];

  return (
    <section id="agenda" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black neon-text font-serif italic mb-6 text-white">
            {title}
          </h2>
        </motion.div>

        {/* Nút chọn Ngày */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {days.map((day, index) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(index)}
              className={`group relative px-8 py-4 rounded-2xl font-black transition-all duration-300 overflow-hidden ${
                activeDay === index 
                ? "text-white scale-110 shadow-[0_0_20px_rgba(230,0,0,0.4)]" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              {activeDay === index && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Calendar size={16} />
                {day.date}
              </span>
            </button>
          ))}
        </div>

        {/* Danh sách sự kiện */}
        <div className="relative">
          {/* Đường line chạy dọc Timeline */}
          <div className="absolute left-[31px] top-0 bottom-0 w-px bg-linear-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {days[activeDay]?.events.map((event, index) => {
                const eTitle = language === "vi" ? event.title_vi : event.title_en;
                const eDesc = language === "vi" ? event.desc_vi : event.desc_en;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-tet p-8 rounded-[2rem] glass-hover relative group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 flex items-center gap-3 md:w-32">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-secondary border border-primary/30 group-hover:scale-125 transition-transform">
                          <Clock size={14} />
                        </div>
                        <span className="text-secondary font-black text-sm tracking-tighter">
                          {event.time}
                        </span>
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 font-serif group-hover:text-secondary transition-colors">
                          {eTitle}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">
                          {eDesc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}