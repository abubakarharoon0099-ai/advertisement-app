export interface InfiniteState<T> {
  items: T[]
  cursor: number | null
  hasMore: boolean
  loading: boolean
  error: boolean
}
export const initialState: InfiniteState<any> = {
  items: [],
  cursor: 0,
  hasMore: true,
  loading: false,
  error: false,
}
export type InfiniteAction<T> =
  | { type: "start" }
  | {
      type: "success"
      payload: { items: T[]; nextCursor: number | null; hasMore: boolean }
    }
  | { type: "error" }
