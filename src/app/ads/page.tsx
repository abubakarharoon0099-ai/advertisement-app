import AdsSection from "@/components/AdsSection"

export const dynamic = "force-dynamic"

export default async function AdsPage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Ads</h1>
      <AdsSection limit={21} />
    </main>
  )
}
