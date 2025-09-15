import { Ad } from "./ad";
export interface State {
  items: Ad[];
  cursor: number | null;
  hasMore: boolean;
  loading: boolean;
}
export type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: { items: Ad[]; cursor: number | null; hasMore: boolean } }
  | { type: "LOAD_FAILURE" };
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
