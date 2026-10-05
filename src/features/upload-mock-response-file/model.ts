import { createEvent, sample } from 'effector';

import { mockResponseFileModel } from '@/entities/mock-response-file';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const ACCEPTED_FILE_TYPES = '.json,.pdf,application/json,application/pdf';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.json', '.pdf'];

export interface UploadMockResponseFilePayload {
  mockServerId: number;
  file: File;
}

export const fileChosen = createEvent<UploadMockResponseFilePayload>();

const getValidationError = (file: File): string | null => {
  const name = file.name.toLowerCase();

  if (!ALLOWED_EXTENSIONS.some((extension) => name.endsWith(extension))) {
    return 'Можно загрузить только JSON или PDF';
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'Размер файла не должен превышать 5 МБ';
  }

  return null;
};

export const $isUploading = mockResponseFileModel.uploadResponseFileFx.pending;

sample({
  clock: fileChosen,
  filter: ({ file }) => getValidationError(file) !== null,
  fn: ({ file }) => getValidationError(file)!,
  target: notifyErrorFx,
});

sample({
  clock: fileChosen,
  filter: ({ file }) => getValidationError(file) === null,
  target: mockResponseFileModel.uploadResponseFileFx,
});

sample({
  clock: mockResponseFileModel.uploadResponseFileFx.doneData,
  fn: (file) => `Файл «${file.originalName}» загружен`,
  target: notifySuccessFx,
});

sample({
  clock: mockResponseFileModel.uploadResponseFileFx.failData,
  fn: (error) => error.message || 'Не удалось загрузить файл',
  target: notifyErrorFx,
});

export const uploadMockResponseFileModel = {
  $isUploading,
  fileChosen,
};
