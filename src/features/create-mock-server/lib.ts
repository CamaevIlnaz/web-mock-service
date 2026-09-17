import type { CreateServerFormErrors, CreateServerFormValues } from './types';

export const validateCreateServerForm = (
  values: CreateServerFormValues,
): CreateServerFormErrors => {
  const errors: CreateServerFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Укажите название';
  }

  if (!values.standCode) {
    errors.standCode = 'Выберите удалённый сервер';
  }

  return errors;
};

export const hasFormErrors = (errors: CreateServerFormErrors): boolean =>
  Boolean(errors.name || errors.standCode);
