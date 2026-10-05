const UNITS = ['Б', 'КБ', 'МБ', 'ГБ'] as const;

export const formatFileSize = (sizeBytes: number): string => {
  if (!Number.isFinite(sizeBytes) || sizeBytes < 0) {
    return '—';
  }

  if (sizeBytes < 1024) {
    return `${sizeBytes} ${UNITS[0]}`;
  }

  let value = sizeBytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < UNITS.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const precision = value >= 10 || unitIndex === 0 ? 0 : 1;

  return `${value.toFixed(precision)} ${UNITS[unitIndex]}`;
};
