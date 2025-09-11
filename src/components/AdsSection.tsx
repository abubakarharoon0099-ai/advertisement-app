import { readAllAds } from "@/lib/utils/data"
import { slicebycursor } from "@/lib/utils/paginate"
import AdCard from "@/components/AdCard"
import InfiniteClient from "@/components/InfiniteClient"

export default async function AdsSection({ limit }: { limit: number }) {
  try {
    const all = await readAllAds()
    const { page, nextcursor, hasmore } = slicebycursor(all, 0, limit)
    return (
      <>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {page.map((a) => (
            <AdCard key={a.id} ad={a} />
          ))}
        </section>
  <InfiniteClient
  initialnextcursor={nextcursor}
  initialhasmore={hasmore}   
  limit={limit}
/>
      </>
    )
  } catch {
    return <div className="text-center text-red-500">Failed to load</div>
  }
}
