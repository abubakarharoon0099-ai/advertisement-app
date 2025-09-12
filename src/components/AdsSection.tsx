// src/components/AdsSection.tsx
import InfiniteClient from "@/components/InfiniteClient";
import { fetchAdsServer } from "@/lib/utils/fetcher";



import { Ad } from "@/lib/types/ad";

interface AdsSectionProps {
  limit: number;
}

export default async function AdsSection({ limit }: AdsSectionProps) {
const { items, nextCursor, hasMore } = await fetchAdsServer(0, limit);

  return (
    <InfiniteClient
      initialItems={items}
      initialCursor={nextCursor}
      hasMore={hasMore}
    />
  );
}
