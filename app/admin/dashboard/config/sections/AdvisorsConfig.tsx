"use client"

import { useState } from "react"
import { AdvisorsSectionData, AdvisorItem, CmsSectionProps } from "@/types/cms"
import { Plus, Trash2, Upload, Users, Building2, Image as ImageIcon, Loader2, FileText } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function AdvisorsConfig({ data, updateData }: CmsSectionProps<AdvisorsSectionData>) {
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  const addAdvisor = () => {
    const newItem: AdvisorItem = { 
      id: `adv-${Date.now()}`, 
      name_vi: "", name_en: "", 
      role_vi: "", role_en: "", 
      bio_vi: "", bio_en: "", // Khởi tạo bio
      image: "" 
    }
    updateData({ ...data, advisors: [...(data.advisors || []), newItem] })
  }

  const updateAdvisor = (id: string, fields: Partial<AdvisorItem>) => {
    const updated = data.advisors.map(a => a.id === id ? { ...a, ...fields } : a)
    updateData({ ...data, advisors: updated })
  }

  return (
    <div className="space-y-10 pb-24 font-sans text-slate-900">
      {/* HEADER CMS */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-black uppercase text-primary italic flex items-center gap-2"><Users size={18}/> Nội dung chính</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input className="px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-black" value={data.title_vi} onChange={e => updateData({...data, title_vi: e.target.value})} placeholder="Tiêu đề (VI)" />
           <input className="px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-black text-blue-600" value={data.title_en} onChange={e => updateData({...data, title_en: e.target.value})} placeholder="Title (EN)" />
        </div>
      </div>

      {/* ADVISORS LIST */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-6">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Danh sách ban cố vấn</h4>
          <button onClick={addAdvisor} className="bg-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-primary/20 hover:scale-105 transition-all">+ Thêm mới</button>
        </div>

        {data.advisors?.map((advisor) => (
          <div key={advisor.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8 group relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Ảnh */}
              <div className="lg:col-span-3">
                <label className="aspect-4/5 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group/img">
                  {advisor.image ? <img src={advisor.image} className="w-full h-full object-cover" /> : <ImageIcon size={40} className="text-slate-200" />}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all"><Upload className="text-white" /></div>
                  <input type="file" className="hidden" onChange={async (e) => {
                    if (!e.target.files?.[0]) return;
                    setUploadingId(advisor.id);
                    const path = `advisors/${Date.now()}.png`;
                    await supabase.storage.from('sifs-images').upload(path, e.target.files[0]);
                    const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path);
                    updateAdvisor(advisor.id, { image: publicUrl });
                    setUploadingId(null);
                  }} />
                  {uploadingId === advisor.id && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                </label>
              </div>

              {/* Thông tin */}
              <div className="lg:col-span-9 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input className="px-6 py-4 bg-slate-50 rounded-2xl text-xs font-black" value={advisor.name_vi} onChange={e => updateAdvisor(advisor.id, { name_vi: e.target.value })} placeholder="Tên (VI)" />
                  <input className="px-6 py-4 bg-slate-50 rounded-2xl text-xs font-black text-blue-600" value={advisor.name_en} onChange={e => updateAdvisor(advisor.id, { name_en: e.target.value })} placeholder="Name (EN)" />
                  <input className="px-6 py-4 bg-slate-100 rounded-2xl text-[11px] font-bold italic" value={advisor.role_vi} onChange={e => updateAdvisor(advisor.id, { role_vi: e.target.value })} placeholder="Chức danh (VI)" />
                  <input className="px-6 py-4 bg-slate-100 rounded-2xl text-[11px] font-bold italic text-blue-600" value={advisor.role_en} onChange={e => updateAdvisor(advisor.id, { role_en: e.target.value })} placeholder="Role (EN)" />
                </div>
                {/* BIO - CÁI NÀY LÀ MỚI */}
                <div className="grid grid-cols-2 gap-4">
                  <textarea className="px-6 py-4 bg-slate-50 rounded-2xl text-[11px] font-medium h-24" value={advisor.bio_vi} onChange={e => updateAdvisor(advisor.id, { bio_vi: e.target.value })} placeholder="Mô tả chi tiết cố vấn (VI)" />
                  <textarea className="px-6 py-4 bg-slate-50 rounded-2xl text-[11px] font-medium h-24 text-blue-600" value={advisor.bio_en} onChange={e => updateAdvisor(advisor.id, { bio_en: e.target.value })} placeholder="Bio description (EN)" />
                </div>
              </div>
            </div>
            <button onClick={() => updateData({...data, advisors: data.advisors.filter(a => a.id !== advisor.id)})} className="absolute top-6 right-6 p-3 text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
          </div>
        ))}
      </div>

      {/* PARTNERS - FIX LỖI TYPE 2322 */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-black uppercase text-primary italic flex items-center gap-2"><Building2 size={18}/> Đối tác chiến lược (Nhập tên, cách nhau bởi dấu phẩy)</h3>
        <textarea 
          className="w-full h-32 px-8 py-6 bg-slate-50 rounded-[2rem] text-xs font-bold leading-relaxed outline-none focus:ring-4 focus:ring-primary/5 border-none transition-all" 
          value={Array.isArray(data.partners) ? data.partners.join(", ") : ""} 
          onChange={e => updateData({...data, partners: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "")})}
          placeholder="SIHUB, UEH, VCCI, VINE, SMENTOR..."
        />
      </div>
    </div>
  )
}