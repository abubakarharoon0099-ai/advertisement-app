export interface InfiniteState<T> {
  items: T[]
  cursor: number | null
  hasMore: boolean
  loading: boolean
  error: boolean
}

export type InfiniteAction<T> =
  | { type: "start" }
  | {
      type: "success"
      payload: { items: T[]; nextCursor: number | null; hasMore: boolean }
    }
  | { type: "error" }