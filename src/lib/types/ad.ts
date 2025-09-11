export type Seller = {
  name: string
  type: string
  contact: string
}

export type Ad = {
  id: number
  title: string
  description: string
  price: number
  currency: string
  category: string
  location: string
  posted_date: string
  seller: Seller
  images: string[]
  condition: string
}
