import { NextResponse } from "next/server"
import { readAllAds } from "@/lib/utils/data"
import { slicebycursor } from "@/lib/utils/paginate"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const cursor = Number(url.searchParams.get("cursor") ?? 0)
    const limit = Number(url.searchParams.get("limit") ?? 20)
    const ads = await readAllAds()
    const { page, nextcursor, hasmore } = slicebycursor(
      ads,
      isFinite(cursor) ? cursor : 0,
      isFinite(limit) ? limit : 20
    )
    return NextResponse.json({ items: page, nextcursor, hasmore })
  } catch {
    return NextResponse.json({ items: [], nextcursor: null, hasMore: false })
  }
}
