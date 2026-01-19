"use client"

import { motion } from "framer-motion"
import { PillarsSectionData } from "@/types/cms"
import * as Icons from "lucide-react" // Import toàn bộ icon để lấy theo tên từ DB

interface PillarsSectionProps {
  language: "vi" | "en"
  data: PillarsSectionData | undefined
}

export default function PillarsSection({ language, data }: PillarsSectionProps) {
  if (!data) return null;

  const title = language === "vi" ? data.title_vi : data.title_en;

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white font-serif italic mb-4">
            {title || "4 Trụ Cột SIFS 2026"}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.pillars?.map((pillar, index) => {
            // Lấy Component Icon từ Lucide dựa trên string icon_name trong DB
            const IconComponent = (Icons as any)[pillar.icon_name || "Cpu"];

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 backdrop-blur-sm"
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  )}
                </div>

                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">
                  {language === "vi" ? pillar.title_vi : pillar.title_en}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed italic">
                  {language === "vi" ? pillar.description_vi : pillar.description_en}
                </p>

                {/* Chân thẻ decor */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}