import { createEvent, sample } from 'effector';

import { sessionModel } from '@/entities/session';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

import { validateAvatarFile } from './lib';

export const fileSelected = createEvent<File>();

export const $isUploading = sessionModel.uploadAvatarFx.pending;

sample({
  clock: fileSelected,
  filter: (file) => validateAvatarFile(file) === null,
  target: sessionModel.uploadAvatarFx,
});

sample({
  clock: fileSelected,
  filter: (file) => validateAvatarFile(file) !== null,
  fn: (file) => validateAvatarFile(file) ?? '',
  target: notifyErrorFx,
});

sample({
  clock: sessionModel.uploadAvatarFx.done,
  fn: () => 'Аватар обновлён',
  target: notifySuccessFx,
});

sample({
  clock: sessionModel.uploadAvatarFx.fail,
  fn: () => 'Не удалось загрузить аватар',
  target: notifyErrorFx,
});

export const uploadAvatarModel = {
  $isUploading,
  fileSelected,
};
