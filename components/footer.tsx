"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

interface FooterProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    quickLinks: "Liên kết nhanh",
    contact: "Liên hệ",
    followUs: "Theo dõi chúng tôi",
    copyright: "© 2026 SIFS - Ngày Hội Khởi Nghiệp & Đổi Mới Sáng Tạo",
    organizedBy: "Được tổ chức bởi Startup & Innovation Hub HCMC (SIHUB)",
    links: ["Trang Chủ", "Chương Trình", "Gian Hàng", "Liên Hệ"],
  },
  en: {
    quickLinks: "Quick Links",
    contact: "Contact",
    followUs: "Follow Us",
    copyright: "© 2026 SIFS - Spring Innovation Festival Summit",
    organizedBy: "Organized by Startup & Innovation Hub HCMC (SIHUB)",
    links: ["Home", "Agenda", "Sponsors", "Contact"],
  },
}

export default function Footer({ language }: FooterProps) {
  const t = content[language]

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="md:col-span-1">
            <h3 className="text-2xl font-bold text-secondary mb-2">SIFS 2026</h3>
            <p className="text-gray-300 text-sm">{t.organizedBy}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h4 className="font-bold text-secondary mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {t.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h4 className="font-bold text-secondary mb-4">{t.contact}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <a href="mailto:info@sifs2026.com" className="hover:text-secondary transition-colors">
                  info@sifs2026.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <a href="tel:+84868158269" className="hover:text-secondary transition-colors">
                  +84 86 8158 269
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 className="font-bold text-secondary mb-4">{t.followUs}</h4>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, color: "#FFD700" }}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-gray-400 text-sm"
          >
            <p>{t.copyright}</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
