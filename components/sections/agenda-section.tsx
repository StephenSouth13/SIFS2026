"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Calendar, Zap, Trophy, ChevronRight } from "lucide-react"
import { AgendaSectionData } from "@/types/cms"

interface AgendaSectionProps {
  language: "vi" | "en"
  data: AgendaSectionData | undefined
}

export default function AgendaSection({ language, data }: AgendaSectionProps) {
  const [activeDay, setActiveDay] = useState(0)
  
  if (!data || !data.days || data.days.length === 0) return null;

  const t = {
    title: language === "vi" ? data.title_vi : data.title_en,
    subtitle: language === "vi" ? "Lịch trình chi tiết sự kiện" : "Detailed event schedule",
  }

  // Hàm chọn Icon dựa trên tiêu đề (để UI sống động như bản mẫu)
  const getIcon = (title: string) => {
    const lowTitle = title.toLowerCase();
    if (lowTitle.includes("khai mạc") || lowTitle.includes("opening")) return <Zap size={16} />;
    if (lowTitle.includes("chạy") || lowTitle.includes("run") || lowTitle.includes("huy động")) return <Trophy size={16} />;
    return <Clock size={16} />;
  }

  return (
    <section id="agenda" className="py-24 px-4 bg-[#050505] relative overflow-hidden">
      {/* Decor nền */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-4 text-white font-serif italic uppercase tracking-tighter">
            {t.title}
          </h2>
          <p className="text-gray-400 italic tracking-widest text-xs uppercase opacity-50">{t.subtitle}</p>
        </motion.div>

        {/* Nút chọn Ngày (Tabs) */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {data.days.map((day, index) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(index)}
              className={`relative px-8 py-4 rounded-2xl transition-all duration-500 overflow-hidden group ${
                activeDay === index ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className="relative z-10 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">
                  {language === "vi" ? `Ngày 0${index + 1}` : `Day 0${index + 1}`}
                </p>
                <p className="text-lg font-black tracking-tighter">{day.date}</p>
              </div>
              {activeDay === index && (
                <motion.div 
                  layoutId="activeTabAgenda" 
                  className="absolute inset-0 bg-primary shadow-[0_0_30px_rgba(220,20,60,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {data.days[activeDay].events.map((event, index) => {
                const eTitle = language === "vi" ? event.title_vi : event.title_en;
                const eDesc = language === "vi" ? event.desc_vi : event.desc_en;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative mb-12 last:mb-0"
                  >
                    {/* Timeline Dot (Cái chấm vàng trên đường kẻ) */}
                    <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(255,215,0,0.5)] border-4 border-[#050505] z-10" />
                    
                    <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 group relative overflow-hidden">
                      {/* Hiệu ứng tia sáng khi hover */}
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="text-primary" />
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-black transition-all duration-500">
                            {getIcon(eTitle)}
                          </div>
                          <span className="text-secondary font-black text-sm tracking-widest uppercase italic">
                            {event.time}
                          </span>
                        </div>
                        <div className="h-[1px] flex-1 bg-white/5 hidden md:block" />
                      </div>
                      
                      <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-3 group-hover:text-primary transition-colors duration-500">
                        {eTitle}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                        {eDesc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}