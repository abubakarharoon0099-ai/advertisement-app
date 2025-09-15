import { fetchAdsServer } from "@/lib/utils/fetcher";
import InfiniteClient from "@/components/InfiniteClient";

const AdsSection = async ({ limit }: { limit: number }) => {
  const { items, nextCursor, hasMore } = await fetchAdsServer(0, limit);

  return (
    <InfiniteClient
      initialItems={items}
      initialCursor={nextCursor}
      hasMore={hasMore}
    />
  );
};

export default AdsSection;