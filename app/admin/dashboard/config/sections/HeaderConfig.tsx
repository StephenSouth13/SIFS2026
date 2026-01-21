"use client"

import { useState } from "react"
import { HeaderSectionData, CmsSectionProps } from "@/types/cms"
import { Upload, Type, MousePointer2, Trash2, Image as ImageIcon } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function HeaderConfig({ data, updateData }: CmsSectionProps<HeaderSectionData>) {
  const [uploading, setUploading] = useState(false)
  const safeData = data || { logo_url: "", logo_text: "SIFS", register_text_vi: "Đăng ký", register_text_en: "Register" }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!e.target.files?.[0]) return
      const file = e.target.files[0]
      const path = `logos/header-${Date.now()}.png`
      await supabase.storage.from('sifs-images').upload(path, file)
      const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path)
      updateData({ ...safeData, logo_url: publicUrl })
      toast.success("Đã tải logo header!")
    } catch (err: any) { toast.error(err.message) } finally { setUploading(false) }
  }

  return (
    <div className="space-y-10 pb-24 font-sans text-slate-900">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-sm font-black uppercase italic text-primary flex items-center gap-2"><ImageIcon size={18}/> Logo & Thương hiệu Header</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ảnh Logo (PNG/SVG)</label>
            <div className="h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl relative flex items-center justify-center group">
              {safeData.logo_url ? <img src={safeData.logo_url} className="h-16 object-contain" /> : <Upload className="text-slate-300" size={32} />}
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all rounded-3xl">
                <Upload className="text-white mb-2" size={20} />
                <input type="file" className="hidden" onChange={handleUpload} />
              </label>
            </div>
            {safeData.logo_url && <button onClick={() => updateData({...safeData, logo_url: ""})} className="text-[9px] font-black text-red-500 uppercase ml-4 hover:underline">Xóa ảnh logo</button>}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Tên Logo (Chữ)</label>
              <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase" 
                     value={safeData.logo_text} onChange={e => updateData({...safeData, logo_text: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nút CTA (VI / EN)</label>
              <div className="flex gap-3">
                <input className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold" 
                       value={safeData.register_text_vi} onChange={e => updateData({...safeData, register_text_vi: e.target.value})} />
                <input className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-blue-600" 
                       value={safeData.register_text_en} onChange={e => updateData({...safeData, register_text_en: e.target.value})} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}