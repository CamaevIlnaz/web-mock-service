import { combine, createEvent, createStore, sample } from 'effector';

import { mockServerModel } from '@/entities/mock-server';
import { formatStandLabel, standModel } from '@/entities/stand';

import { hasFormErrors, validateCreateServerForm } from './lib';
import type { CreateServerFormErrors, StandOption } from './types';

export const modalOpened = createEvent();
export const modalClosed = createEvent();
export const nameChanged = createEvent<string>();
export const standCodeChanged = createEvent<string>();
export const formSubmitted = createEvent();

export const $isOpen = createStore(false)
  .on(modalOpened, () => true)
  .on(modalClosed, () => false)
  .on(mockServerModel.createServerFx.done, () => false);

export const $name = createStore('')
  .on(nameChanged, (_, name) => name)
  .reset(modalClosed, mockServerModel.createServerFx.done);

export const $standCode = createStore('')
  .on(standCodeChanged, (_, standCode) => standCode)
  .reset(modalClosed, mockServerModel.createServerFx.done);

export const $errors = createStore<CreateServerFormErrors>({})
  .on(nameChanged, (errors) => {
    if (!errors.name) {
      return errors;
    }

    const next = { ...errors };
    delete next.name;
    return next;
  })
  .on(standCodeChanged, (errors) => {
    if (!errors.standCode) {
      return errors;
    }

    const next = { ...errors };
    delete next.standCode;
    return next;
  })
  .reset(modalClosed, mockServerModel.createServerFx.done);

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

const $formValues = combine({
  name: $name,
  standCode: $standCode,
});

sample({
  clock: formSubmitted,
  source: $formValues,
  fn: validateCreateServerForm,
  target: $errors,
});

sample({
  clock: formSubmitted,
  source: $formValues,
  filter: (values) => !hasFormErrors(validateCreateServerForm(values)),
  fn: ({ name, standCode }) => ({
    name: name.trim(),
    standCode,
  }),
  target: mockServerModel.serverCreated,
});

export const createMockServerModel = {
  $isOpen,
  $name,
  $standCode,
  $errors,
  $isSubmitting,
  $standOptions,
  $submitError,
  modalOpened,
  modalClosed,
  nameChanged,
  standCodeChanged,
  formSubmitted,
};
