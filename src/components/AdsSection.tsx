"use client"
import { useEffect } from "react"
import InfiniteClient from "@/components/InfiniteClient"
import { useInfiniteAds } from "@/hooks/useInfiniteAds"
import { Ad } from "@/lib/types/ad"
export default function AdsSection({ limit }: { limit: number }) {
  const { ref, state, load } = useInfiniteAds<Ad>(0, true, limit)
  useEffect(() => {
    if (state.items.length === 0) {
      load()
    }
  }, [limit]) 

  return (
    <div>
      <InfiniteClient state={state} ref={ref} load={load} />
    </div>
  )
}
