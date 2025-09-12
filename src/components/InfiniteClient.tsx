"use client"
import { FC } from "react"
import { Ad } from "@/lib/types/ad"
import Spinner from "@/components/Spinner"
import AdCard from "@/components/AdCard"
interface InfiniteClientProps {
  state: {
    items: Ad[]
    loading: boolean
    hasMore: boolean
  }
  ref: React.RefObject<HTMLDivElement | null>
  load: () => void
}
const InfiniteClient: FC<InfiniteClientProps> = ({ state, ref }) => {
  const { items, loading, hasMore } = state
  if (items.length === null) {
    return (
      <div className="col-span-full text-center text-gray-500 mt-6">
        No ads available
      </div>
    )
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {items.map((ad: Ad, index: number) => (
        <AdCard key={`${ad.id}-${index}`} ad={ad} />
      ))}

      <div ref={ref} className="col-span-full text-center text-gray-500 py-6">
        {loading ? <Spinner /> : !hasMore ? "No more ads" : null}
      </div>
    </section>
  )
}
export default InfiniteClient
