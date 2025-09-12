
export const fetchAds = async (cursor: number | null, limit: number) => {
  try {
    const res = await fetch(`/api/ads?cursor=${cursor ?? 0}&limit=${limit}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return { items: [], nextCursor: null, hasMore: false }
  }
}
