export const slicebycursor = <T>(
  items: T[],
  cursor: number,
  limit: number
): { page: T[]; nextcursor: number | null; hasmore: boolean } => {
  try {
    const start = cursor >= 0 ? cursor : 0
    const end = start + (limit > 0 ? limit : 21)

    const page = items.slice(start, end)
    const nextcursor = end < items.length ? end : null
    return { page, nextcursor, hasmore: nextcursor !== null }
  } catch {
    return { page: [] as T[], nextcursor: null, hasmore: false }
  }
}
