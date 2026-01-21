"use client";

import { useState } from "react";
import { BoothMapSectionData, CmsSectionProps, BoothArea, BoothItem } from "@/types/cms";
import { Plus, Trash2, Upload, Loader2, MapPin, Type, AlignLeft, Info, LayoutGrid } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function BoothMapConfig({ data, updateData }: CmsSectionProps<BoothMapSectionData>) {
  const [uploading, setUploading] = useState(false);

  // --- 1. XỬ LÝ UPLOAD ẢNH ---
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `booth-map-${Date.now()}.${fileExt}`;
      const filePath = `maps/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('sifs-images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(filePath);
      updateData({ ...data, map_image_url: publicUrl });
      toast.success("Đã cập nhật ảnh sơ đồ!");
    } catch (error: any) {
      toast.error("Lỗi upload: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // --- 2. XỬ LÝ ZONE (KHU VỰC LỚN) ---
  const addZone = () => {
    const newZone: BoothArea = {
      id: `zone-${Date.now()}`,
      name_vi: "Khu vực mới",
      name_en: "New Area",
      color_code: "#D4AF37",
      description_vi: "",
      description_en: "",
      booths: [] 
    };
    const currentAreas = Array.isArray(data?.areas) ? data.areas : [];
    updateData({ ...data, areas: [...currentAreas, newZone] });
  };

  const updateZone = (id: string, fields: Partial<BoothArea>) => {
    const nextAreas = (data.areas || []).map((a: BoothArea) => 
      a.id === id ? { ...a, ...fields } : a
    );
    updateData({ ...data, areas: nextAreas });
  };

  const removeZone = (id: string) => {
    updateData({ ...data, areas: data.areas.filter((a: BoothArea) => a.id !== id) });
  };

  // --- 3. XỬ LÝ BOOTH (GIAN HÀNG CON TRONG ZONE) ---
  const addBooth = (zoneId: string) => {
    const newBooth: BoothItem = {
      id: `booth-${Date.now()}`,
      label: "A01",
      name_vi: "Tên gian hàng",
      name_en: "Booth Name"
    };

    const nextAreas = (data.areas || []).map((zone: BoothArea) => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          booths: [...(zone.booths || []), newBooth]
        };
      }
      return zone;
    });
    updateData({ ...data, areas: nextAreas });
  };

  const updateBooth = (zoneId: string, boothId: string, fields: Partial<BoothItem>) => {
    const nextAreas = (data.areas || []).map((zone: BoothArea) => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          booths: (zone.booths || []).map((b: BoothItem) => 
            b.id === boothId ? { ...b, ...fields } : b
          )
        };
      }
      return zone;
    });
    updateData({ ...data, areas: nextAreas });
  };

  const removeBooth = (zoneId: string, boothId: string) => {
    const nextAreas = (data.areas || []).map((zone: BoothArea) => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          booths: (zone.booths || []).filter((b: BoothItem) => b.id !== boothId)
        };
      }
      return zone;
    });
    updateData({ ...data, areas: nextAreas });
  };

  return (
    <div className="space-y-10 pb-20 text-slate-900 font-sans">
      {/* PHẦN 1: ẢNH SƠ ĐỒ */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <h3 className="text-sm font-black uppercase italic mb-6 flex items-center gap-2 text-primary">
          <MapPin size={18} /> Ảnh Sơ Đồ Mặt Bằng (Master Map)
        </h3>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 relative group">
            {data.map_image_url ? (
              <img src={data.map_image_url} alt="Preview" className="w-full h-full object-contain bg-slate-900" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-xs uppercase italic">Chưa có ảnh bản đồ</div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4 w-full">
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
              * Tải lên ảnh sơ đồ để khách hàng đối chiếu vị trí các Zone và Booth.
            </p>
            <label className="block w-full py-4 bg-slate-900 text-white rounded-2xl text-center text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-primary transition-all shadow-lg shadow-slate-200">
              {uploading ? "ĐANG TẢI LÊN..." : "THAY ĐỔI ẢNH BẢN ĐỒ"}
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
            </label>
          </div>
        </div>
      </div>

      {/* PHẦN 2: QUẢN LÝ ZONE & BOOTH */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <h4 className="text-[10px] font-black uppercase text-slate-400 italic flex items-center gap-2">
            <LayoutGrid size={14} /> Cấu trúc Zone & Gian hàng chi tiết
          </h4>
          <button onClick={addZone} className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-primary/20">
            <Plus size={14} /> Thêm Zone Mới
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {(data.areas || []).map((zone: BoothArea, index: number) => (
            <div key={zone.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button onClick={() => removeZone(zone.id)} className="absolute -top-3 -right-3 p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110">
                <Trash2 size={16} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Header Zone */}
                <div className="md:col-span-2 flex flex-col items-center border-r border-slate-100 pr-6 gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl italic shadow-sm" 
                       style={{ backgroundColor: `${zone.color_code}20`, color: zone.color_code, border: `2px solid ${zone.color_code}40` }}>
                    {index + 1}
                  </div>
                  <input type="color" className="w-10 h-10 rounded-lg cursor-pointer bg-transparent" value={zone.color_code} onChange={e => updateZone(zone.id, { color_code: e.target.value })} />
                </div>

                {/* Thông tin Zone */}
                <div className="md:col-span-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full px-5 py-3 bg-slate-50 rounded-xl text-xs font-black text-slate-900 border" 
                           value={zone.name_vi} onChange={e => updateZone(zone.id, { name_vi: e.target.value })} placeholder="Tên Zone (VI)" />
                    <input className="w-full px-5 py-3 bg-slate-50 rounded-xl text-xs font-black text-blue-600 border" 
                           value={zone.name_en} onChange={e => updateZone(zone.id, { name_en: e.target.value })} placeholder="Zone Name (EN)" />
                  </div>
                  
                  <textarea className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-[11px] font-medium border min-h-30" 
                            value={zone.description_vi} onChange={e => updateZone(zone.id, { description_vi: e.target.value })} placeholder="Mô tả khu vực (VI)..." />

                  {/* DANH SÁCH GIAN HÀNG CON */}
                  <div className="mt-6 p-6 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">Danh sách gian hàng</span>
                      <button onClick={() => addBooth(zone.id)} className="text-[9px] font-black text-primary flex items-center gap-1 hover:underline">
                        <Plus size={12} /> THÊM GIAN HÀNG
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {(zone.booths || []).map((booth: BoothItem) => (
                        <div key={booth.id} className="flex flex-wrap md:flex-nowrap gap-3 items-center bg-white p-3 rounded-xl border shadow-sm">
                          <input className="w-20 px-3 py-2 bg-slate-100 rounded-lg text-[10px] font-black text-primary outline-none" 
                                 value={booth.label} onChange={e => updateBooth(zone.id, booth.id, { label: e.target.value })} placeholder="Mã" />
                          <input className="flex-1 px-3 py-2 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-900" 
                                 value={booth.name_vi} onChange={e => updateBooth(zone.id, booth.id, { name_vi: e.target.value })} placeholder="Tên đơn vị (VI)" />
                          <input className="flex-1 px-3 py-2 bg-slate-50 rounded-lg text-[10px] font-bold text-blue-500" 
                                 value={booth.name_en} onChange={e => updateBooth(zone.id, booth.id, { name_en: e.target.value })} placeholder="Name (EN)" />
                          <button onClick={() => removeBooth(zone.id, booth.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}