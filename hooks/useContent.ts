"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useContent<T>() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("section_name, content")

        if (error) throw error

        if (data) {
          const contentMap = data.reduce((acc: any, item: any) => {
            acc[item.section_name] = item.content
            return acc
          }, {})
          setContent(contentMap)
        }
      } catch (err) {
        console.error("Lỗi fetch CMS:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  return { content, loading }
}