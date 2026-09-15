const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

const resolveUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;

  return `${base}${path}`;
};

const parseBody = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  if (
    contentType?.includes('application/pdf') ||
    contentType?.includes('application/octet-stream')
  ) {
    return response.blob() as Promise<T>;
  }

  return response.text() as Promise<T>;
};

/**
 * Mutator для orval (client: fetch).
 * Возвращает тело ответа напрямую — см. includeHttpResponseReturnType: false.
 */
export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const response = await fetch(resolveUrl(url), {
    ...options,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return parseBody<T>(response);
};
