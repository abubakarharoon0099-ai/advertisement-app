import { Ad } from "@/lib/types/ad";
export async function fetchAdsServer(cursor: number | null, limit: number) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/ads?cursor=${cursor ?? 0}&limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch ads");
  return res.json() as Promise<{ items: Ad[]; nextCursor: number | null; hasMore: boolean }>;
}
export async function fetchAdsClient(cursor: number | null, limit: number) {
  const res = await fetch(`/api/ads?cursor=${cursor ?? 0}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch ads");
  return res.json() as Promise<{ items: Ad[]; nextCursor: number | null; hasMore: boolean }>;
}
