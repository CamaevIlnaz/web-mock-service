import { Input } from '@chakra-ui/react';
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormFieldState } from '../../lib/use-form-field-state';
import type { FormFieldDependencyProps } from '../../lib/types';
import { FormField } from '../form-field';

export interface FormInputProps<TFieldValues extends FieldValues>
  extends FormFieldDependencyProps<TFieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  helperText,
  required,
  dependencies,
  visible = true,
  disabled = false,
}: FormInputProps<TFieldValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const { isVisible, isDisabled } = useFormFieldState<TFieldValues>({
    dependencies,
    visible,
    disabled,
  });

  if (!isVisible) {
    return null;
  }

  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      errorMessage={errorMessage}
    >
      <Input
        {...register(name)}
        placeholder={placeholder}
        disabled={isDisabled}
        size="md"
        bg="panel"
        borderColor="border"
        mt="1.5"
      />
    </FormField>
  );
};
