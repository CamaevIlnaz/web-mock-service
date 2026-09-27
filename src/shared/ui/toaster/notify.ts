import { createEffect } from 'effector';

import { toaster } from './toaster';
import type { NotifyInput, NotifyOptions, NotifyType } from './types';

const toOptions = (input: NotifyInput): NotifyOptions => {
  if (typeof input === 'string') {
    return { title: input };
  }

  return input;
};

const create = (type: NotifyType, input: NotifyInput) => {
  const options = toOptions(input);

  return toaster.create({
    type,
    title: options.title,
    description: options.description,
    duration: options.duration,
    closable: options.closable ?? true,
  });
};

export const notify = {
  success: (input: NotifyInput) => create('success', input),
  error: (input: NotifyInput) => create('error', input),
  info: (input: NotifyInput) => create('info', input),
  warning: (input: NotifyInput) => create('warning', input),
  loading: (input: NotifyInput) => create('loading', input),
  dismiss: (id?: string) => {
    if (id) {
      toaster.dismiss(id);
      return;
    }

    toaster.dismiss();
  },
  update: toaster.update.bind(toaster),
  promise: toaster.promise.bind(toaster),
};

export const notifySuccessFx = createEffect((input: NotifyInput) => {
  notify.success(input);
});

export const notifyErrorFx = createEffect((input: NotifyInput) => {
  notify.error(input);
});
