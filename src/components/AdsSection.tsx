import InfiniteClient from "@/components/InfiniteClient";
import { fetchAdsServer } from "@/lib/utils/fetcher";

export default async function AdsSection({ limit }: { limit: number }) {
  const { items, nextCursor, hasMore } = await fetchAdsServer(0, limit);

  return (
    <InfiniteClient
      initialItems={items}
      initialCursor={nextCursor}
      hasMore={hasMore}
    />     
  );
}
