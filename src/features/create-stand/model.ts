import { createEvent, createStore, sample } from 'effector';

import { standModel, type StandFormValues } from '@/entities/stand';

export const modalOpened = createEvent();
export const modalClosed = createEvent();
export const formSubmitted = createEvent<StandFormValues>();

export const $isOpen = createStore(false)
  .on(modalOpened, () => true)
  .on(modalClosed, () => false)
  .on(standModel.createStandFx.done, () => false);

export const $isSubmitting = standModel.createStandFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(standModel.createStandFx.failData, (_, error) => error.message)
  .reset(modalClosed, formSubmitted, standModel.createStandFx.done);

sample({
  clock: formSubmitted,
  target: standModel.standCreated,
});

export const createStandModel = {
  $isOpen,
  $isSubmitting,
  $submitError,
  modalOpened,
  modalClosed,
  formSubmitted,
};
