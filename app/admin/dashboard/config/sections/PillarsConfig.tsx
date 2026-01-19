"use client";

import { PillarsSectionData, CmsSectionProps } from "@/types/cms";
import { Plus, Trash2, Type, AlignLeft, icons } from "lucide-react";

export default function PillarsConfig({ data, updateData }: CmsSectionProps<PillarsSectionData>) {
  const addPillar = () => {
    const newPillar = {
      id: Math.random().toString(36).slice(2),
      title_vi: "", title_en: "",
      description_vi: "", description_en: "",
      icon_name: "Cpu"
    };
    updateData({ ...data, pillars: [...(data.pillars || []), newPillar] });
  };

  const removePillar = (id: string) => {
    updateData({ ...data, pillars: data.pillars.filter(p => p.id !== id) });
  };

  const updatePillar = (id: string, fields: any) => {
    updateData({
      ...data,
      pillars: data.pillars.map(p => p.id === id ? { ...p, ...fields } : p)
    });
  };

  return (
    <div className="space-y-8 text-slate-900">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h3 className="font-black text-lg uppercase italic text-primary">Cấu hình Trụ cột</h3>
          <p className="text-xs text-slate-400">Tối đa nên để 4 trụ cột để layout đẹp nhất</p>
        </div>
        <button onClick={addPillar} className="bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 hover:scale-105 transition">
          <Plus size={14}/> Thêm Trụ Cột
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data.pillars?.map((pillar, idx) => (
          <div key={pillar.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group">
            <button onClick={() => removePillar(pillar.id)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors">
              <Trash2 size={18}/>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Icon & Title */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400">Icon (Tên Lucide Icon)</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono"
                  value={pillar.icon_name}
                  onChange={e => updatePillar(pillar.id, { icon_name: e.target.value })}
                  placeholder="Ví dụ: Cpu, Rocket, Users..."
                />
              </div>

              {/* VI Content */}
              <div className="space-y-4 bg-red-50/30 p-4 rounded-2xl border border-red-100/50">
                <span className="text-[9px] font-black text-primary uppercase italic">Tiếng Việt</span>
                <input 
                  className="w-full px-4 py-2 rounded-lg bg-white text-xs font-bold shadow-sm"
                  value={pillar.title_vi}
                  onChange={e => updatePillar(pillar.id, { title_vi: e.target.value })}
                  placeholder="Tiêu đề (VI)"
                />
                <textarea 
                  className="w-full px-4 py-2 rounded-lg bg-white text-[10px] italic shadow-sm"
                  value={pillar.description_vi}
                  onChange={e => updatePillar(pillar.id, { description_vi: e.target.value })}
                  placeholder="Mô tả ngắn (VI)"
                />
              </div>

              {/* EN Content */}
              <div className="space-y-4 bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50">
                <span className="text-[9px] font-black text-blue-500 uppercase italic">English</span>
                <input 
                  className="w-full px-4 py-2 rounded-lg bg-white text-xs font-bold shadow-sm"
                  value={pillar.title_en}
                  onChange={e => updatePillar(pillar.id, { title_en: e.target.value })}
                  placeholder="Title (EN)"
                />
                <textarea 
                  className="w-full px-4 py-2 rounded-lg bg-white text-[10px] italic shadow-sm"
                  value={pillar.description_en}
                  onChange={e => updatePillar(pillar.id, { description_en: e.target.value })}
                  placeholder="Description (EN)"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}