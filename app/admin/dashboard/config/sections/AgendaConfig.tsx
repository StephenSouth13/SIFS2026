"use client";

import React from "react";
import { AgendaSectionData, AgendaDay, AgendaEvent, CmsSectionProps } from "@/types/cms";
import { Plus, Trash2, Clock, Calendar, Type, AlignLeft } from "lucide-react";

export default function AgendaConfig({ data, updateData }: CmsSectionProps<AgendaSectionData>) {
  // Đảm bảo data luôn có cấu trúc mảng để không bị lỗi .map
  const safeData = {
    title_vi: data?.title_vi || "",
    title_en: data?.title_en || "",
    days: data?.days || []
  };

  const addDay = () => {
    const newDay: AgendaDay = { 
      id: `day-${Date.now()}`, 
      date: "06/02/2026", 
      events: [] 
    };
    updateData({ ...safeData, days: [...safeData.days, newDay] });
  };

  const addEvent = (dayId: string) => {
    const newEvent: AgendaEvent = {
      id: `event-${Date.now()}`,
      time: "09:00 - 10:00",
      title_vi: "Tên hoạt động mới", 
      title_en: "New Activity Name",
      desc_vi: "Mô tả ngắn gọn về hoạt động", 
      desc_en: "Brief description of the activity"
    };
    const next = safeData.days.map(d => 
      d.id === dayId ? { ...d, events: [...d.events, newEvent] } : d
    );
    updateData({ ...safeData, days: next });
  };

  const updateEvent = (dayId: string, eventId: string, fields: Partial<AgendaEvent>) => {
    const next = safeData.days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          events: d.events.map(e => e.id === eventId ? { ...e, ...fields } : e)
        };
      }
      return d;
    });
    updateData({ ...safeData, days: next });
  };

  const removeDay = (dayId: string) => {
    updateData({ ...safeData, days: safeData.days.filter(d => d.id !== dayId) });
  };

  const removeEvent = (dayId: string, eventId: string) => {
    const next = safeData.days.map(d => 
      d.id === dayId ? { ...d, events: d.events.filter(e => e.id !== eventId) } : d
    );
    updateData({ ...safeData, days: next });
  };

  return (
    <div className="space-y-10 text-slate-900">
      {/* 1. Tiêu đề Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Type size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest italic">Tiêu đề chương trình</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="px-6 py-4 rounded-2xl bg-slate-50 font-bold outline-none border border-transparent focus:border-primary transition-all" 
                 value={safeData.title_vi} onChange={e => updateData({...safeData, title_vi: e.target.value})} placeholder="Tiêu đề tiếng Việt" />
          <input className="px-6 py-4 rounded-2xl bg-slate-50 font-bold outline-none border border-transparent focus:border-primary transition-all" 
                 value={safeData.title_en} onChange={e => updateData({...safeData, title_en: e.target.value})} placeholder="Title in English" />
        </div>
      </div>

      {/* 2. Quản lý các Ngày */}
      <div className="space-y-12">
        {safeData.days.map((day) => (
          <div key={day.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-md space-y-8 relative">
            <button onClick={() => removeDay(day.id)} className="absolute top-8 right-8 text-red-400 hover:text-red-600 transition-colors">
              <Trash2 size={20} />
            </button>

            <div className="flex items-center gap-4">
              <Calendar className="text-primary" />
              <div className="space-y-1">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ngày diễn ra</span>
                <input className="block bg-transparent font-black text-2xl outline-none border-b-2 border-slate-100 focus:border-primary" 
                       value={day.date} onChange={e => {
                         const next = safeData.days.map(d => d.id === day.id ? {...d, date: e.target.value} : d);
                         updateData({...safeData, days: next});
                       }} />
              </div>
            </div>

            {/* Danh sách sự kiện trong ngày */}
            <div className="grid grid-cols-1 gap-6">
              {day.events.map((event) => (
                <div key={event.id} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4 relative group">
                  <button onClick={() => removeEvent(day.id, event.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Time & Icon */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Clock size={14} />
                        <span className="text-[9px] font-black uppercase">Thời gian</span>
                      </div>
                      <input className="w-full px-4 py-2 bg-white rounded-xl text-xs font-bold border border-slate-100" 
                             value={event.time} onChange={e => updateEvent(day.id, event.id, {time: e.target.value})} placeholder="09:00 - 10:00" />
                    </div>

                    {/* Content VI */}
                    <div className="lg:col-span-3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase italic">Tên hoạt động (VI)</label>
                          <input className="w-full px-4 py-2 bg-white rounded-xl text-xs font-bold border border-slate-100" 
                                 value={event.title_vi} onChange={e => updateEvent(day.id, event.id, {title_vi: e.target.value})} />
                          <textarea className="w-full px-4 py-2 bg-white rounded-xl text-[11px] border border-slate-100 min-h-[60px]" 
                                    value={event.desc_vi} onChange={e => updateEvent(day.id, event.id, {desc_vi: e.target.value})} placeholder="Mô tả tiếng Việt..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-primary uppercase italic">Activity Name (EN)</label>
                          <input className="w-full px-4 py-2 bg-white rounded-xl text-xs font-bold border border-slate-100" 
                                 value={event.title_en} onChange={e => updateEvent(day.id, event.id, {title_en: e.target.value})} />
                          <textarea className="w-full px-4 py-2 bg-white rounded-xl text-[11px] border border-slate-100 min-h-[60px]" 
                                    value={event.desc_en} onChange={e => updateEvent(day.id, event.id, {desc_en: e.target.value})} placeholder="English description..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={() => addEvent(day.id)} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 text-[10px] font-black uppercase hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> THÊM HOẠT ĐỘNG VÀO NGÀY NÀY
              </button>
            </div>
          </div>
        ))}

        <button onClick={addDay} className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black hover:bg-primary shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
          <Calendar size={18} /> THÊM NGÀY SỰ KIỆN MỚI
        </button>
      </div>
    </div>
  );
}