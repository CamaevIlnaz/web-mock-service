import { createEvent, createStore, sample } from 'effector';

import { standModel, type StandResponseDto } from '@/entities/stand';

export const dialogOpened = createEvent<StandResponseDto>();
export const dialogClosed = createEvent();
export const confirmed = createEvent();

export const $stand = createStore<StandResponseDto | null>(null)
  .on(dialogOpened, (_, stand) => stand)
  .reset(dialogClosed, standModel.removeStandFx.done);

export const $isOpen = createStore(false)
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)
  .on(standModel.removeStandFx.done, () => false);

export const $isSubmitting = standModel.removeStandFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(standModel.removeStandFx.failData, (_, error) => error.message)
  .reset(dialogClosed, confirmed, standModel.removeStandFx.done);

sample({
  clock: confirmed,
  source: $stand,
  filter: Boolean,
  fn: (stand) => stand!.id,
  target: standModel.standRemoved,
});

export const deleteStandModel = {
  $stand,
  $isOpen,
  $isSubmitting,
  $submitError,
  dialogOpened,
  dialogClosed,
  confirmed,
};
