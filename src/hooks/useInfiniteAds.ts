import { useReducer, useEffect, useRef } from "react";
import { fetchAdsClient } from "@/lib/utils/fetcher";
import { Ad } from "@/lib/types/ad";
import { State, Action } from "@/lib/types/infinite";
export const useInfiniteAds = (
  initialItems: Ad[] = [],
  initialCursor: number | null = 0,
  initialHasMore: boolean = true
) => {
  const [state, dispatch] = useReducer(reducer, {
    items: initialItems,
    cursor: initialCursor,
    hasMore: initialHasMore,
    loading: false,
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const loadMore = async () => {
    if (!state.hasMore || state.loading) return;
    dispatch({ type: "LOAD_START" });
    try {
     const data = await fetchAdsClient(state.cursor, 21);
      dispatch({
        type: "LOAD_SUCCESS",
        payload: {
          items: data?.items || [],
          cursor: data?.nextCursor ?? null,
          hasMore: data?.hasMore ?? false,
        },
      });
    } catch (err) {
      console.error("fetchAds error:", err);
      dispatch({ type: "LOAD_FAILURE" });
    }
  };
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [state.cursor, state.hasMore, state.loading]);

  return { ...state, ref, loadMore };
};
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true };
    case "LOAD_SUCCESS":
      return {
        items: [...state.items, ...action.payload.items],
        cursor: action.payload.cursor,
        hasMore: action.payload.hasMore,
        loading: false,
      };
    case "LOAD_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};
