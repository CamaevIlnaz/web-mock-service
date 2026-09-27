import { createEvent, createStore, sample } from 'effector';

import {
  mockServerModel,
  type MockServerResponseDto,
} from '@/entities/mock-server';

export const dialogOpened = createEvent<MockServerResponseDto>();
export const dialogClosed = createEvent();
export const confirmed = createEvent();

export const $server = createStore<MockServerResponseDto | null>(null)
  .on(dialogOpened, (_, server) => server)
  .reset(dialogClosed, mockServerModel.removeServerFx.done);

export const $isOpen = createStore(false)
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)
  .on(mockServerModel.removeServerFx.done, () => false);

export const $isSubmitting = mockServerModel.removeServerFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(mockServerModel.removeServerFx.failData, (_, error) => error.message)
  .reset(dialogClosed, confirmed, mockServerModel.removeServerFx.done);

sample({
  clock: confirmed,
  source: $server,
  filter: Boolean,
  fn: (server) => server!.id,
  target: mockServerModel.serverRemoved,
});

export const deleteMockServerModel = {
  $server,
  $isOpen,
  $isSubmitting,
  $submitError,
  dialogOpened,
  dialogClosed,
  confirmed,
};
