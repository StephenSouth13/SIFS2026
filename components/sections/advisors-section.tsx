"use client"

import { motion } from "framer-motion"
import { Users, Building2 } from "lucide-react"

interface AdvisorsSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Ban Cố Vấn & Đối Tác",
    subtitle: "Mạng lưới chuyên gia và liên minh chiến lược bảo chứng cho SIFS 2026",
    advisors: [
      {
        name: "Ông Phan Huỳnh Anh",
        role: "Chủ tịch Quỹ FFVN\nChủ tịch HĐQT Công ty Smentor\nChuyên gia Khởi nghiệp VCCI",
        image: "/images/phan-huynh-anh.jpg",
      },
      {
        name: "Ông Đoàn Đức Minh",
        role: "Phó Trưởng khoa Du Lịch\nĐại học Kinh tế TP.HCM (UEH)",
        image: "/images/doan-duc-minh.jpg",
      },
      {
        name: "Bà Phạm Hoàng Minh Khánh",
        role: "Phó Giám đốc Trung tâm Công nghiệp sáng tạo\nCEO Công ty Cổ phần Smar",
        image: "/images/pham-hoang-minh-khanh.jpg",
      },
    ],
    partnersTitle: "Đối Tác Chiến Lược",
    partners: ["SIHUB", "UEH", "VCCI", "UFM", "HUIT", "Smentor", "VIETKINGS", "VTF"],
  },
  en: {
    title: "Advisory Board & Partners",
    subtitle: "Leading Experts & Strategic Alliances Behind SIFS 2026",
    advisors: [
      {
        name: "Mr. Phan Huynh Anh",
        role: "Chairman of FFVN Fund\nChairman of Smentor\nVCCI Startup Expert",
        image: "/images/phan-huynh-anh.jpg",
      },
      {
        name: "Mr. Doan Đức Minh",
        role: "Vice Dean of Tourism Faculty\nUniversity of Economics HCMC (UEH)",
        image: "/images/doan-duc-minh.jpg",
      },
      {
        name: "Ms. Pham Hoang Minh Khanh",
        role: "Deputy Director of Creative Industry Center\nCEO of Smar",
        image: "/images/pham-hoang-minh-khanh.jpg",
      },
    ],
    partnersTitle: "Strategic Partners",
    partners: ["SIHUB", "UEH", "VCCI", "UFM", "HUIT", "Smentor", "VIETKINGS", "VTF"],
  },
}

export default function AdvisorsSection({ language }: AdvisorsSectionProps) {
  const t = content[language]

  return (
    <section id="advisors" className="py-24 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-4">
            <Users className="text-[#D4AF37]" size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-serif italic uppercase tracking-tighter">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Advisors Grid - Ảnh bình thường, không hiệu ứng mờ/đen trắng */}
        <div className="flex flex-wrap justify-center gap-10 mb-24">
          {t.advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] max-w-[320px]"
            >
              {/* Photo Frame - Hiển thị ảnh rõ nét 100% */}
              <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 mb-6 shadow-2xl">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <h3 className="text-xl font-black text-[#D4AF37] mb-3 uppercase tracking-tight">
                {advisor.name}
              </h3>
              
              <div className="w-10 h-[2px] bg-white/20 mb-4 mx-auto" />
              
              <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed italic">
                {advisor.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partners Section - Chữ đối tác rõ hơn */}
        <div className="pt-20 border-t border-white/5 relative">
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-40 h-[1px] bg-[#D4AF37]" />
          
          <div className="flex items-center gap-4 justify-center mb-12">
            <Building2 size={20} className="text-gray-500" />
            <h3 className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 italic">
              {t.partnersTitle}
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {t.partners.map((partner, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-lg md:text-2xl font-black text-white transition-all cursor-default tracking-tighter"
              >
                {partner}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}