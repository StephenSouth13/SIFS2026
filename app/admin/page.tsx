"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        router.replace("/admin/dashboard")
      } else {
        router.replace("/admin/login")
      }
    }
    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-white font-serif italic animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="tracking-widest uppercase text-[10px] font-black">Khởi tạo phiên quản trị SIFS...</p>
      </div>
    </div>
  )
}