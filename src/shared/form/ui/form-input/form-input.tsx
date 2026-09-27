import { Box, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState, type ReactNode } from 'react';
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
  type?: 'text' | 'email' | 'password';
  startElement?: ReactNode;
}

export const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  helperText,
  required,
  type = 'text',
  startElement,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (!isVisible) {
    return null;
  }

  const errorMessage = get(errors, name)?.message as string | undefined;
  const isPassword = type === 'password';
  const inputType = isPassword
    ? isPasswordVisible
      ? 'text'
      : 'password'
    : type;

  const input = (
    <Input
      {...register(name)}
      type={inputType}
      placeholder={placeholder}
      disabled={isDisabled}
      required={false}
      aria-required={required || undefined}
      size="md"
      w="100%"
      bg="panel"
      borderColor="border"
      h="11"
    />
  );

  const fieldControl =
    startElement || isPassword ? (
      <InputGroup
        w="100%"
        startElement={
          startElement ? (
            <Box color="muted" display="flex" alignItems="center">
              {startElement}
            </Box>
          ) : undefined
        }
        endElement={
          isPassword ? (
            <IconButton
              type="button"
              aria-label={
                isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'
              }
              variant="ghost"
              size="xs"
              color="muted"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              tabIndex={-1}
            >
              {isPasswordVisible ? (
                <EyeOff size={18} strokeWidth={1.75} />
              ) : (
                <Eye size={18} strokeWidth={1.75} />
              )}
            </IconButton>
          ) : undefined
        }
      >
        {input}
      </InputGroup>
    ) : (
      input
    );

  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      errorMessage={errorMessage}
    >
      <Box mt="1.5" w="100%">
        {fieldControl}
      </Box>
    </FormField>
  );
};
