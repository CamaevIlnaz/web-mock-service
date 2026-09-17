import { Field } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  children: ReactNode;
}

export const FormField = ({
  label,
  required,
  helperText,
  errorMessage,
  children,
}: FormFieldProps) => {
  const isInvalid = Boolean(errorMessage);

  return (
    <Field.Root invalid={isInvalid} required={required}>
      <Field.Label fontSize="sm" fontWeight="semibold" color="heading">
        {label}
        {required ? <Field.RequiredIndicator color="danger" /> : null}
      </Field.Label>
      {children}
      {helperText ? (
        <Field.HelperText fontSize="sm" color="muted" mt="1.5">
          {helperText}
        </Field.HelperText>
      ) : null}
      {errorMessage ? <Field.ErrorText>{errorMessage}</Field.ErrorText> : null}
    </Field.Root>
  );
};
