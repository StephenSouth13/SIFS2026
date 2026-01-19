"use client";

import React, { useState } from "react";
import { HeroSectionData, CmsSectionProps, HeroSlide } from "@/types/cms";
import { supabase } from "@/lib/supabase";
import { 
  Upload, Palette, Loader2, Trash2, Plus, 
  Monitor, Layers, Type, CheckSquare, Square, Video
} from "lucide-react";
import { toast } from "sonner";

export default function HeroConfig({ data, updateData }: CmsSectionProps<HeroSectionData>) {
  const [uploading, setUploading] = useState(false);

  if (!data) return null;

  // Hàm patchData giúp cập nhật state ổn định, không gây giật lag khi gõ
  const patchData = (fields: Partial<HeroSectionData>) => {
    updateData({ ...data, ...fields });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const isVideo = file.type.startsWith('video');
      const fileName = `hero-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error } = await supabase.storage.from("sifs-assets").upload(filePath, file);
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from("sifs-assets").getPublicUrl(filePath);

      const newSlide: HeroSlide = {
        id: Math.random().toString(36).slice(2),
        type: isVideo ? 'video' : 'image',
        url: publicUrl
      };

      const currentSlides = data.slides || [];
      patchData({ 
        slides: [...currentSlides, newSlide],
        use_carousel: [...currentSlides, newSlide].length > 1
      });

      toast.success("Tải lên phương tiện thành công!");
    } catch (err: any) {
      toast.error("Lỗi upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeSlide = (id: string) => {
    const newSlides = (data.slides || []).filter(s => s.id !== id);
    patchData({ slides: newSlides, use_carousel: newSlides.length > 1 });
  };

  return (
    <div className="space-y-8 pb-24 text-slate-900 animate-in fade-in duration-700">
      
      {/* SECTION 1: KHO MEDIA */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 italic">
            <Layers size={14} /> 1. Quản lý Ảnh bìa & Video (Carousel)
          </h4>
          <div 
            onClick={() => patchData({ use_carousel: !data.use_carousel })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all border ${data.use_carousel ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
          >
             <span className="text-[9px] font-black uppercase">Tự động trượt</span>
             {data.use_carousel ? <CheckSquare size={14} /> : <Square size={14} />}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.slides?.map((slide) => (
            <div key={slide.id} className="relative group aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-slate-900">
              {slide.type === 'image' ? (
                <img src={slide.url} className="w-full h-full object-cover" alt="slide" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black text-white text-[8px] font-black uppercase italic gap-2">
                  <Video size={16} className="text-secondary opacity-50"/> Video Slide
                </div>
              )}
              <button 
                onClick={() => removeSlide(slide.id)} 
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
              >
                <Trash2 size={12}/>
              </button>
            </div>
          ))}
          <label className={`aspect-video border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer transition-all ${uploading ? 'opacity-50' : 'hover:border-primary'}`}>
            {uploading ? <Loader2 className="animate-spin text-primary" /> : <Plus className="text-slate-300" />}
            <span className="text-[9px] font-black text-slate-400">THÊM MEDIA</span>
            <input type="file" hidden accept="image/*,video/*" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {/* SECTION 2: STYLE & VISIBILITY */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 italic">
          <Palette size={14} /> 2. Hiển thị & Tương phản
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Màu chữ nội dung</label>
            <div className="flex p-1 bg-slate-100 rounded-2xl shadow-inner">
              <button onClick={() => patchData({ text_color: 'white' })} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${data.text_color === 'white' ? 'bg-white shadow text-primary' : 'text-slate-400'}`}>TRẮNG</button>
              <button onClick={() => patchData({ text_color: 'black' })} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${data.text_color === 'black' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>ĐEN</button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Màu Neon Tiêu đề</label>
            <input type="color" className="w-full h-10 rounded-xl cursor-pointer border-none bg-transparent" value={data.title_color || "#FFD700"} onChange={e => patchData({ title_color: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Độ tối Overlay ({data.overlay_opacity}%)</label>
            <input type="range" min="0" max="100" value={data.overlay_opacity ?? 60} onChange={e => patchData({ overlay_opacity: Number(e.target.value) })} className="w-full accent-primary mt-4" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
          {[
            { label: 'Đồng hồ', key: 'show_countdown' },
            { label: 'Thẻ Thông tin', key: 'show_info_card' },
            { label: 'Nút chính', key: 'show_cta1' },
            { label: 'Nút phụ', key: 'show_cta2' }
          ].map(item => (
            <div 
              key={item.key}
              onClick={() => patchData({ [item.key]: !data[item.key as keyof HeroSectionData] })}
              className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${data[item.key as keyof HeroSectionData] ? 'bg-slate-900 border-slate-900 shadow-md' : 'bg-white border-slate-100'}`}
            >
              <span className={`text-[9px] font-black uppercase ${data[item.key as keyof HeroSectionData] ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
              {data[item.key as keyof HeroSectionData] ? <CheckSquare size={16} className="text-primary"/> : <Square size={16} className="text-slate-200"/>}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: VĂN BẢN */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 italic">3. Nội dung hiển thị bề mặt</h4>
        <input className="w-full px-6 py-5 rounded-3xl bg-slate-50 text-2xl font-black outline-none border border-transparent focus:border-primary/20 text-slate-900 transition-all shadow-inner" value={data.title} onChange={e => patchData({ title: e.target.value })} placeholder="TIÊU ĐỀ CHÍNH" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4 p-6 bg-slate-50 rounded-4xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black uppercase text-slate-400">TIẾNG VIỆT</span>
              <input className="w-full px-5 py-3 rounded-xl bg-white text-xs font-bold" value={data.subtitle_vi} onChange={e => patchData({ subtitle_vi: e.target.value })} placeholder="Subtitle" />
              <textarea className="w-full px-5 py-3 rounded-xl bg-white text-[10px] italic min-h-20" value={data.tagline_vi} onChange={e => patchData({ tagline_vi: e.target.value })} placeholder="Tagline" />
           </div>
           <div className="space-y-4 p-6 bg-slate-50 rounded-4xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black uppercase text-slate-400">ENGLISH</span>
              <input className="w-full px-5 py-3 rounded-xl bg-white text-xs font-bold" value={data.subtitle_en} onChange={e => patchData({ subtitle_en: e.target.value })} placeholder="Subtitle" />
              <textarea className="w-full px-5 py-3 rounded-xl bg-white text-[10px] italic min-h-20" value={data.tagline_en} onChange={e => patchData({ tagline_en: e.target.value })} placeholder="Tagline" />
           </div>
        </div>
      </div>
    </div>
  );
}