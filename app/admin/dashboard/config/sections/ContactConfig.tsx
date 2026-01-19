"use client";

import { ContactSectionData, CmsSectionProps, ContactPerson } from "@/types/cms";
import { Plus, Trash2, Mail, Phone, UserPlus } from "lucide-react";

export default function ContactConfig({ data, updateData }: CmsSectionProps<ContactSectionData>) {
  const addPerson = () => {
    const newPerson: ContactPerson = {
      id: Math.random().toString(36).slice(2),
      name: "", role_vi: "", role_en: "",
      email: "", phone: "", avatar: ""
    };
    updateData({ ...data, contacts: [...(data.contacts || []), newPerson] });
  };

  const removePerson = (id: string) => {
    updateData({ ...data, contacts: data.contacts.filter(p => p.id !== id) });
  };

  const updatePerson = (id: string, fields: any) => {
    updateData({
      ...data,
      contacts: data.contacts.map(p => p.id === id ? { ...p, ...fields } : p)
    });
  };

  return (
    <div className="space-y-8 text-slate-900">
      {/* 1. THÔNG TIN CHUNG */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <h4 className="text-[10px] font-black uppercase text-slate-400 italic">1. Thông tin địa điểm & Banner</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500">Địa chỉ (Tiếng Việt)</label>
            <textarea className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none shadow-inner text-sm font-bold" value={data.address_vi} onChange={e => updateData({...data, address_vi: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500">Banner Image URL</label>
            <input className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none shadow-inner text-xs" value={data.banner_image} onChange={e => updateData({...data, banner_image: e.target.value})} />
          </div>
        </div>
      </div>

      {/* 2. DANH SÁCH NHÂN SỰ */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h4 className="text-[10px] font-black uppercase text-slate-400 italic">2. Đội ngũ hỗ trợ sự kiện</h4>
          <button onClick={addPerson} className="bg-primary text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:scale-105 transition">
            <UserPlus size={14}/> Thêm nhân sự
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.contacts?.map((person) => (
            <div key={person.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group grid grid-cols-1 md:grid-cols-4 gap-6">
              <button onClick={() => removePerson(person.id)} className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                <Trash2 size={12}/>
              </button>
              
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase">Họ tên & Avatar URL</label>
                <input className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold" value={person.name} onChange={e => updatePerson(person.id, {name: e.target.value})} placeholder="Tên nhân sự" />
                <input className="w-full px-3 py-2 bg-slate-50 rounded-xl text-[9px]" value={person.avatar} onChange={e => updatePerson(person.id, {avatar: e.target.value})} placeholder="URL Ảnh đại diện" />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase">Chức vụ (VI/EN)</label>
                <input className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs" value={person.role_vi} onChange={e => updatePerson(person.id, {role_vi: e.target.value})} placeholder="Chức vụ VI" />
                <input className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs" value={person.role_en} onChange={e => updatePerson(person.id, {role_en: e.target.value})} placeholder="Role EN" />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase">Email</label>
                <input className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs" value={person.email} onChange={e => updatePerson(person.id, {email: e.target.value})} placeholder="email@sifs.vn" />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase">Số điện thoại</label>
                <input className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs" value={person.phone} onChange={e => updatePerson(person.id, {phone: e.target.value})} placeholder="090..." />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}