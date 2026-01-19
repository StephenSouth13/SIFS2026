"use client";

import React from "react";
import { AgendaSectionData, AgendaDay, AgendaEvent, CmsSectionProps } from "@/types/cms";
import { Plus, Trash2, Clock, Calendar, MoveDown } from "lucide-react";

export default function AgendaConfig({ data, updateData }: CmsSectionProps<AgendaSectionData>) {
  if (!data) return null;

  const addDay = () => {
    const newDay: AgendaDay = { id: Date.now().toString(), date: "01/01/2026", events: [] };
    updateData({ ...data, days: [...data.days, newDay] });
  };

  const addEvent = (dayId: string) => {
    const newEvent: AgendaEvent = {
      id: Date.now().toString(),
      time: "09:00 - 10:00",
      title_vi: "Sự kiện mới", title_en: "New Event",
      desc_vi: "Mô tả", desc_en: "Description"
    };
    const next = data.days.map(d => d.id === dayId ? { ...d, events: [...d.events, newEvent] } : d);
    updateData({ ...data, days: next });
  };

  const removeEvent = (dayId: string, eventId: string) => {
    const next = data.days.map(d => 
      d.id === dayId ? { ...d, events: d.events.filter(e => e.id !== eventId) } : d
    );
    updateData({ ...data, days: next });
  };

  return (
    <div className="space-y-10">
      {/* Title Config */}
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 flex gap-6">
        <input className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 font-black outline-none focus:ring-2 ring-primary/20" 
               value={data.title_vi} onChange={e => updateData({...data, title_vi: e.target.value})} placeholder="Tiêu đề (VI)" />
        <input className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 font-black text-blue-600 outline-none focus:ring-2 ring-blue-50" 
               value={data.title_en} onChange={e => updateData({...data, title_en: e.target.value})} placeholder="Title (EN)" />
      </div>

      {/* Days Management */}
      <div className="space-y-8">
        {data.days.map((day) => (
          <div key={day.id} className="bg-gray-50 p-8 rounded-[3rem] border border-gray-200 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Calendar className="text-primary" />
                <input className="bg-transparent font-black text-xl outline-none border-b-2 border-gray-300 focus:border-primary" 
                       value={day.date} onChange={e => {
                         const next = data.days.map(d => d.id === day.id ? {...d, date: e.target.value} : d);
                         updateData({...data, days: next});
                       }} />
              </div>
              <button onClick={() => updateData({...data, days: data.days.filter(d => d.id !== day.id)})} className="text-red-400 hover:text-red-600">
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {day.events.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                      <Clock size={14} className="text-primary" />
                      <input className="bg-transparent text-xs font-black outline-none w-24" value={event.time} 
                             onChange={e => {
                               const next = data.days.map(d => d.id === day.id ? {...d, events: d.events.map(ev => ev.id === event.id ? {...ev, time: e.target.value} : ev)} : d);
                               updateData({...data, days: next});
                             }} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input className="w-full font-black outline-none" value={event.title_vi} placeholder="Tên sự kiện (VI)"
                             onChange={e => {
                               const next = data.days.map(d => d.id === day.id ? {...d, events: d.events.map(ev => ev.id === event.id ? {...ev, title_vi: e.target.value} : ev)} : d);
                               updateData({...data, days: next});
                             }} />
                      <input className="w-full text-xs text-blue-600 font-bold outline-none" value={event.title_en} placeholder="Event Title (EN)"
                             onChange={e => {
                               const next = data.days.map(d => d.id === day.id ? {...d, events: d.events.map(ev => ev.id === event.id ? {...ev, title_en: e.target.value} : ev)} : d);
                               updateData({...data, days: next});
                             }} />
                    </div>
                    <button onClick={() => removeEvent(day.id, event.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              <button onClick={() => addEvent(day.id)} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-3xl text-gray-400 text-xs font-black hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> THÊM HOẠT ĐỘNG
              </button>
            </div>
          </div>
        ))}

        <button onClick={addDay} className="w-full py-6 bg-black text-white rounded-[2rem] font-black hover:bg-primary transition-all flex items-center justify-center gap-3">
          <Calendar /> THÊM NGÀY SỰ KIỆN MỚI
        </button>
      </div>
    </div>
  );
}