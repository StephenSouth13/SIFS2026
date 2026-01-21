"use client"

import { useState } from "react"
import { FooterSectionData, CmsSectionProps } from "@/types/cms"
import { Facebook, MessageSquare, Mail, Phone, Type, Copyright, Upload, Image as ImageIcon, Trash2, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function FooterConfig({ data, updateData }: CmsSectionProps<FooterSectionData>) {
  const [uploading, setUploading] = useState(false)

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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!e.target.files || e.target.files.length === 0) return
      const file = e.target.files[0]
      const path = `logos/footer-${Date.now()}.png`
      const { error } = await supabase.storage.from('sifs-images').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path)
      updateData({ ...safeData, logo_url: publicUrl })
      toast.success("Đã tải logo footer thành công!")
    } catch (err: any) {
      toast.error(err.message)
    } finally { setUploading(false) }
  }

  const removeLogo = () => {
    updateData({ ...safeData, logo_url: "" });
    toast.info("Đã gỡ logo ảnh. Hệ thống sẽ dùng logo chữ.");
  }

  const updateField = (field: string, value: string) => {
    updateData({ ...safeData, [field]: value });
  };

  return (
    <div className="space-y-10 pb-24 font-sans text-slate-900">
      {/* 1. BRANDING & LOGO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-sm font-black uppercase italic text-primary flex items-center gap-2"><Type size={18}/> Branding & Logo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ảnh Logo Footer</label>
              {safeData.logo_url && (
                <button onClick={removeLogo} className="text-[9px] font-black text-red-500 hover:underline flex items-center gap-1">
                  <Trash2 size={10} /> GỠ ẢNH
                </button>
              )}
            </div>
            <div className="h-40 bg-slate-50 rounded-3xl overflow-hidden relative border-2 border-dashed border-slate-200 group flex items-center justify-center">
              {uploading ? (
                <Loader2 className="animate-spin text-primary" />
              ) : safeData.logo_url ? (
                <img src={safeData.logo_url} className="h-20 object-contain" alt="Current Logo" />
              ) : (
                <div className="text-center">
                  <ImageIcon className="text-slate-300 mx-auto mb-2" size={40} />
                  <p className="text-[9px] font-black text-slate-400 uppercase">Chưa có ảnh logo</p>
                </div>
              )}
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all cursor-pointer">
                <Upload className="text-white mb-2" size={20} />
                <span className="text-white text-[9px] font-black uppercase">Tải Logo mới</span>
                <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Tên thương hiệu (Xóa trắng để ẩn)</label>
            <input 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase outline-none focus:border-primary" 
              value={safeData.logo_text} 
              onChange={e => updateField("logo_text", e.target.value)} 
              placeholder="VD: SIFS 2026" 
            />
            <p className="text-[9px] text-slate-400 font-medium leading-relaxed px-4">
              * Mẹo: Nếu bạn đã tải Logo ảnh, bạn có thể xóa trắng phần này để giao diện gọn gàng hơn.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Mô tả ngắn (VI)</label>
            <textarea className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-medium leading-relaxed outline-none focus:border-primary" 
                      value={safeData.description_vi} onChange={e => updateField("description_vi", e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 text-blue-600">Description (EN)</label>
            <textarea className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-medium text-blue-600 leading-relaxed outline-none focus:border-primary" 
                      value={safeData.description_en} onChange={e => updateField("description_en", e.target.value)} />
          </div>
        </div>
      </div>

      {/* 2. SOCIAL & CONTACT */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-sm font-black uppercase italic text-primary flex items-center gap-2"><Facebook size={18}/> Kết nối Mạng xã hội</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2"><Facebook size={14} className="text-blue-600"/> Link Facebook</label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold outline-none focus:border-primary" value={safeData.facebook_url} onChange={e => updateField("facebook_url", e.target.value)} placeholder="Để trống để ẩn icon..." />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2"><MessageSquare size={14} className="text-teal-600"/> Link Zalo (Me/OA)</label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-teal-600 outline-none focus:border-primary" value={safeData.zalo_url} onChange={e => updateField("zalo_url", e.target.value)} placeholder="Để trống để ẩn icon..." />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2"><Mail size={14}/> Email Footer</label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold outline-none focus:border-primary" value={safeData.email} onChange={e => updateField("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2"><Phone size={14}/> Hotline Footer</label>
            <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-primary outline-none focus:border-primary" value={safeData.phone} onChange={e => updateField("phone", e.target.value)} />
          </div>
        </div>
      </div>

      {/* 3. BẢN QUYỀN */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-black uppercase italic text-primary flex items-center gap-2"><Copyright size={18}/> Thông tin bản quyền</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold outline-none focus:border-primary" value={safeData.copyright_vi} onChange={e => updateField("copyright_vi", e.target.value)} />
          <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold text-blue-600 outline-none focus:border-primary" value={safeData.copyright_en} onChange={e => updateField("copyright_en", e.target.value)} />
        </div>
      </div>
    </div>
  )
}