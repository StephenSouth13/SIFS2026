"use client"

import { useState } from "react"
import { PartnersSectionData, CmsSectionProps, PartnerGroup, PartnerBrand } from "@/types/cms"
import { Plus, Trash2, Upload, Building2, Link as LinkIcon, Loader2, Image as ImageIcon, LayoutGrid, ToggleLeft, ToggleRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function PartnersConfig({ data, updateData }: CmsSectionProps<PartnersSectionData>) {
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  // --- LOGIC MỚI: CHUYỂN CHẾ ĐỘ ---
  const toggleMode = () => {
    updateData({ ...data, use_single_image: !data.use_single_image })
    toast.info(`Đã chuyển sang chế độ ${!data.use_single_image ? 'Ảnh đơn toàn trang' : 'Danh sách logo rời'}`)
  }

  const addGroup = () => {
    const newGroup: PartnerGroup = {
      id: `group-${Date.now()}`,
      group_name_vi: "Nhóm đối tác mới",
      group_name_en: "New Partner Group",
      brands: []
    }
    updateData({ ...data, groups: [...(data.groups || []), newGroup] })
  }

  const addBrand = (groupId: string) => {
    const newBrand: PartnerBrand = {
      id: `brand-${Date.now()}`,
      name: "",
      logo_url: "",
      website_url: ""
    }
    const updatedGroups = (data.groups || []).map(g => 
      g.id === groupId ? { ...g, brands: [...g.brands, newBrand] } : g
    )
    updateData({ ...data, groups: updatedGroups })
  }

  const updateBrand = (groupId: string, brandId: string, fields: Partial<PartnerBrand>) => {
    const updatedGroups = data.groups.map(g => {
      if (g.id === groupId) {
        return { ...g, brands: g.brands.map(b => b.id === brandId ? { ...b, ...fields } : b) }
      }
      return g
    })
    updateData({ ...data, groups: updatedGroups })
  }

  return (
    <div className="space-y-10 pb-24 text-slate-900">
      {/* HEADER & TOGGLE MODE */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="space-y-1">
          <h3 className="text-xl font-black italic uppercase text-primary flex items-center gap-2">
            <Building2 /> Hệ thống Đối tác & Tài trợ
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SIFS 2026 CMS Edition</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className={`text-[9px] font-black uppercase ${!data.use_single_image ? 'text-primary' : 'text-slate-400'}`}>Từng Logo</span>
            <button onClick={toggleMode} className="text-primary hover:scale-110 transition-transform">
              {data.use_single_image ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-300" />}
            </button>
            <span className={`text-[9px] font-black uppercase ${data.use_single_image ? 'text-primary' : 'text-slate-400'}`}>Một Ảnh Duy Nhất</span>
          </div>
          
          {!data.use_single_image && (
            <button onClick={addGroup} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-primary transition-colors">
              <Plus size={14}/> Thêm nhóm mới
            </button>
          )}
        </div>
      </div>

      {/* --- CHẾ ĐỘ 1: DÙNG MỘT ẢNH DUY NHẤT --- */}
      {data.use_single_image ? (
        <div className="bg-white p-10 rounded-[3rem] border-4 border-dashed border-slate-100 space-y-6 flex flex-col items-center">
          <div className="text-center space-y-2">
            <p className="text-xs font-black uppercase italic text-slate-400">Tải lên tấm ảnh chứa tất cả Logo (Design sẵn)</p>
          </div>
          
          <label className="w-full max-w-4xl aspect-[21/9] bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative hover:border-primary transition-all">
            {data.single_image_url ? (
              <img src={data.single_image_url} className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <ImageIcon size={48} className="text-slate-200" />
                <span className="text-[10px] font-black uppercase text-slate-400">Click để tải ảnh toàn trang</span>
              </div>
            )}
            
            <input type="file" className="hidden" onChange={async (e) => {
              if (!e.target.files?.[0]) return;
              setUploadingId('single-image');
              const path = `partners/single-${Date.now()}.png`;
              await supabase.storage.from('sifs-images').upload(path, e.target.files[0]);
              const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path);
              updateData({ ...data, single_image_url: publicUrl });
              setUploadingId(null);
            }} />
            
            {uploadingId === 'single-image' && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={32}/>
              </div>
            )}
          </label>
        </div>
      ) : (
        /* --- CHẾ ĐỘ 2: THÊM MỚI TỪNG NHÓM (DỮ LIỆU CŨ CỦA LONG) --- */
        <div className="grid gap-10">
          {data.groups?.map((group) => (
            <div key={group.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6 relative group">
              <button 
                onClick={() => updateData({...data, groups: data.groups.filter(g => g.id !== group.id)})}
                className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18}/>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="bg-slate-50 p-4 rounded-xl text-xs font-black uppercase italic border-none focus:ring-2 focus:ring-primary" 
                  value={group.group_name_vi} 
                  onChange={e => {
                    const updated = data.groups.map(g => g.id === group.id ? {...g, group_name_vi: e.target.value} : g)
                    updateData({...data, groups: updated})
                  }}
                />
                <input 
                  className="bg-slate-50 p-4 rounded-xl text-xs font-black uppercase italic border-none text-blue-600" 
                  value={group.group_name_en}
                  onChange={e => {
                    const updated = data.groups.map(g => g.id === group.id ? {...g, group_name_en: e.target.value} : g)
                    updateData({...data, groups: updated})
                  }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.brands.map((brand) => (
                  <div key={brand.id} className="relative p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 group/brand">
                    <label className="aspect-video bg-white rounded-xl border border-dashed border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden relative">
                      {brand.logo_url ? <img src={brand.logo_url} className="object-contain p-2 h-full" /> : <Upload size={16} className="text-slate-300"/>}
                      <input type="file" className="hidden" onChange={async (e) => {
                        if (!e.target.files?.[0]) return;
                        setUploadingId(brand.id);
                        const path = `brands/${Date.now()}.png`;
                        await supabase.storage.from('sifs-images').upload(path, e.target.files[0]);
                        const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path);
                        updateBrand(group.id, brand.id, { logo_url: publicUrl });
                        setUploadingId(null);
                      }} />
                      {uploadingId === brand.id && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={14}/></div>}
                    </label>
                    <input className="w-full text-[9px] font-black uppercase bg-transparent border-b border-slate-200 outline-none" placeholder="Tên đối tác" value={brand.name} onChange={e => updateBrand(group.id, brand.id, { name: e.target.value })} />
                    <button onClick={() => {
                        const updated = group.brands.filter(b => b.id !== brand.id)
                        const updatedGroups = data.groups.map(g => g.id === group.id ? {...g, brands: updated} : g)
                        updateData({...data, groups: updatedGroups})
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover/brand:opacity-100 transition-all"
                    >
                      <Plus size={10} className="rotate-45" />
                    </button>
                  </div>
                ))}
                <button onClick={() => addBrand(group.id)} className="aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:text-primary transition-all">
                  <Plus size={20}/><span className="text-[8px] font-black uppercase mt-1">Thêm Logo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}