"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Send, UserCheck, Loader2, User, Smartphone } from "lucide-react"
import { ContactSectionData } from "@/types/cms"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner" // Chỉ giữ lại toast

interface ContactSectionProps {
  language: "vi" | "en"
  data: ContactSectionData | undefined
}

export default function ContactSection({ language, data }: ContactSectionProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ 
    fullname: "", 
    phone: "", 
    email: "", 
    message: "" 
  })

  if (!data) return null;

  const hasMedia = !!(data.banner_image || data.map_embed_url || (data.contacts && data.contacts.length > 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // 1. Gửi dữ liệu vào Supabase
      const { error } = await supabase.from("contact_submissions").insert([
        { 
          fullname: formData.fullname, 
          phone: formData.phone, 
          email: formData.email, 
          message: formData.message,
          status: 'pending' 
        }
      ])

      if (error) throw error
      
      // 2. Hiện thông báo thành công ngay lập tức
      toast.success(language === "vi" ? "Đã gửi thông tin thành công!" : "Registered successfully!", {
        description: language === "vi" ? "Hẹn gặp lại bạn tại SIFS 2026." : "See you at SIFS 2026.",
        duration: 5000,
      })

      // 3. Reset form
      setFormData({ fullname: "", phone: "", email: "", message: "" })

    } catch (error: any) {
      console.error("Lỗi:", error.message)
      toast.error(language === "vi" ? "Có lỗi xảy ra, vui lòng thử lại!" : "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 px-4 bg-[#050505] relative overflow-hidden font-sans scroll-mt-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <h2 className="text-6xl md:text-9xl font-black neon-text font-serif italic mb-6 text-white uppercase tracking-tighter">
            {language === "vi" ? data.title_vi : data.title_en}
          </h2>
          <p className="text-primary font-black uppercase tracking-[0.4em] italic text-sm md:text-base">
            {language === "vi" ? data.subtitle_vi : data.subtitle_en}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* CỘT TRÁI: INFO & TEAM */}
          {hasMedia && (
            <div className="lg:col-span-5 space-y-8">
              {data.banner_image && (
                <div className="relative rounded-[3rem] overflow-hidden h-72 border border-white/10 shadow-2xl group">
                  <img src={data.banner_image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Banner" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </div>
              )}

              <div className="space-y-4">
                {data.contacts?.map((person) => (
                  <div key={person.id} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center gap-6 hover:bg-white/[0.05] transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                      <UserCheck size={28} />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl leading-none mb-2">{person.name}</h4>
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3 italic">{language === "vi" ? person.role_vi : person.role_en}</p>
                      <div className="flex flex-col gap-2 text-sm text-gray-400">
                        <a href={`mailto:${person.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={14}/> {person.email}</a>
                        <a href={`tel:${person.phone}`} className="flex items-center gap-2 hover:text-white"><Phone size={14}/> {person.phone}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.map_embed_url && (
                <div className="rounded-[3rem] overflow-hidden h-72 border border-white/10 bg-[#111] shadow-2xl relative">
                  <iframe src={data.map_embed_url} className="w-full h-full border-none opacity-80 hover:opacity-100 transition-opacity" allowFullScreen loading="lazy"></iframe>
                </div>
              )}
            </div>
          )}

          {/* CỘT PHẢI: FORM ĐĂNG KÝ */}
          <div className={`${hasMedia ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}`}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="p-12 md:p-16 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(220,20,60,0.15)] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <h3 className="text-4xl font-black text-white mb-12 font-serif italic tracking-tighter">
                {language === "vi" ? "Đăng Ký Tham Gia" : "Register Now"}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-4 flex items-center gap-2"><User size={12}/> Fullname</label>
                    <input required value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/[0.08] outline-none transition-all font-bold" placeholder="VD: Quách Thành Long" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-4 flex items-center gap-2"><Smartphone size={12}/> Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/[0.08] outline-none transition-all font-bold" placeholder="090..." />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-4 flex items-center gap-2"><Mail size={12}/> Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/[0.08] outline-none transition-all font-bold" placeholder="long@example.com" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-4">Message</label>
                  <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-8 py-5 rounded-[2.5rem] bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/[0.08] outline-none transition-all font-medium resize-none" placeholder={language === "vi" ? "Lời nhắn của bạn..." : "Your message..."} />
                </div>
                
                <button disabled={loading} className="w-full py-7 bg-primary hover:bg-red-700 text-white rounded-3xl font-black uppercase tracking-[0.5em] text-xs shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4">
                  {loading ? <Loader2 className="animate-spin"/> : <Send size={20} />} 
                  {language === "vi" ? "GỬI ĐĂNG KÝ" : "SUBMIT REGISTRATION"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}