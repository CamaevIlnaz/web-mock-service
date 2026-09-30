import { createEvent, sample } from 'effector';

import { sessionModel } from '@/entities/session';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

import type { UpdateProfileFormValues } from './lib';

export const formSubmitted = createEvent<UpdateProfileFormValues>();

export const $isSubmitting = sessionModel.updateProfileFx.pending;

sample({
  clock: formSubmitted,
  target: sessionModel.updateProfileFx,
});

sample({
  clock: sessionModel.updateProfileFx.done,
  fn: () => 'Профиль обновлён',
  target: notifySuccessFx,
});

sample({
  clock: sessionModel.updateProfileFx.fail,
  fn: () => 'Не удалось обновить профиль',
  target: notifyErrorFx,
});

export const updateProfileModel = {
  $isSubmitting,
  formSubmitted,
};
