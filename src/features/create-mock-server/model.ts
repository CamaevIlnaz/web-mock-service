import { createEvent, createStore, sample } from 'effector';

import { mockServerModel } from '@/entities/mock-server';
import { formatStandLabel, standModel } from '@/entities/stand';
import { notifySuccessFx } from '@/shared/ui';

import type { CreateServerFormValues } from './lib';
import type { StandOption } from './types';

export const modalOpened = createEvent();
export const modalClosed = createEvent();
export const formSubmitted = createEvent<CreateServerFormValues>();

export const $isOpen = createStore(false)
  .on(modalOpened, () => true)
  .on(modalClosed, () => false)
  .on(mockServerModel.createServerFx.done, () => false);

export const $isSubmitting = mockServerModel.createServerFx.pending;

export const $standOptions = standModel.$stands.map(
  (stands): StandOption[] =>
    stands.map((stand) => ({
      value: stand.code,
      label: formatStandLabel(stand),
    })),
);

export const $submitError = createStore<string | null>(null)
  .on(mockServerModel.createServerFx.failData, (_, error) => error.message)
  .reset(modalClosed, formSubmitted, mockServerModel.createServerFx.done);

sample({
  clock: formSubmitted,
  fn: ({ name, standCode }) => ({
    name,
    standCode,
  }),
  target: mockServerModel.serverCreated,
});

sample({
  clock: mockServerModel.createServerFx.done,
  fn: () => 'Сервер создан',
  target: notifySuccessFx,
});

export const createMockServerModel = {
  $isOpen,
  $isSubmitting,
  $standOptions,
  $submitError,
  modalOpened,
  modalClosed,
  formSubmitted,
};
