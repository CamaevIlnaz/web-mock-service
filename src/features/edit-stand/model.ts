import { createEvent, createStore, sample } from 'effector';

import {
  standModel,
  type StandFormValues,
  type StandResponseDto,
} from '@/entities/stand';

export const modalOpened = createEvent<StandResponseDto>();
export const modalClosed = createEvent();
export const formSubmitted = createEvent<StandFormValues>();

export const $stand = createStore<StandResponseDto | null>(null)
  .on(modalOpened, (_, stand) => stand)
  .reset(modalClosed, standModel.updateStandFx.done);

export const $isOpen = createStore(false)
  .on(modalOpened, () => true)
  .on(modalClosed, () => false)
  .on(standModel.updateStandFx.done, () => false);

export const $isSubmitting = standModel.updateStandFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(standModel.updateStandFx.failData, (_, error) => error.message)
  .reset(modalClosed, formSubmitted, standModel.updateStandFx.done);

sample({
  clock: formSubmitted,
  source: $stand,
  filter: Boolean,
  fn: (stand, values) => ({
    id: stand!.id,
    data: values,
  }),
  target: standModel.standUpdated,
});

export const editStandModel = {
  $stand,
  $isOpen,
  $isSubmitting,
  $submitError,
  modalOpened,
  modalClosed,
  formSubmitted,
};
