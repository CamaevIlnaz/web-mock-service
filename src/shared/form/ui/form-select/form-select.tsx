import { NativeSelect } from '@chakra-ui/react';
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormFieldState } from '../../lib/use-form-field-state';
import type {
  FormFieldDependencyProps,
  FormFieldOption,
} from '../../lib/types';
import { FormField } from '../form-field';

export interface FormSelectProps<TFieldValues extends FieldValues>
  extends FormFieldDependencyProps<TFieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  options: FormFieldOption[];
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export const FormSelect = <TFieldValues extends FieldValues>({
  name,
  label,
  options,
  placeholder,
  helperText,
  required,
  dependencies,
  visible = true,
  disabled = false,
}: FormSelectProps<TFieldValues>) => {
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
      <NativeSelect.Root
        size="md"
        mt="1.5"
        width="100%"
        disabled={isDisabled}
        invalid={Boolean(errorMessage)}
      >
        <NativeSelect.Field
          {...register(name)}
          placeholder={placeholder}
          bg="panel"
          borderColor="border"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </FormField>
  );
};
