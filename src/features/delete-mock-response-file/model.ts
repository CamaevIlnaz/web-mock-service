import { createEvent, createStore, sample } from 'effector';

import {
  mockResponseFileModel,
  type MockResponseFileMetaDto,
} from '@/entities/mock-response-file';
import { notifySuccessFx } from '@/shared/ui';

export interface DeleteMockResponseFilePayload {
  mockServerId: number;
  file: MockResponseFileMetaDto;
}

export const dialogOpened = createEvent<DeleteMockResponseFilePayload>();
export const dialogClosed = createEvent();
export const confirmed = createEvent();

export const $payload = createStore<DeleteMockResponseFilePayload | null>(null)
  .on(dialogOpened, (_, payload) => payload)
  .reset(dialogClosed, mockResponseFileModel.removeResponseFileFx.done);

export const $isOpen = createStore(false)
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)
  .on(mockResponseFileModel.removeResponseFileFx.done, () => false);

export const $isSubmitting =
  mockResponseFileModel.removeResponseFileFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(
    mockResponseFileModel.removeResponseFileFx.failData,
    (_, error) => error.message,
  )
  .reset(
    dialogClosed,
    confirmed,
    mockResponseFileModel.removeResponseFileFx.done,
  );

sample({
  clock: confirmed,
  source: $payload,
  filter: Boolean,
  fn: (payload) => ({
    mockServerId: payload!.mockServerId,
    fileId: payload!.file.id,
  }),
  target: mockResponseFileModel.fileRemoved,
});

sample({
  clock: mockResponseFileModel.removeResponseFileFx.done,
  fn: () => 'Файл удалён',
  target: notifySuccessFx,
});

export const deleteMockResponseFileModel = {
  $payload,
  $isOpen,
  $isSubmitting,
  $submitError,
  dialogOpened,
  dialogClosed,
  confirmed,
};
