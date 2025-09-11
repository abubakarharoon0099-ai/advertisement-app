export const getAds = async (cursor: number | null, limit: number) => {
  try {
    const qs = new URLSearchParams()
    if (cursor !== null) qs.set("cursor", String(cursor))
    qs.set("limit", String(limit))
    const r = await fetch(`/api/ads?${qs.toString()}`, { cache: "no-store" })
    if (!r.ok) throw new Error("bad")
    return await r.json()
  } catch {
    return { items: [], nextcursor: null, hasMore: false }
  }
}
