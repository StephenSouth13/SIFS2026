"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/hooks/useContent";
import { SiteData } from "@/types/cms";
import { toast } from "sonner";
import { Loader2, Save, LogOut, Layout, Monitor, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import Sections
import HeaderConfig from "./config/sections/HeaderConfig";
import HeroConfig from "./config/sections/HeroConfig";
import PillarsConfig from "./config/sections/PillarsConfig";
import USPConfig from "./config/sections/USPConfig";
import AdvisorsConfig from "./config/sections/AdvisorsConfig";
import BoothMapConfig from "./config/sections/BoothMapConfig";
import BoothGuidelinesConfig from "./config/sections/BoothGuidelinesConfig";
import AgendaConfig from "./config/sections/AgendaConfig";
import ContactConfig from "./config/sections/ContactConfig";
import FooterConfig from "./config/sections/FooterConfig";
import SubmissionsList from "./config/sections/SubmissionsList"; // FIX: THÊM DÒNG NÀY

const TABS = [
  { id: "submissions", label: "Khách hàng đăng ký" }, // Đưa lên đầu để ưu tiên quản lý data
  { id: "header", label: "Đầu trang (Header)" },
  { id: "hero", label: "Mặt tiền (Hero)" },
  { id: "pillars", label: "Trụ cột" },
  { id: "usp", label: "Lợi thế" },
  { id: "advisors", label: "Cố vấn" },
  { id: "boothMap", label: "Sơ đồ" },
  { id: "boothGuidelines", label: "Quy định gian hàng" },
  { id: "agenda", label: "Lịch trình" },
  { id: "contact", label: "Liên hệ" },
  { id: "footer", label: "Chân trang (Footer)" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { content, loading: contentLoading, setContent } = useContent<SiteData>();
  const [activeTab, setActiveTab] = useState("submissions"); // Mặc định mở danh sách khách hàng
  const [isSaving, setIsSaving] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin/login");
      } else {
        setAuthLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handleLocalUpdate = (sectionName: string, newData: any) => {
    if (!content) return;
    setContent({
      ...content,
      [sectionName]: newData
    });
  };

  const handlePersistSave = async () => {
    if (!content) return;
    // Riêng tab submissions không có nút lưu vì nó chỉ hiển thị data từ DB
    if (activeTab === "submissions") return;

    setIsSaving(true);
    const sectionData = (content as any)[activeTab];

    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ 
          section_name: activeTab, 
          content: sectionData 
        }, { onConflict: "section_name" });

      if (error) throw error;
      toast.success(`Đã cập nhật phần ${TABS.find(t => t.id === activeTab)?.label} thành công!`);
    } catch (err: any) {
      toast.error("Lỗi đồng bộ Database.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || contentLoading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans italic text-primary">
      <Loader2 className="animate-spin mb-4" size={48} />
      <p className="font-black uppercase tracking-widest text-sm text-slate-400">SIFS 2026 Panel Loading...</p>
    </div>
  );

  const safeContent = content || {} as SiteData;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <aside className="w-80 bg-white border-r border-slate-200 p-10 flex flex-col sticky top-0 h-screen shadow-xl z-20">
        <div className="flex items-center gap-4 text-primary mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 text-white">
            <Monitor size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">SIFS 2026</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Control Panel</p>
          </div>
        </div>
        
        <nav className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-8 py-5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                activeTab === tab.id 
                ? "bg-slate-900 text-white shadow-2xl translate-x-2" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}>
              {tab.label}
            </button>
          ))}
        </nav>
        
        <button onClick={async () => { await supabase.auth.signOut(); window.location.href = "/admin/login"; }} 
                className="mt-10 py-5 flex items-center justify-center gap-3 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">
          <LogOut size={16} /> Thoát hệ thống
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen bg-slate-50/50 relative scroll-smooth">
        <div className="max-w-6xl mx-auto p-16">
          <header className="mb-16 flex justify-between items-center sticky top-0 bg-[#f8fafc]/80 backdrop-blur-2xl py-8 z-30 border-b border-slate-200/50 px-4 -mx-4 rounded-b-[2rem]">
            <div>
              <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-2 font-sans">Quản trị hệ thống</p>
              <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter font-serif">
                {TABS.find(t => t.id === activeTab)?.label}
              </h2>
            </div>

            {/* Chỉ hiện nút Lưu nếu không phải tab danh sách khách hàng */}
            {activeTab !== "submissions" && (
              <button 
                onClick={handlePersistSave}
                disabled={isSaving}
                className="flex items-center gap-4 px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-500 bg-primary text-white hover:bg-red-600 shadow-2xl shadow-primary/30 active:scale-95 hover:-translate-y-1"
              >
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {isSaving ? "Đang xử lý..." : "Lưu thay đổi ngay"}
              </button>
            )}
          </header>

          <div className="pb-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === "submissions" && <SubmissionsList />}
                {activeTab === "header" && <HeaderConfig data={safeContent.header} updateData={(val) => handleLocalUpdate("header", val)} />}
                {activeTab === "hero" && <HeroConfig data={safeContent.hero} updateData={(val) => handleLocalUpdate("hero", val)} />}
                {activeTab === "pillars" && <PillarsConfig data={safeContent.pillars} updateData={(val) => handleLocalUpdate("pillars", val)} />}
                {activeTab === "usp" && <USPConfig data={safeContent.usp} updateData={(val) => handleLocalUpdate("usp", val)} />}
                {activeTab === "advisors" && <AdvisorsConfig data={safeContent.advisors} updateData={(val) => handleLocalUpdate("advisors", val)} />}
                {activeTab === "boothMap" && <BoothMapConfig data={safeContent.boothMap} updateData={(val) => handleLocalUpdate("boothMap", val)} />}
                {activeTab === "boothGuidelines" && <BoothGuidelinesConfig data={safeContent.boothGuidelines} updateData={(val) => handleLocalUpdate("boothGuidelines", val)} />}
                {activeTab === "agenda" && <AgendaConfig data={safeContent.agenda} updateData={(val) => handleLocalUpdate("agenda", val)} />}
                {activeTab === "contact" && <ContactConfig data={safeContent.contact} updateData={(val) => handleLocalUpdate("contact", val)} />}
                {activeTab === "footer" && <FooterConfig data={safeContent.footer} updateData={(val) => handleLocalUpdate("footer", val)} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}