import type { Ad } from "@/lib/types/ad"
import { money } from "@/lib/utils/format"
export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <article className="group relative border rounded-2xl shadow-sm overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      {ad.images?.length ? (
        <img
          src={ad.images[0]}
          alt={ad.title}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-52 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          No Image Provided
        </div>
      )}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
            {ad.title}
          </h3>
          <span className="ml-3 shrink-0 px-2.5 py-0.5 text-xs font-medium bg-gray-50 border rounded-full text-gray-600">
            {ad.condition}
          </span>
        </div>
        <p className="text-sm text-gray-500">{ad.location}</p>
        <p className="text-indigo-600 font-bold text-lg">
          {money(ad.price, ad.currency)}
        </p>
      </div>
    </article>
  )
}