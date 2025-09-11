"use client"

import { useReducer, useRef, useEffect, useCallback } from "react"
import { getAds } from "@/lib/utils/fetcher"

type State<T> = {
  items: T[]
  cursor: number | null
  hasmore: boolean
  loading: boolean
  error: boolean
}

type Action<T> =
  | { type: "start" }
  | {
      type: "success"
      payload: { items: T[]; nextcursor: number | null; hasmore: boolean }
    }
  | { type: "error" }
const reducer = <T,>(s: State<T>, a: Action<T>): State<T> => {
  if (a.type === "start") return { ...s, loading: true, error: false }
  if (a.type === "success")
    return {
      items: [...s.items, ...a.payload.items],
      cursor: a.payload.nextcursor,
      hasmore: a.payload.hasmore,
      loading: false,
      error: false,
    }
  if (a.type === "error") return { ...s, loading: false, error: true }
  return s
}
export const useInfiniteAds = <T,>(
  initialcursor: number | null,
  initialhasmore: boolean,
  limit: number
) => {
  const [state, dispatch] = useReducer(reducer<T>, {
    items: [],
    cursor: initialcursor,
    hasmore: initialhasmore,
    loading: false,
    error: false,
  })
  const ref = useRef<HTMLDivElement | null>(null)
  const load = useCallback(async () => {
    try {
      if (!state.hasmore || state.loading) return
      dispatch({ type: "start" })
      const res = await getAds(state.cursor, limit)
      dispatch({
        type: "success",
        payload: {
          items: res.items,
          nextcursor: res.nextcursor,
          hasmore: res.hasmore,
        },
      })
    } catch {
      dispatch({ type: "error" })
    }
  }, [state.hasmore, state.loading, state.cursor, limit])
  useEffect(() => {
    try {
      const node = ref.current
      if (!node) return
      const io = new IntersectionObserver(
        (e) => {
          if (e[0]?.isIntersecting) load()
        },
        { rootMargin: "400px" }
      )
      io.observe(node)
      return () => io.disconnect()
    } catch {}
  }, [load])
  return { ref, state, load }
}
