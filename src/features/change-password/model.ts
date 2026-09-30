import { createEvent, createStore, sample } from 'effector';

import { sessionModel } from '@/entities/session';
import { notifySuccessFx } from '@/shared/ui';

import type { ChangePasswordFormValues } from './lib';

export const formSubmitted = createEvent<ChangePasswordFormValues>();

export const $isSubmitting = sessionModel.changePasswordFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(
    sessionModel.changePasswordFx.fail,
    () => 'Не удалось сменить пароль. Проверьте текущий пароль',
  )
  .reset(formSubmitted, sessionModel.changePasswordFx.done);

sample({
  clock: formSubmitted,
  fn: ({ currentPassword, newPassword }) => ({ currentPassword, newPassword }),
  target: sessionModel.changePasswordFx,
});

sample({
  clock: sessionModel.changePasswordFx.done,
  fn: () => 'Пароль изменён',
  target: notifySuccessFx,
});

export const changePasswordModel = {
  $isSubmitting,
  $submitError,
  formSubmitted,
  passwordChanged: sessionModel.changePasswordFx.done,
};
