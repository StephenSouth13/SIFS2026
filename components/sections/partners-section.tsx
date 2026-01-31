"use client"

import { motion } from "framer-motion"
import { PartnersSectionData } from "@/types/cms"

export default function PartnersSection({ language, data }: { language: string, data: PartnersSectionData | undefined }) {
  if (!data) return null;

  // --- TRƯỜNG HỢP 1: HIỂN THỊ ẢNH ĐƠN TOÀN TRANG ---
  if (data.use_single_image && data.single_image_url) {
    return (
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50"
          >
            <img 
              src={data.single_image_url} 
              alt="Partners Board SIFS 2026" 
              className="w-full h-auto object-contain bg-white"
            />
          </motion.div>
        </div>
      </section>
    )
  }

  // --- TRƯỜNG HỢP 2: HIỂN THỊ TỪNG LOGO (CŨ) ---
  if (!data.groups || data.groups.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {data.groups.map((group, idx) => (
          <motion.div 
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-16"
          >
            <div className="flex flex-col items-center gap-6">
              <h3 className="text-4xl md:text-7xl font-black text-slate-900 font-serif italic uppercase tracking-tighter text-center leading-tight">
                {language === "vi" ? group.group_name_vi : group.group_name_en}
              </h3>
              <div className="w-20 h-1.5 bg-primary rounded-full opacity-20" />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-16">
              {group.brands.map((brand) => (
                <a 
                  key={brand.id}
                  href={brand.website_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-all duration-500"
                >
                  {brand.logo_url ? (
                    <div className="relative p-4 rounded-3xl transition-all duration-500 group-hover:bg-slate-50 group-hover:shadow-xl group-hover:-translate-y-2">
                      <img src={brand.logo_url} alt={brand.name} className="h-12 md:h-20 w-auto object-contain" />
                    </div>
                  ) : (
                    <span className="text-2xl font-black text-slate-300 group-hover:text-primary transition-all italic uppercase tracking-tighter">
                      {brand.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}