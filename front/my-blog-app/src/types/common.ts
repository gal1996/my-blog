export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiError {
  message: string;
  status?: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';