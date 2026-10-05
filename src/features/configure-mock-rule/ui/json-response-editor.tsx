import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  Controller,
  get,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import { validateJson } from '@/shared/lib';
import { JsonEditor, JsonValidationStatus } from '@/shared/ui';

import type { ConfigureRuleFormValues } from '../lib';

export const JsonResponseEditor = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ConfigureRuleFormValues>();
  const responseBody = useWatch({ control, name: 'responseBody' }) ?? '';
  const validation = useMemo(
    () => validateJson(responseBody, 'Укажите JSON ответа'),
    [responseBody],
  );
  const errorMessage = get(errors, 'responseBody')?.message as
    | string
    | undefined;

  return (
    <Box>
      <Controller
        name="responseBody"
        control={control}
        render={({ field }) => (
          <JsonEditor
            ref={field.ref}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            invalid={Boolean(errorMessage)}
          />
        )}
      />

      <Box mt="2">
        <JsonValidationStatus
          ok={validation.ok}
          message={errorMessage ?? validation.message}
        />
      </Box>
    </Box>
  );
};
