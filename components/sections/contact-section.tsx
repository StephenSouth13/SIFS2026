"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Send, MapPin, UserCheck } from "lucide-react"
import { ContactSectionData } from "@/types/cms"

interface ContactSectionProps {
  language: "vi" | "en"
  data: ContactSectionData | undefined
}

export default function ContactSection({ language, data }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", company: "", type: "", message: "" })
  if (!data) return null;

  const t = {
    title: language === "vi" ? data.title_vi : data.title_en,
    subtitle: language === "vi" ? data.subtitle_vi : data.subtitle_en,
    desc: language === "vi" ? data.desc_vi : data.desc_en,
    address: language === "vi" ? data.address_vi : data.address_en,
    formTitle: language === "vi" ? "Gửi Yêu Cầu Hợp Tác" : "Partnership Request",
    send: language === "vi" ? "Gửi ngay" : "Send Now"
  }

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black neon-text font-serif italic mb-6 text-white">{t.title}</h2>
          <p className="text-xl md:text-2xl text-secondary font-bold mb-4 uppercase tracking-widest">{t.subtitle}</p>
          <p className="text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">{t.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Thông tin liên hệ (Trái) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-[2.5rem] overflow-hidden h-64 border border-white/10 shadow-2xl mb-8">
              <img src={data.banner_image || "/images/partnership.jpg"} alt="Partnership" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
            </div>

            {data.contacts.map((contact) => (
              <motion.div 
                key={contact.id}
                whileHover={{ x: 10 }}
                className="glass-tet p-8 rounded-[2rem] border border-white/5 flex items-start gap-5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-secondary border border-primary/20 group-hover:bg-primary transition-all">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-1">{contact.name}</h4>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    {language === "vi" ? contact.role_vi : contact.role_en}
                  </p>
                  <div className="space-y-1 text-sm text-gray-400 font-medium">
                    <p className="hover:text-secondary transition-colors cursor-pointer flex items-center gap-2">
                      <Mail size={14} /> {contact.email}
                    </p>
                    <p className="hover:text-secondary transition-colors cursor-pointer flex items-center gap-2">
                      <Phone size={14} /> {contact.phone}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="glass-tet p-6 rounded-2xl border border-white/5 flex items-center gap-4">
              <MapPin className="text-secondary" />
              <p className="text-sm font-bold text-white uppercase tracking-tighter">{t.address}</p>
            </div>
          </div>

          {/* Form đăng ký (Phải) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-tet p-10 md:p-12 rounded-[3rem] border border-primary/20 shadow-[0_0_50px_rgba(230,0,0,0.1)] sticky top-32"
            >
              <h3 className="text-3xl font-black text-white mb-8 font-serif italic tracking-tight">{t.formTitle}</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Họ tên / Fullname</label>
                  <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Tổ chức / Company</label>
                  <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Thông điệp / Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-all resize-none" />
                </div>
                <button className="md:col-span-2 bg-primary hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3">
                  <Send size={18} /> {t.send}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}