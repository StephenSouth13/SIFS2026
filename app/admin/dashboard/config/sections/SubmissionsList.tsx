"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, Phone, Smartphone, Trash2, Calendar, CheckCircle2, Clock, User, Download } from "lucide-react"
import { toast } from "sonner"
import * as XLSX from "xlsx"

export default function SubmissionsList() {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSubmissions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (!error) setList(data)
    setLoading(false)
  }

  useEffect(() => { fetchSubmissions() }, [])

  // --- HÀM XUẤT EXCEL ĐÃ CẬP NHẬT CỘT SỐ ĐIỆN THOẠI ---
  const exportToExcel = () => {
    if (list.length === 0) {
      toast.error("Không có dữ liệu để xuất!");
      return;
    }

    const dataToExport = list.map((item, index) => ({
      "STT": index + 1,
      "Họ và Tên": item.fullname,
      "Số điện thoại": item.phone || "N/A", // Cập nhật cột Phone
      "Email": item.email,
      "Nội dung lời nhắn": item.message,
      "Ngày đăng ký": new Date(item.created_at).toLocaleString('vi-VN'),
      "Trạng thái": item.status === 'contacted' ? 'Đã liên hệ' : 'Mới'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "KhachHang_SIFS2026");

    const fileName = `Danh_Sach_KH_SIFS2026_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    toast.success("Đã xuất file báo cáo Excel!");
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Xóa vĩnh viễn khách hàng này khỏi hệ thống?")) return
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id)
    if (!error) {
      setList(list.filter(item => item.id !== id))
      toast.success("Đã xóa dữ liệu")
    }
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "pending" ? "contacted" : "pending"
    const { error } = await supabase.from("contact_submissions").update({ status: nextStatus }).eq("id", id)
    if (!error) {
      setList(list.map(item => item.id === id ? { ...item, status: nextStatus } : item))
      toast.success("Đã cập nhật trạng thái liên hệ")
    }
  }

  if (loading) return (
    <div className="flex flex-col justify-center items-center py-40 gap-4">
      <Clock className="animate-spin text-primary" size={48} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Đang đồng bộ dữ liệu...</p>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
        <div>
          <h3 className="text-sm font-black uppercase text-slate-400 tracking-[0.4em] italic mb-3">Data Center / Leads</h3>
          <div className="flex items-center gap-3">
            <span className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-[11px] font-black italic uppercase tracking-widest shadow-xl shadow-black/10">
              Tổng: {list.length} Khách hàng
            </span>
          </div>
        </div>

        <button 
          onClick={exportToExcel}
          className="group flex items-center gap-3 px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-teal-600/20 active:scale-95 hover:-translate-y-1"
        >
          <Download size={20} className="group-hover:bounce" /> Xuất file báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-40">
        {list.length === 0 ? (
          <div className="bg-white p-32 rounded-[4rem] text-center border border-slate-100 shadow-sm">
             <p className="text-slate-300 font-black italic uppercase tracking-[0.2em] text-sm">
                Hiện tại<br/>KPI 10% vẫn đang đợi nhé 🚀
             </p>
          </div>
        ) : (
          list.map((item) => (
            <div key={item.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col md:flex-row gap-10 items-start relative group overflow-hidden">
              
              {/* Status Indicator */}
              <div className={`absolute top-0 left-0 w-2.5 h-full transition-colors duration-500 ${item.status === 'contacted' ? 'bg-teal-500' : 'bg-amber-400 animate-pulse'}`} />

              <div className="flex-1 space-y-6">
                {/* 4 CỘT THÔNG TIN CHÍNH */}
                <div className="flex flex-wrap items-center gap-6 border-b border-slate-50 pb-6">
                  {/* Cột 1: Fullname */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><User size={20}/></div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Họ và tên</p>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{item.fullname}</h4>
                    </div>
                  </div>

                  {/* Cột 2: Phone - ĐÃ CHỈNH SỬA */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><Smartphone size={20}/></div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Số điện thoại</p>
                      <a href={`tel:${item.phone}`} className="text-base font-black text-slate-700 hover:text-primary transition-colors">{item.phone || "Chưa để lại số"}</a>
                    </div>
                  </div>

                  {/* Cột 3: Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500"><Mail size={20}/></div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hòm thư điện tử</p>
                      <a href={`mailto:${item.email}`} className="text-base font-bold text-slate-600 hover:underline">{item.email}</a>
                    </div>
                  </div>

                  {/* Cột 4: Time */}
                  <div className="flex items-center gap-3 ml-auto">
                    <Calendar size={16} className="text-slate-300" />
                    <span className="text-[11px] font-bold text-slate-400 italic">
                      {new Date(item.created_at).toLocaleString('vi-VN')}
                    </span>
                  </div>
                </div>

                {/* Phần Message (Lời nhắn) */}
                <div className="relative p-8 rounded-[2rem] bg-slate-50/80 border border-slate-100 italic text-base text-slate-600 leading-relaxed font-medium group-hover:bg-white transition-colors duration-500">
                  <div className="absolute -top-3 left-8 px-4 bg-white border border-slate-100 rounded-full text-[9px] font-black uppercase text-slate-400 tracking-widest">Nội dung yêu cầu</div>
                  "{item.message}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col gap-4 justify-end h-full min-w-[180px]">
                <button 
                  onClick={() => toggleStatus(item.id, item.status)}
                  className={`flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg ${
                    item.status === 'contacted' 
                    ? "bg-teal-500 text-white shadow-teal-500/20" 
                    : "bg-white border border-slate-200 text-slate-400 hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50/30"
                  }`}
                >
                  {item.status === 'contacted' ? <><CheckCircle2 size={18} /> ĐÃ GỌI</> : "ĐÁNH DẤU ĐÃ GỌI"}
                </button>
                <button 
                  onClick={() => deleteSubmission(item.id)}
                  className="flex items-center justify-center gap-3 px-8 py-5 bg-red-50 text-red-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 size={18} /> XÓA BỎ
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}