"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Calendar, Zap, Trophy } from "lucide-react"

interface AgendaSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Chương Trình Sự Kiện",
    subtitle: "Lịch trình chi tiết 2 ngày hội khởi nghiệp SIFS 2026",
    days: [
      {
        date: "06/02/2026",
        label: "Ngày 01: Khai Phá",
        events: [
          { time: "09:00 - 09:30", title: "Khai mạc sự kiện", description: "Lễ khai mạc trang trọng với sự tham gia của các cấp lãnh đạo và đối tác chiến lược.", icon: <Zap className="w-4 h-4" /> },
          { time: "09:30 - 11:00", title: "Seminar 1: AI & Tự Động Hóa", description: "Tương lai của trí tuệ nhân tạo trong vận hành doanh nghiệp startup.", icon: <Clock className="w-4 h-4" /> },
          { time: "11:00 - 18:00", title: "Trưng bày & Networking", description: "Không gian kết nối trực tiếp tại các gian hàng triển lãm Khu A, B, C, D, E.", icon: <Calendar className="w-4 h-4" /> },
        ],
      },
      {
        date: "07/02/2026",
        label: "Ngày 02: Bứt Phá",
        events: [
          { time: "09:00 - 11:00", title: "Seminar 2: Nhân Sự Chất Lượng Cao", description: "Chiến lược thu hút và giữ chân nhân tài trong kỷ nguyên số.", icon: <Clock className="w-4 h-4" /> },
          { time: "11:00 - 13:00", title: "Seminar 3: Sáng Tạo & Design Thinking", description: "Áp dụng tư duy thiết kế để đột phá mô hình kinh doanh.", icon: <Clock className="w-4 h-4" /> },
          { time: "13:00 - 15:00", title: "Seminar 4: Huy Động Vốn & Đầu Tư", description: "Bí quyết chinh phục các quỹ đầu tư VCs và Angel Investors.", icon: <Clock className="w-4 h-4" /> },
          { time: "15:30 - 18:00", title: 'Chạy bộ "Run for Future"', description: "Giải chạy thiện nguyện gây quỹ sinh viên khó khăn - Mục tiêu: 50 tỷ VND.", icon: <Trophy className="w-4 h-4" /> },
        ],
      },
    ],
  },
  en: {
    title: "Event Agenda",
    subtitle: "Detailed 2-day schedule of SIFS 2026 Innovation Festival",
    days: [
      {
        date: "06/02/2026",
        label: "Day 01: Discovery",
        events: [
          { time: "09:00 - 09:30", title: "Opening Ceremony", description: "Grand opening with leaders and strategic partners.", icon: <Zap className="w-4 h-4" /> },
          { time: "09:30 - 11:00", title: "Seminar 1: AI & Automation", description: "The future of AI in startup operations.", icon: <Clock className="w-4 h-4" /> },
          { time: "11:00 - 18:00", title: "Showcase & Networking", description: "Direct networking at exhibition booths in Zones A, B, C, D, E.", icon: <Calendar className="w-4 h-4" /> },
        ],
      },
      {
        date: "07/02/2026",
        label: "Day 02: Breakthrough",
        events: [
          { time: "09:00 - 11:00", title: "Seminar 2: High-Quality HR", description: "Attracting and retaining talent in the digital age.", icon: <Clock className="w-4 h-4" /> },
          { time: "11:00 - 13:00", title: "Seminar 3: Design Thinking", description: "Applying design thinking for business breakthroughs.", icon: <Clock className="w-4 h-4" /> },
          { time: "13:00 - 15:00", title: "Seminar 4: Fundraising & Investment", description: "Secrets to winning over VCs and Angel Investors.", icon: <Clock className="w-4 h-4" /> },
          { time: "15:30 - 18:00", title: '"Run for Future" Charity Run', description: "Fundraising run for students in need - Target: 50 billion VND.", icon: <Trophy className="w-4 h-4" /> },
        ],
      },
    ],
  },
}

export default function AgendaSection({ language }: AgendaSectionProps) {
  const t = content[language]
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section id="agenda" className="py-24 px-4 bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

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
          <p className="text-gray-400 italic">{t.subtitle}</p>
        </motion.div>

        {/* Date Tabs */}
        <div className="flex gap-4 justify-center mb-16">
          {t.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`relative px-8 py-4 rounded-2xl transition-all duration-500 overflow-hidden group ${
                activeDay === index ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">{day.label}</p>
                <p className="text-lg font-bold">{day.date}</p>
              </div>
              {activeDay === index && (
                <motion.div 
                  layoutId="activeTab" 
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
              {t.days[activeDay].events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative mb-12 last:mb-0"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(255,215,0,0.5)] border-4 border-[#050505] z-10" />
                  
                  <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-[2rem] p-6 md:p-8 transition-all duration-500 group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                          {event.icon}
                        </div>
                        <span className="text-secondary font-black text-sm tracking-widest uppercase">
                          {event.time}
                        </span>
                      </div>
                      <div className="h-[1px] flex-1 bg-white/5 hidden md:block" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed italic">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}