import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Montserrat cho toàn bộ nội dung (Set làm default font-sans)
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
})

// Playfair Display cho các tiêu đề nghệ thuật
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
  metadataBase: new URL("https://sifs2026.vn"),
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "SIFS 2026 - Startup & Innovation Festival",
    description: "Hành trình đổi mới sáng tạo mùa xuân 2026",
    images: ["/og-image.jpg"],
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
        {/* Background Layer: Neon Ambient */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Radial Gradient nền */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#4a0000_0%,#050505_80%)]" />
          
          {/* Ambient Lights - Đốm sáng chuyển động */}
          <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full" />
        </div>
        
        <main>{children}</main>
        
        <Analytics />
      </body>
    </html>
  )
}