export const money = (v: number, c: string) => {
  try {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: c,
      maximumFractionDigits: 0,
    }).format(v)
  } catch {
    return `${v} ${c}`
  }
}
