import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const cursor = Number(url.searchParams.get("cursor") ?? 0);
const limit = Number(url.searchParams.get("limit") ?? 21);
  const p = path.join(process.cwd(), "public", "ads_data.json");
const raw = await fs.readFile(p, "utf8");
  const ads = JSON.parse(raw);
  const page = ads.slice(cursor, cursor + limit);
  const nextCursor = cursor + limit < ads.length ? cursor + limit : null;
const hasMore = nextCursor !== null;
  return NextResponse.json({ items: page, nextCursor, hasMore });
}
