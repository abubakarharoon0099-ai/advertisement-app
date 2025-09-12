

import { InfiniteState, InfiniteAction } from "@/lib/types/infinite"
export const initialState: InfiniteState<any> = {
  items: [],
  cursor: 0,
  hasMore: true,
  loading: false,
  error: false,
}
export const reducer = (state: InfiniteState<any>, action: InfiniteAction<any>): InfiniteState<any> => {
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
