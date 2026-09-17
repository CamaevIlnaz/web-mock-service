import { Textarea } from '@chakra-ui/react';
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormFieldState } from '../../lib/use-form-field-state';
import type { FormFieldDependencyProps } from '../../lib/types';
import { FormField } from '../form-field';

export interface FormTextareaProps<TFieldValues extends FieldValues>
  extends FormFieldDependencyProps<TFieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
}

export const FormTextarea = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  helperText,
  required,
  rows = 4,
  dependencies,
  visible = true,
  disabled = false,
}: FormTextareaProps<TFieldValues>) => {
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
      <Textarea
        {...register(name)}
        placeholder={placeholder}
        disabled={isDisabled}
        rows={rows}
        size="md"
        bg="panel"
        borderColor="border"
        mt="1.5"
      />
    </FormField>
  );
};
