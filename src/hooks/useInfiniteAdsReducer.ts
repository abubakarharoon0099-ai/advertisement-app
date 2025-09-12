import { InfiniteState, InfiniteAction } from "@/lib/types/infinite"

export const initialState: InfiniteState<never> = {
  items: [],
  cursor: 0,
  hasMore: true,
  loading: false,
  error: false,
}

export function reducer<T>(
  state: InfiniteState<T>,
  action: InfiniteAction<T>
): InfiniteState<T> {
  switch (action.type) {
    case "start":
      return { ...state, loading: true, error: false }
    case "success":
      return {
        items: [...state.items, ...action.payload.items],
        cursor: action.payload.nextCursor,
        hasMore: action.payload.hasMore,
        loading: false,
        error: false,
      }
    case "error":
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}
