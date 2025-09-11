// no "use client"
import type { Ad } from "@/lib/types/ad"
import { money } from "@/lib/utils/format"

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <article className="border rounded-xl shadow-sm overflow-hidden bg-white">
      {ad.images?.length ? (
        <img
          src={ad.images[0]}
          alt={ad.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500">
          No Image Provided
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{ad.title}</h3>
          <span className="px-2 py-0.5 text-xs border rounded-full">
            {ad.condition}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{ad.location}</p>
        <p className="text-indigo-600 font-bold mt-2">
          {money(ad.price, ad.currency)}
        </p>
      </div>
    </article>
  )
}
