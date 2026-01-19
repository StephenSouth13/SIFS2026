"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/hooks/useContent";
import { SiteData } from "@/types/cms";
import { toast } from "sonner";
// Thêm Loader2 vào đây
import { Loader2 } from "lucide-react";
// Import Sections
import HeroConfig from "./config/sections/HeroConfig";
import PillarsConfig from "./config/sections/PillarsConfig";
import USPConfig from "./config/sections/USPConfig";
import AdvisorsConfig from "./config/sections/AdvisorsConfig";
import BoothMapConfig from "./config/sections/BoothMapConfig";
import AgendaConfig from "./config/sections/AgendaConfig";
import ContactConfig from "./config/sections/ContactConfig";

const TABS = [
  { id: "hero", label: "Mặt tiền (Hero)" },
  { id: "pillars", label: "Trụ cột" },
  { id: "usp", label: "Lợi thế" },
  { id: "advisors", label: "Cố vấn" },
  { id: "boothMap", label: "Sơ đồ" },
  { id: "agenda", label: "Lịch trình" },
  { id: "contact", label: "Liên hệ" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { content, loading: contentLoading } = useContent<SiteData>();
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Lớp bảo mật Client-side
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

  const handleSave = async (sectionName: string, newData: any) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ section_name: sectionName, content: newData }, { onConflict: "section_name" });
      if (error) throw error;
      toast.success(`Cập nhật ${sectionName} thành công!`);
    } catch (err: any) {
      toast.error("Không thể lưu. Kiểm tra quyền ghi của DB.");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || contentLoading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-serif italic text-primary">
      <Loader2 className="animate-spin mb-4" size={40} />
      Đang tải không gian SIFS 2026...
    </div>
  );

  const safeContent = content || {} as SiteData;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 p-8 flex flex-col sticky top-0 h-screen shadow-sm">
        <h1 className="text-xl font-black text-primary mb-10 font-serif italic tracking-tight">SIFS ADMIN</h1>
        <nav className="space-y-2 flex-1 overflow-y-auto">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-400 hover:bg-gray-50"
              }`}>
              {tab.label}
            </button>
          ))}
        </nav>
        <button onClick={async () => { await supabase.auth.signOut(); window.location.href = "/admin/login"; }} 
                className="mt-10 py-4 border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">
          Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto h-screen bg-gray-50/30">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 flex justify-between items-center">
            <h2 className="text-4xl font-black text-gray-900 font-serif italic">{TABS.find(t => t.id === activeTab)?.label}</h2>
            {isSaving && <div className="px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black text-primary animate-pulse uppercase tracking-widest">Đang đồng bộ...</div>}
          </header>

          <div className="pb-24">
            {activeTab === "hero" && <HeroConfig data={safeContent.hero || {}} updateData={(val) => handleSave("hero", val)} />}
            {activeTab === "pillars" && <PillarsConfig data={safeContent.pillars || { pillars: [] }} updateData={(val) => handleSave("pillars", val)} />}
            {activeTab === "usp" && <USPConfig data={safeContent.usp || { comparison: [] }} updateData={(val) => handleSave("usp", val)} />}
            {activeTab === "advisors" && <AdvisorsConfig data={safeContent.advisors || { advisors: [], partners: [] }} updateData={(val) => handleSave("advisors", val)} />}
            {activeTab === "boothMap" && <BoothMapConfig data={safeContent.boothMap || { areas: [] }} updateData={(val) => handleSave("boothMap", val)} />}
            {activeTab === "agenda" && <AgendaConfig data={safeContent.agenda || { days: [] }} updateData={(val) => handleSave("agenda", val)} />}
            {activeTab === "contact" && <ContactConfig data={safeContent.contact || { contacts: [] }} updateData={(val) => handleSave("contact", val)} />}
          </div>
        </div>
      </main>
    </div>
  );
}