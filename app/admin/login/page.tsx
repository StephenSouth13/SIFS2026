"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Lock, Mail, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password: password 
      })

      if (error) {
        toast.error(error.message === "Invalid login credentials" ? "Sai tài khoản hoặc mật khẩu!" : error.message)
      } else if (data.user) {
        toast.success("Đăng nhập thành công!")
        // Ép trình duyệt reload hoàn toàn để cập nhật Cookie cho Middleware
        window.location.href = "/admin/dashboard"
      }
    } catch (err) {
      toast.error("Lỗi kết nối hệ thống.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 text-white relative">
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full translate-x-[-10%]" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md">
        <div className="glass-tet p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-2 font-serif italic tracking-tighter text-white">SIFS <span className="text-primary italic">2026</span></h1>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Cổng quản trị viên</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="email" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary transition-all text-sm" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="password" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary transition-all text-sm" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <button disabled={loading} className="w-full bg-primary py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="animate-spin text-white" size={20} /> : "Truy cập Dashboard"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}