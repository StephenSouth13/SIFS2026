import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Montserrat cho nội dung - Hiện đại, dễ đọc, hỗ trợ tiếng Việt
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
})

// Playfair Display cho Tiêu đề - Đẳng cấp, nghệ thuật
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SIFS 2026 - Startup & Innovation Festival",
  description: "Ngày hội khởi nghiệp & đổi mới sáng tạo mùa xuân 2026 tại SIHUB. Nơi hội tụ các tài năng và ý tưởng đột phá.",
  generator: "quachthanhlong",
  metadataBase: new URL("https://sifs2026.vn"), // Thay bằng domain thật của bạn
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "SIFS 2026 - Startup & Innovation Festival",
    description: "Hành trình đổi mới sáng tạo mùa xuân 2026",
    images: ["/og-image.jpg"], // Hình ảnh khi share link
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${playfair.variable} font-sans antialiased bg-[#050505] text-white selection:bg-red-600/30`}
      >
        {/* Background Layer: Tạo chiều sâu huyền bí cho sự kiện */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#4a0000_0%,#050505_75%)]" />
          {/* Các đốm sáng trang trí (Ambient Lights) */}
          <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-yellow-600/5 blur-[100px] rounded-full" />
        </div>
        
        <main>{children}</main>
        
        <Analytics />
      </body>
    </html>
  )
}