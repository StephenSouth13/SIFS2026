"use client";

import React from "react";
import { BoothMapSectionData, BoothArea, CmsSectionProps } from "@/types/cms";
import { Image as ImageIcon, Layout, Type, Palette } from "lucide-react";

export default function BoothMapConfig({ data, updateData }: CmsSectionProps<BoothMapSectionData>) {
  if (!data) return null;

  const updateArea = (id: string, field: Partial<BoothArea>) => {
    const next = data.areas.map(a => a.id === id ? { ...a, ...field } : a);
    updateData({ ...data, areas: next });
  };

  return (
    <div className="space-y-8">
      {/* Cấu hình hiển thị Sơ đồ */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase text-sm tracking-widest">
            <Layout className="text-primary" size={18} /> Chế độ hiển thị Sơ đồ
          </h3>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => updateData({...data, use_image: false})}
              className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${!data.use_image ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
            >DÙNG SVG (CODE)</button>
            <button 
              onClick={() => updateData({...data, use_image: true})}
              className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${data.use_image ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
            >DÙNG ẢNH UPLOAD</button>
          </div>
        </div>

        {data.use_image && (
          <div className="space-y-4 animate-in slide-in-from-top-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">URL Ảnh Sơ đồ (JPG/PNG)</label>
            <div className="flex gap-4">
              <input 
                className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 font-mono text-xs outline-none focus:ring-2 ring-primary/20" 
                value={data.map_image_url || ""} 
                onChange={e => updateData({...data, map_image_url: e.target.value})}
                placeholder="https://your-domain.com/map.jpg"
              />
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 overflow-hidden">
                {data.map_image_url ? <img src={data.map_image_url} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Danh sách 5 Khu vực */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.areas.map((area) => (
          <div key={area.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                className="w-10 h-10 rounded-full border-none cursor-pointer"
                value={area.color_code}
                onChange={e => updateArea(area.id, {color_code: e.target.value})}
              />
              <div className="flex-1">
                 <input className="w-full font-black text-lg outline-none" value={area.name_vi} onChange={e => updateArea(area.id, {name_vi: e.target.value})} />
                 <input className="w-full text-[10px] font-bold text-blue-500 uppercase outline-none" value={area.name_en} onChange={e => updateArea(area.id, {name_en: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-gray-50">
                <textarea className="w-full text-xs text-gray-500 bg-gray-50 p-3 rounded-xl outline-none" value={area.description_vi} onChange={e => updateArea(area.id, {description_vi: e.target.value})} rows={2} placeholder="Mô tả VI" />
                <textarea className="w-full text-[10px] text-gray-400 bg-gray-50 p-3 rounded-xl outline-none italic" value={area.description_en} onChange={e => updateArea(area.id, {description_en: e.target.value})} rows={1} placeholder="Desc EN" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}