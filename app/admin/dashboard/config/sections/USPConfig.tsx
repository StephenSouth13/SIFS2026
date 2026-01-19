"use client";

import { USPSectionData, CmsSectionProps, ComparisonRow } from "@/types/cms";
import { Plus, Trash2, ShieldCheck } from "lucide-react";

export default function USPConfig({ data, updateData }: CmsSectionProps<USPSectionData>) {
  const addRow = () => {
    const newRow: ComparisonRow = {
      id: Math.random().toString(36).slice(2),
      aspect_vi: "", aspect_en: "",
      traditional_vi: "", traditional_en: "",
      sifs_vi: "", sifs_en: ""
    };
    updateData({ ...data, comparison: [...(data.comparison || []), newRow] });
  };

  const removeRow = (id: string) => {
    updateData({ ...data, comparison: data.comparison.filter(r => r.id !== id) });
  };

  const updateRow = (id: string, fields: any) => {
    updateData({
      ...data,
      comparison: data.comparison.map(r => r.id === id ? { ...r, ...fields } : r)
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm">
        <h3 className="font-black text-primary uppercase italic flex items-center gap-2">
          <ShieldCheck size={18}/> Bảng so sánh lợi thế (USP)
        </h3>
        <button onClick={addRow} className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase hover:scale-105 transition">
          Thêm dòng so sánh
        </button>
      </div>

      <div className="space-y-4">
        {data.comparison?.map((row) => (
          <div key={row.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative group grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={() => removeRow(row.id)} className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
              <Trash2 size={12}/>
            </button>
            
            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase">Đặc điểm (Khía cạnh)</label>
              <input className="w-full mt-1 px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold" value={row.aspect_vi} onChange={e => updateRow(row.id, { aspect_vi: e.target.value })} placeholder="VD: Công nghệ" />
            </div>
            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase">Truyền thống</label>
              <input className="w-full mt-1 px-4 py-2 bg-slate-50 rounded-xl text-xs" value={row.traditional_vi} onChange={e => updateRow(row.id, { traditional_vi: e.target.value })} placeholder="VD: Chậm chạp" />
            </div>
            <div className="bg-primary/5 p-2 rounded-xl border border-primary/10">
              <label className="text-[9px] font-black text-primary uppercase">SIFS 2026 (Ưu điểm)</label>
              <input className="w-full mt-1 px-4 py-2 bg-white rounded-lg text-xs font-black" value={row.sifs_vi} onChange={e => updateRow(row.id, { sifs_vi: e.target.value })} placeholder="VD: Tốc độ cao" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}