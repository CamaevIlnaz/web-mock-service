import { Box, Flex, Switch, Text } from '@chakra-ui/react';
import {
  Controller,
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormFieldState } from '../../lib/use-form-field-state';
import type { FormFieldDependencyProps } from '../../lib/types';

export interface FormToggleProps<TFieldValues extends FieldValues>
  extends FormFieldDependencyProps<TFieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  helperText?: string;
  required?: boolean;
}

export const FormToggle = <TFieldValues extends FieldValues>({
  name,
  label,
  description,
  helperText,
  required,
  dependencies,
  visible = true,
  disabled = false,
}: FormToggleProps<TFieldValues>) => {
  const {
    control,
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
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Flex align="center" justify="space-between" gap="4">
            <Box>
              <Text
                as="label"
                fontSize="sm"
                fontWeight="semibold"
                color="heading"
              >
                {label}
                {required ? (
                  <Text as="span" color="danger" ml="0.5">
                    *
                  </Text>
                ) : null}
              </Text>
              {description ? (
                <Text fontSize="sm" color="muted" mt="1" lineHeight="1.5">
                  {description}
                </Text>
              ) : null}
            </Box>

            <Switch.Root
              checked={Boolean(field.value)}
              disabled={isDisabled}
              name={field.name}
              onCheckedChange={({ checked }) => field.onChange(checked)}
              colorPalette="blue"
              size="md"
            >
              <Switch.HiddenInput ref={field.ref} onBlur={field.onBlur} />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Root>
          </Flex>
        )}
      />

      {helperText ? (
        <Text fontSize="sm" color="muted" mt="1.5">
          {helperText}
        </Text>
      ) : null}
      {errorMessage ? (
        <Text fontSize="sm" color="danger" mt="1.5">
          {errorMessage}
        </Text>
      ) : null}
    </Box>
  );
};
