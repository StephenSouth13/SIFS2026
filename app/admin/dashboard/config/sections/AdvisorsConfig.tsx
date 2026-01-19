"use client";

import React from "react";
import { AdvisorsSectionData, AdvisorItem, CmsSectionProps } from "@/types/cms";
import { Plus, Trash2, User, Building } from "lucide-react";

export default function AdvisorsConfig({ data, updateData }: CmsSectionProps<AdvisorsSectionData>) {
  if (!data) return null;

  const updateAdvisor = (id: string, field: Partial<AdvisorItem>) => {
    const next = data.advisors.map(a => a.id === id ? { ...a, ...field } : a);
    updateData({ ...data, advisors: next });
  };

  const addAdvisor = () => {
    const newItem: AdvisorItem = {
      id: Date.now().toString(),
      name_vi: "Tên mới", name_en: "New Name",
      role_vi: "Chức vụ", role_en: "Role",
      image: ""
    };
    updateData({ ...data, advisors: [...data.advisors, newItem] });
  };

  return (
    <div className="space-y-12">
      {/* Header Config */}
      <div className="grid grid-cols-2 gap-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">Tiêu đề & Phụ đề (VI)</h4>
          <input className="w-full px-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 outline-none focus:ring-2 ring-primary/20 font-bold" 
                 value={data.title_vi} onChange={e => updateData({...data, title_vi: e.target.value})} />
          <textarea className="w-full px-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 outline-none focus:ring-2 ring-primary/20 text-sm" 
                    value={data.subtitle_vi} onChange={e => updateData({...data, subtitle_vi: e.target.value})} rows={2} />
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 italic">Title & Subtitle (EN)</h4>
          <input className="w-full px-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 outline-none focus:ring-2 ring-blue-50 font-bold" 
                 value={data.title_en} onChange={e => updateData({...data, title_en: e.target.value})} />
          <textarea className="w-full px-4 py-3 rounded-xl border border-gray-50 bg-gray-50/50 outline-none focus:ring-2 ring-blue-50 text-sm" 
                    value={data.subtitle_en} onChange={e => updateData({...data, subtitle_en: e.target.value})} rows={2} />
        </div>
      </div>

      {/* Advisors List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-gray-900 flex items-center gap-3">
            <User className="text-primary" /> DANH SÁCH BAN CỐ VẤN
          </h3>
          <button onClick={addAdvisor} className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-primary transition-colors">
            <Plus size={16} /> THÊM CỐ VẤN
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.advisors.map((advisor) => (
            <div key={advisor.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex gap-6 group">
              <div className="w-32 h-40 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                {advisor.image ? <img src={advisor.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><User /></div>}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-3">
                   <input className="w-full font-bold outline-none border-b border-gray-50 focus:border-primary pb-1" value={advisor.name_vi} onChange={e => updateAdvisor(advisor.id, {name_vi: e.target.value})} placeholder="Tên (VI)" />
                   <textarea className="w-full text-xs text-gray-500 outline-none bg-gray-50 p-3 rounded-xl" value={advisor.role_vi} onChange={e => updateAdvisor(advisor.id, {role_vi: e.target.value})} placeholder="Vai trò (VI)" rows={3} />
                </div>
                <div className="space-y-3">
                   <input className="w-full font-bold text-blue-600 outline-none border-b border-gray-50 focus:border-blue-300 pb-1" value={advisor.name_en} onChange={e => updateAdvisor(advisor.id, {name_en: e.target.value})} placeholder="Name (EN)" />
                   <textarea className="w-full text-xs text-gray-400 outline-none bg-gray-50 p-3 rounded-xl" value={advisor.role_en} onChange={e => updateAdvisor(advisor.id, {role_en: e.target.value})} placeholder="Role (EN)" rows={3} />
                </div>
              </div>
              <button onClick={() => updateData({...data, advisors: data.advisors.filter(a => a.id !== advisor.id)})} className="self-start p-2 text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Partners List */}
      <div className="bg-gray-900 p-8 rounded-[2.5rem] space-y-6">
        <h3 className="font-black text-white flex items-center gap-3">
          <Building className="text-secondary" /> ĐỐI TÁC CHIẾN LƯỢC
        </h3>
        <textarea 
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-mono text-sm outline-none focus:border-secondary"
          value={data.partners.join(", ")}
          onChange={e => updateData({...data, partners: e.target.value.split(",").map(s => s.trim())})}
          placeholder="Nhập tên đối tác, cách nhau bằng dấu phẩy..."
          rows={3}
        />
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Mẹo: Cách nhau bằng dấu phẩy (Ví dụ: SIHUB, UEH, VCCI)</p>
      </div>
    </div>
  );
}