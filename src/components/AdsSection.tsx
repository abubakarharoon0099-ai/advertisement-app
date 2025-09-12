"use client"
import { useEffect } from "react"
import InfiniteClient from "@/components/InfiniteClient"
import { useInfiniteAds } from "@/hooks/useInfiniteAds"
export default function AdsSection({ limit }: { limit: number }) {
  const { ref, state, load } = useInfiniteAds(0, true, limit)
  useEffect(() => {
    load()  
  }, [limit])
  return (
    <div>
      <InfiniteClient state={state} ref={ref} load={load} /> 
    </div>
  )
}
