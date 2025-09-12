// hooks/useInfiniteAdsReducer.ts
import { useReducer } from "react";
import { State, Action } from "@/lib/types/infinite";

// Initial state for infinite scroll
const initialState: State = {
  items: [],
  cursor: 0,
  hasMore: true,
  loading: false,
};

// Reducer function
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true };
    case "LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.items],
        cursor: action.payload.cursor,
        hasMore: action.payload.hasMore,
      };
    case "LOAD_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

// Custom hook that returns [state, dispatch] tuple
export const useInfiniteAdsReducer = () => {
  return useReducer(reducer, initialState);
};
