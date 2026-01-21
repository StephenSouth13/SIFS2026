"use client"

import { useState } from "react"
import { FooterSectionData, CmsSectionProps } from "@/types/cms"
import { Facebook, MessageSquare, Mail, Phone, Type, Copyright, Upload, Image as ImageIcon, Trash2, Loader2, Info } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function FooterConfig({ data, updateData }: CmsSectionProps<FooterSectionData>) {
  const [uploading, setUploading] = useState(false)

  // Khởi tạo dữ liệu an toàn để tránh lỗi undefined
  const safeData = data || {
    logo_url: "",
    logo_text: "",
    description_vi: "",
    description_en: "",
    facebook_url: "",
    zalo_url: "",
    email: "",
    phone: "",
    copyright_vi: "",
    copyright_en: ""
  };

  // --- HÀM UPLOAD LOGO ---
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!e.target.files || e.target.files.length === 0) return
      
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const path = `logos/footer-${Date.now()}.${fileExt}`
      
      const { error } = await supabase.storage.from('sifs-images').upload(path, file)
      if (error) throw error
      
      const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path)
      
      updateData({ ...safeData, logo_url: publicUrl })
      toast.success("Đã tải logo footer thành công!")
    } catch (err: any) {
      toast.error("Lỗi: " + err.message)
    } finally { 
      setUploading(false) 
    }
  }

  // --- HÀM GỠ LOGO ---
  const removeLogo = () => {
    updateData({ ...safeData, logo_url: "" });
    toast.info("Đã gỡ logo ảnh. Hệ thống sẽ dùng logo chữ.");
  }

  const updateField = (field: string, value: string) => {
    updateData({ ...safeData, [field]: value });
  };

  return (
    <div className="space-y-10 pb-24 font-sans text-slate-900 animate-in fade-in duration-500">
      
      {/* 1. BRANDING & LOGO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-sm font-black uppercase italic text-primary flex items-center gap-2">
          <Type size={18}/> Thương hiệu & Logo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* KHU VỰC UPLOAD LOGO */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Logo Footer (Ảnh PNG/SVG)
              </label>
              {safeData.logo_url && (
                <button onClick={removeLogo} className="text-[9px] font-black text-red-500 hover:scale-105 transition-all flex items-center gap-1">
                  <Trash2 size={10} /> GỠ ẢNH HIỆN TẠI
                </button>
              )}
            </div>

            <div className="relative group">
              <label className={`h-48 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${
                safeData.logo_url 
                ? "border-primary/20 bg-white shadow-inner" 
                : "border-slate-200 bg-slate-50 hover:border-primary hover:bg-red-50/30"
              }`}>
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <span className="text-[10px] font-black text-primary animate-pulse uppercase">Đang tải...</span>
                  </div>
                ) : safeData.logo_url ? (
                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    <img src={safeData.logo_url} className="max-h-full max-w-full object-contain drop-shadow-xl" alt="Footer Logo" />
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all">
                      <Upload size={24} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Thay đổi ảnh</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <Upload className="text-slate-400 group-hover:text-primary transition-colors" size={28} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Nhấn để chọn ảnh</p>
                      <p className="text-[9px] text-slate-400 font-medium italic">Ưu tiên ảnh PNG không nền</p>
                    </div>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" disabled={uploading} />
              </label>
            </div>
          </div>

          {/* LOGO CHỮ & MÔ TẢ */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Tên thương hiệu (Dự phòng)
              </label>
              <input 
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black uppercase outline-none focus:border-primary transition-all" 
                value={safeData.logo_text} 
                onChange={e => updateField("logo_text", e.target.value)} 
                placeholder="VD: SIFS 2026" 
              />
            </div>
            <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-3">
              <Info size={16} className="text-blue-500 shrink-0" />
              <p className="text-[10px] text-blue-600 font-medium leading-relaxed italic">
                * Nếu đã tải Logo ảnh, bạn có thể xóa trắng phần này để chỉ hiển thị ảnh.
              </p>
            </div>
          </div>
        </div>

        {/* MÔ TẢ NGẮN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Mô tả ngắn (VI)</label>
            <textarea className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-medium leading-relaxed outline-none focus:border-primary" 
                      value={safeData.description_vi} onChange={e => updateField("description_vi", e.target.value)} placeholder="Nhập mô tả tiếng Việt..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 text-blue-600">Short Description (EN)</label>
            <textarea className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-medium text-blue-600 leading-relaxed outline-none focus:border-primary" 
                      value={safeData.description_en} onChange={e => updateField("description_en", e.target.value)} placeholder="Enter English description..." />
          </div>
        </div>
      </div>

      {/* 2. SOCIAL & CONTACT */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-sm font-black uppercase italic text-primary flex items-center gap-2">
          <Facebook size={18}/> Kết nối Mạng xã hội & Liên hệ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2">
              <Facebook size={14} className="text-blue-600"/> Link Facebook
            </label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold outline-none focus:border-primary" 
                   value={safeData.facebook_url} onChange={e => updateField("facebook_url", e.target.value)} placeholder="https://facebook.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2">
              <MessageSquare size={14} className="text-teal-600"/> Link Zalo (Me/OA)
            </label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-teal-600 outline-none focus:border-primary" 
                   value={safeData.zalo_url} onChange={e => updateField("zalo_url", e.target.value)} placeholder="https://zalo.me/..." />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2"><Mail size={14}/> Email Footer</label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold outline-none focus:border-primary" 
                   value={safeData.email} onChange={e => updateField("email", e.target.value)} placeholder="info@sifs.vn" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2"><Phone size={14}/> Hotline Footer</label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-primary outline-none focus:border-primary" 
                   value={safeData.phone} onChange={e => updateField("phone", e.target.value)} placeholder="090..." />
          </div>
        </div>
      </div>

      {/* 3. BẢN QUYỀN */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-black uppercase italic text-primary flex items-center gap-2">
          <Copyright size={18}/> Thông tin bản quyền
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold outline-none focus:border-primary" 
                 value={safeData.copyright_vi} onChange={e => updateField("copyright_vi", e.target.value)} placeholder="Bản quyền Tiếng Việt..." />
          <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold text-blue-600 outline-none focus:border-primary" 
                 value={safeData.copyright_en} onChange={e => updateField("copyright_en", e.target.value)} placeholder="Copyright English..." />
        </div>
      </div>
    </div>
  )
}