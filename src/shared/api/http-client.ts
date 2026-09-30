import { API_BASE_URL } from '@/shared/config';

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
  const headers = new Headers(options.headers);

  // Orval отдаёт JSON как string без Content-Type. Для эндпоинтов с
  // application/json | multipart без заголовка бэкенд отвечает 400.
  // FormData не трогаем — boundary выставит браузер.
  if (
    typeof options.body === 'string' &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(resolveUrl(url), {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return parseBody<T>(response);
};
