"use client";
import { FC } from "react";
import { Ad } from "@/lib/types/ad";
import { useInfiniteAds } from "@/hooks/useInfiniteAds";
import { InfiniteClientProps } from "@/lib/types/infinite";
import AdCard from "@/components/AdCard";
import Spinner from "@/components/Spinner";
import NoAds from "@/components/NoAds";


const InfiniteClient: FC<InfiniteClientProps> = ({
  initialItems,
  initialCursor,
  hasMore: initialHasMore,
}) => {
  const { items, loading, hasMore, ref } = useInfiniteAds(
    initialItems,
    initialCursor,
    initialHasMore
  );
  if (!items || items.length === 0) {
    return
   <NoAds />;

  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {items.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
      <div ref={ref} className="col-span-full text-center py-6">
        {loading ? <Spinner /> : !hasMore ? "No more ads" : null}
      </div>
    </section>
  );
};
export default InfiniteClient;
