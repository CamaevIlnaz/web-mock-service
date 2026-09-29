import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { Check, CircleAlert } from 'lucide-react';
import { useMemo } from 'react';
import {
  Controller,
  get,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import type { ConfigureRuleFormValues } from '../../lib';

const getJsonValidation = (
  value: string,
): { ok: boolean; message: string } => {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: false, message: 'Укажите JSON ответа' };
  }

  try {
    JSON.parse(trimmed);
    return { ok: true, message: 'JSON корректен' };
  } catch {
    return { ok: false, message: 'JSON некорректен' };
  }
};

export const JsonResponseEditor = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ConfigureRuleFormValues>();
  const responseBody = useWatch({ control, name: 'responseBody' }) ?? '';
  const validation = useMemo(
    () => getJsonValidation(responseBody),
    [responseBody],
  );
  const errorMessage = get(errors, 'responseBody')?.message as
    | string
    | undefined;

  const lines = Math.max(responseBody.split('\n').length, 1);

  return (
    <Box>
      <Controller
        name="responseBody"
        control={control}
        render={({ field }) => (
          <Flex
            borderWidth="1px"
            borderColor={errorMessage ? 'danger' : 'border'}
            borderRadius="md"
            overflow="hidden"
            bg="#1e2430"
            minH="180px"
          >
            <Box
              py="3"
              px="2"
              bg="#161b24"
              color="#6b7380"
              fontFamily="mono"
              fontSize="xs"
              lineHeight="1.6"
              userSelect="none"
              textAlign="right"
              minW="36px"
            >
              {Array.from({ length: lines }, (_, index) => (
                <Box key={index + 1}>{index + 1}</Box>
              ))}
            </Box>
            <Textarea
              {...field}
              flex="1"
              border="none"
              borderRadius="0"
              bg="transparent"
              color="#e8ecf2"
              fontFamily="mono"
              fontSize="sm"
              lineHeight="1.6"
              py="3"
              px="3"
              resize="vertical"
              minH="180px"
              spellCheck={false}
              _focus={{ outline: 'none', boxShadow: 'none' }}
              _focusVisible={{ outline: 'none', boxShadow: 'none' }}
            />
          </Flex>
        )}
      />

      <Flex align="center" gap="2" mt="2">
        {validation.ok ? (
          <Check size={16} color="#16a34a" strokeWidth={2.25} />
        ) : (
          <CircleAlert size={16} color="#9c211c" strokeWidth={2} />
        )}
        <Text
          fontSize="sm"
          color={validation.ok ? 'green.600' : 'danger'}
        >
          {errorMessage ?? validation.message}
        </Text>
      </Flex>
    </Box>
  );
};
