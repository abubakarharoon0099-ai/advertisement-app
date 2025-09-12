import { useReducer, useRef, useEffect, useCallback } from "react"
import { fetchAds } from "@/lib/utils/fetcher"
import { initialState, reducer } from "./useInfiniteAdsReducer"  
export const useInfiniteAds = <T>(initialCursor: number | null, initialHasMore: boolean, limit: number) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, cursor: initialCursor, hasMore: initialHasMore })
  const ref = useRef<HTMLDivElement | null>(null)
  const load = useCallback(async () => {
    try {
      if (!state.hasMore || state.loading) return
      dispatch({ type: "start" })
      const data = await fetchAds(state.cursor, limit)
      dispatch({
        type: "success",
        payload: {
          items: data.items,
          nextCursor: data.nextCursor,
          hasMore: data.hasMore,
        },
      })
    } catch {
      dispatch({ type: "error" })
    }
  }, [state.hasMore, state.loading, state.cursor, limit])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) load()
      },
      { rootMargin: "400px" }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [load])

  return { ref, state, load }
}
