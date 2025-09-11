import Link from 'next/link'

export default async function Home() {
  return (
    <main className="container">
      <h1>Advertisements</h1>
      <div style={{height:8}} />
      <Link href="/ads" className="btn">Open Ads</Link>
    </main>
  )
}
