UPDATE site_content 
SET content = jsonb_build_object(
  'title', COALESCE(content->>'title', 'SIFS 2026'),
  'target_date', COALESCE(content->>'target_date', '2026-02-06T00:00:00'),
  'slides', COALESCE(content->'slides', '[]'::jsonb),
  'use_carousel', COALESCE((content->>'use_carousel')::boolean, true),
  'text_color', COALESCE(content->>'text_color', 'white'),
  'title_color', COALESCE(content->>'title_color', '#FFD700'),
  'overlay_opacity', COALESCE((content->>'overlay_opacity')::int, 60),
  'font_family', COALESCE(content->>'font_family', 'font-serif italic'),
  'show_countdown', COALESCE((content->>'show_countdown')::boolean, true),
  'show_info_card', COALESCE((content->>'show_info_card')::boolean, true),
  'show_cta1', COALESCE((content->>'show_cta1')::boolean, true),
  'show_cta2', COALESCE((content->>'show_cta2')::boolean, true),
  'subtitle_vi', COALESCE(content->>'subtitle_vi', 'Ngày Hội Khởi Nghiệp'),
  'subtitle_en', COALESCE(content->>'subtitle_en', 'Innovation Festival'),
  'tagline_vi', COALESCE(content->>'tagline_vi', ''),
  'tagline_en', COALESCE(content->>'tagline_en', ''),
  'location_vi', COALESCE(content->>'location_vi', 'SIHUB, TP.HCM'),
  'location_en', COALESCE(content->>'location_en', 'SIHUB, HCMC'),
  'date_text_vi', '06/02 - 07/02/2026',
  'time_text_vi', '09:00 - 18:00'
)
WHERE section_name = 'hero';
UPDATE site_content 
SET content = jsonb_build_object(
  'title_vi', '4 Trụ Cột SIFS 2026',
  'title_en', '4 Pillars of SIFS 2026',
  'pillars', jsonb_build_array(
    jsonb_build_object(
      'id', 'p1', 
      'title_vi', 'Công nghệ', 'title_en', 'Technology', 
      'description_vi', 'Tiên phong ứng dụng AI và giải pháp số vào hệ sinh thái khởi nghiệp.', 'description_en', 'Pioneering AI and digital solutions in the startup ecosystem.', 
      'icon_name', 'Cpu'
    ),
    jsonb_build_object(
      'id', 'p2', 
      'title_vi', 'Kết nối', 'title_en', 'Connection', 
      'description_vi', 'Mở rộng mạng lưới giữa các Startup, Quỹ đầu tư và Chính phủ.', 'description_en', 'Expanding networks between Startups, VCs, and Government.', 
      'icon_name', 'Users'
    ),
    jsonb_build_object(
      'id', 'p3', 
      'title_vi', 'Đổi mới', 'title_en', 'Innovation', 
      'description_vi', 'Thúc đẩy tư duy sáng tạo và đột phá trong mô hình kinh doanh.', 'description_en', 'Promoting creative thinking and breakthroughs in business models.', 
      'icon_name', 'Zap'
    ),
    jsonb_build_object(
      'id', 'p4', 
      'title_vi', 'Bền vững', 'title_en', 'Sustainability', 
      'description_vi', 'Xây dựng giá trị dài hạn cho cộng đồng và môi trường.', 'description_en', 'Building long-term value for the community and environment.', 
      'icon_name', 'Leaf'
    )
  )
)
WHERE section_name = 'pillars';

"use client"

import { motion } from "framer-motion"
import { USPSectionData } from "@/types/cms"
import { CheckCircle2, XCircle, Zap } from "lucide-react"

export default function USPSection({ language, data }: { language: "vi" | "en", data: USPSectionData | undefined }) {
  if (!data) return null;

  const t = {
    title: language === "vi" ? data.title_vi : data.title_en,
    subtitle: language === "vi" ? data.subtitle_vi : data.subtitle_en,
  }

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Decor Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white font-serif italic mb-4 uppercase tracking-tighter">
            {t.title || "Lợi thế vượt trội"}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic">{t.subtitle}</p>
        </motion.div>

        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="p-6 md:p-8 text-[10px] font-black uppercase tracking-widest text-gray-500">Đặc điểm / Aspect</th>
                <th className="p-6 md:p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Sự kiện truyền thống</th>
                <th className="p-6 md:p-8 text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Zap size={14} className="fill-primary"/> SIFS 2026
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.comparison?.map((row, index) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-6 md:p-8">
                    <span className="text-sm font-bold text-gray-300">
                      {language === "vi" ? row.aspect_vi : row.aspect_en}
                    </span>
                  </td>
                  <td className="p-6 md:p-8">
                    <div className="flex items-center gap-3 text-gray-500 text-xs italic">
                      <XCircle size={14} className="shrink-0 text-gray-600" />
                      {language === "vi" ? row.traditional_vi : row.traditional_en}
                    </div>
                  </td>
                  <td className="p-6 md:p-8 bg-primary/5">
                    <div className="flex items-center gap-3 text-white text-sm font-black italic">
                      <CheckCircle2 size={16} className="shrink-0 text-primary" />
                      {language === "vi" ? row.sifs_vi : row.sifs_en}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}