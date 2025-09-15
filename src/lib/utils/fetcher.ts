import { Ad } from "@/lib/types/ad";
export async function fetchAdsServer(cursor: number | null, limit: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    const res = await fetch(
      `${baseUrl}/api/ads?cursor=${cursor ?? 0}&limit=${limit}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch ads (server). Status: ${res.status}`);
    }
    return (await res.json()) as {
      items: Ad[];
      nextCursor: number | null;
      hasMore: boolean;
    };
  } catch (error) {
    console.error("fetchAdsServer error:", error);
    return { items: [], nextCursor: null, hasMore: false };
  }
}
export async function fetchAdsClient(cursor: number | null, limit: number) {
  try {
    const res = await fetch(`/api/ads?cursor=${cursor ?? 0}&limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ads (client). Status: ${res.status}`);
    }
    return (await res.json()) as {
      items: Ad[];
      nextCursor: number | null;
      hasMore: boolean;
    };
  } catch (error) {
    console.error("fetchAdsClient error:", error);
    return { items: [], nextCursor: null, hasMore: false };
  }
}