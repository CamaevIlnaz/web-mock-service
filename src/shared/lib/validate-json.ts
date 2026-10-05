export interface JsonValidationResult {
  ok: boolean;
  message: string;
}

export const validateJson = (
  value: string,
  emptyMessage = 'Укажите JSON',
): JsonValidationResult => {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: false, message: emptyMessage };
  }

  try {
    JSON.parse(trimmed);
    return { ok: true, message: 'JSON корректен' };
  } catch {
    return { ok: false, message: 'JSON некорректен' };
  }
};
