import { promises as fs } from "fs"
import path from "path"
import type { Ad } from "@/lib/types/ad"

export const readAllAds = async (): Promise<Ad[]> => {
  try {
    const p = path.join(process.cwd(), "public", "ads_data.json")
    const raw = await fs.readFile(p, "utf8")
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as Ad[]
    return []
  } catch {
    return []
  }
}
