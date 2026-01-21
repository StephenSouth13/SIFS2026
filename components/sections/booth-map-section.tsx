"use client"

import { motion } from "framer-motion"
import { Map as MapIcon, Store, MousePointer2, Info, LayoutGrid } from "lucide-react"
import { BoothMapSectionData, BoothArea, BoothItem } from "@/types/cms"

interface BoothMapSectionProps {
  language: "vi" | "en"
  data: BoothMapSectionData | undefined
}

export default function BoothMapSection({ language, data }: BoothMapSectionProps) {
  if (!data || !data.areas) return null

  const t = {
    title: language === "vi" ? data.title_vi : data.title_en,
    instruction: language === "vi" ? "Tra cứu vị trí gian hàng chi tiết bên dưới" : "Find detailed booth locations below",
    boothCount: language === "vi" ? "gian hàng" : "booths",
    empty: language === "vi" ? "Đang cập nhật danh sách..." : "Updating list..."
  }

  return (
    <section id="booth-map" className="py-24 px-4 bg-[#050505] relative overflow-hidden font-sans scroll-mt-20">
      {/* Glow Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-8xl font-black text-white font-serif italic uppercase tracking-tighter mb-6 neon-text">
            {t.title}
          </h2>
          <div className="flex items-center justify-center gap-3 text-gray-400 italic">
            <LayoutGrid size={16} className="text-primary" />
            <p className="text-sm md:text-lg uppercase tracking-widest font-bold">{t.instruction}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* BÊN TRÁI: MASTER MAP (Sticky) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 lg:sticky lg:top-32"
          >
            <div className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-primary/30">
              <div className="relative overflow-hidden rounded-[1.8rem]">
                <img 
                  src={data.map_image_url || "/placeholder-map.png"} 
                  alt="SIFS 2026 Floor Plan" 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                <MapIcon className="text-primary" size={20} />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Floor Plan</span>
              </div>
            </div>
          </motion.div>

          {/* BÊN PHẢI: CHI TIẾT XỔ SẴN (Scrollable) */}
          <div className="lg:col-span-5 space-y-10 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar pb-10">
            {data.areas.map((zone: BoothArea, index: number) => {
              const zoneName = language === "vi" ? zone.name_vi : zone.name_en
              const zoneDesc = language === "vi" ? zone.description_vi : zone.description_en

              return (
                <div key={zone.id} className="relative group/zone">
                  {/* Header Zone (Tĩnh - Không bấm) */}
                  <div className="flex items-center gap-5 mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl italic shadow-lg shrink-0"
                      style={{ backgroundColor: `${zone.color_code}20`, color: zone.color_code, border: `1px solid ${zone.color_code}40` }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover/zone:text-primary transition-colors">
                        {zoneName}
                      </h3>
                      <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">
                        {zone.booths?.length || 0} {t.boothCount}
                      </p>
                    </div>
                  </div>

                  {/* Nội dung xổ sẵn */}
                  <div className="p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/5 space-y-6 shadow-xl">
                    {/* Mô tả khu vực */}
                    {zoneDesc && (
                      <div className="flex gap-4 items-start pb-4 border-b border-white/5">
                        <Info size={16} className="text-primary shrink-0 mt-1" />
                        <p className="text-gray-400 text-[13px] italic leading-relaxed">{zoneDesc}</p>
                      </div>
                    )}

                    {/* Danh sách gian hàng con hiển thị trực tiếp */}
                    <div className="grid grid-cols-1 gap-3">
                      {zone.booths && zone.booths.length > 0 ? (
                        zone.booths.map((booth: BoothItem) => (
                          <div key={booth.id} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 group/booth hover:bg-primary/10 hover:border-primary/20 transition-all">
                            <div className="flex items-center gap-4">
                              <span className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-xl text-[10px] font-black text-primary border border-primary/20 group-hover/booth:bg-primary group-hover/booth:text-white transition-all">
                                {booth.label}
                              </span>
                              <span className="text-[13px] font-bold text-gray-300 group-hover/booth:text-white">
                                {language === "vi" ? booth.name_vi : booth.name_en}
                              </span>
                            </div>
                            <Store size={14} className="text-gray-600 group-hover/booth:text-primary transition-colors" />
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-[10px] text-gray-600 uppercase font-black py-4">{t.empty}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}