"use client"
import { useInfiniteAds } from "@/hooks/useInfiniteAds"
import AdCard from "@/components/AdCard"
import type { Ad } from "@/lib/types/ad"
export default function InfiniteClient({
  initialnextcursor,
  initialhasmore,
  limit,}: {
  initialnextcursor: number | null
  initialhasmore: boolean
  limit: number
}) {
  const { ref, state } = useInfiniteAds<Ad>(
    initialnextcursor,
    initialhasmore,
    limit  )
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {state.items.map((a) => ( 
          <AdCard key={`c-${a.id}`} ad={a} />
        ))}
      </section>
      <div ref={ref} className="text-center text-gray-500 py-6">
        {state.hasmore   
          ? state.loading
            ? "Loading..."
            : "Scroll to load more"
          : "No more ads"}
      </div>
    </>
  )
}
