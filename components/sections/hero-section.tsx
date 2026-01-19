"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { HeroSectionData } from "@/types/cms"
import { MapPin, Calendar, Clock } from "lucide-react"

export default function HeroSection({ language, data }: { language: "vi" | "en", data: HeroSectionData | undefined }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // 1. Logic Countdown (Giữ nguyên từ mockup xịn của bạn)
  useEffect(() => {
    if (!data?.target_date) return;
    const targetDate = new Date(data.target_date).getTime()
    const updateCountdown = () => {
      const now = new Date().getTime()
      const diff = targetDate - now
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }
    const interval = setInterval(updateCountdown, 1000)
    updateCountdown()
    return () => clearInterval(interval)
  }, [data?.target_date])

  if (!data) return null;

  // Cấu hình nội dung & theme
  const t = {
    subtitle: language === "vi" ? data.subtitle_vi : data.subtitle_en,
    tagline: language === "vi" ? data.tagline_vi : data.tagline_en,
    location: language === "vi" ? data.location_vi : data.location_en,
    cta1: language === "vi" ? data.cta1_vi : data.cta1_en,
    cta2: language === "vi" ? data.cta2_vi : data.cta2_en,
  }
  const textColor = data.text_color === 'black' ? 'text-slate-900' : 'text-white';
  const backgroundMedia = data.slides?.[0]?.url || data.background_image;

  // Variants cho Animation (Chuẩn mockup cũ)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20 px-4">
      
      {/* LAYER 0: BACKGROUND MEDIA */}
      <div className="absolute inset-0 z-0">
        {data.slides?.[0]?.type === 'video' ? (
          <video src={data.slides[0].url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          backgroundMedia && <img src={backgroundMedia} className="w-full h-full object-cover shadow-2xl" alt="bg" />
        )}
        {/* Lớp phủ làm tối (Overlay) */}
        <div className="absolute inset-0 bg-black" style={{ opacity: (data.overlay_opacity ?? 60) / 100 }} />
        {/* Lớp mờ chân trang */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </div>

      {/* LAYER 1: CONTENT (Tập trung FE - Hiển thị chuẩn nội dung mockup) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`relative z-10 w-full max-w-5xl mx-auto text-center ${textColor}`}
      >
        {/* Tiêu đề Neon */}
        <motion.div variants={itemVariants}>
          <h1 
            className={`text-6xl md:text-9xl font-black mb-6 tracking-tighter drop-shadow-2xl ${data.font_family}`}
            style={{ color: data.title_color || '#FFD700', textShadow: `0 0 30px ${data.title_color}66` }}
          >
            {data.title}
          </h1>
        </motion.div>

        {/* Subtitle & Tagline */}
        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-3xl font-black uppercase tracking-[0.1em] mb-3">{t.subtitle}</p>
          <p className="text-lg italic opacity-80 mb-10">{t.tagline}</p>
        </motion.div>

        {/* Thẻ thông tin Địa điểm & Thời gian (Icon chuẩn FE) */}
        {data.show_info_card && (
          <motion.div variants={itemVariants} className="my-10">
            <div className="glass-tet rounded-[2.5rem] p-6 md:p-10 border border-white/10 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="text-primary w-6 h-6" />
                <span className="text-[11px] font-black uppercase tracking-widest">{t.location}</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
                <Calendar className="text-secondary w-6 h-6" />
                <span className="text-sm font-black italic">{data.date_text_vi || "06/02 - 07/02/2026"}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="text-primary w-6 h-6" />
                <span className="text-[11px] font-black uppercase tracking-widest">{data.time_text_vi || "09:00 - 18:00"}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Đồng hồ Countdown (Thiết kế mới xịn hơn) */}
        {data.show_countdown && (
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
              {[
                { label: "DAYS", value: countdown.days },
                { label: "HOURS", value: countdown.hours },
                { label: "MINS", value: countdown.minutes },
                { label: "SECS", value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="bg-black/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/5 shadow-inner">
                  <div className="text-3xl md:text-5xl font-black text-secondary mb-1 font-serif italic">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 tracking-tighter">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Nút bấm (CTA) */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
          {data.show_cta1 && (
            <button 
              onClick={() => data.cta1_link && (window.location.href = data.cta1_link)}
              className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase text-sm shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
              {t.cta1}
            </button>
          )}
          {data.show_cta2 && (
            <button 
              onClick={() => data.cta2_link && (window.location.href = data.cta2_link)}
              className={`px-12 py-5 border-2 border-secondary/50 rounded-2xl font-black uppercase text-sm backdrop-blur-sm hover:scale-105 transition-all active:scale-95 ${textColor}`}
            >
              {t.cta2}
            </button>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}