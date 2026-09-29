import { Box, Text } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { CreateMockRuleDtoResponseType } from '@/shared/api/generated/model/createMockRuleDtoResponseType';

import type { ConfigureRuleFormValues } from '../lib';

const OPTIONS = [
  {
    value: CreateMockRuleDtoResponseType.INLINE_JSON,
    label: 'JSON',
  },
  {
    value: CreateMockRuleDtoResponseType.FILE,
    label: 'Файл',
  },
] as const;

export const ResponseSourceSegment = () => {
  const { control } = useFormContext<ConfigureRuleFormValues>();

  return (
    <Box>
      <Text fontSize="sm" fontWeight="semibold" color="heading" mb="1.5">
        Источник ответа
      </Text>
      <Controller
        name="responseType"
        control={control}
        render={({ field }) => (
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            borderWidth="1px"
            borderColor="border"
            borderRadius="md"
            overflow="hidden"
            bg="panel"
          >
            {OPTIONS.map((option) => {
              const isActive = field.value === option.value;

              return (
                <Box
                  as="button"
                  type="button"
                  key={option.value}
                  py="2"
                  px="3"
                  fontSize="sm"
                  fontWeight="medium"
                  cursor="pointer"
                  bg={isActive ? 'brandSoft' : 'panel'}
                  color={isActive ? 'brand' : 'muted'}
                  borderRightWidth={
                    option.value === CreateMockRuleDtoResponseType.INLINE_JSON
                      ? '1px'
                      : '0'
                  }
                  borderColor="border"
                  onClick={() => field.onChange(option.value)}
                  _hover={{ bg: isActive ? 'brandSoft' : 'panelAlt' }}
                >
                  {option.label}
                </Box>
              );
            })}
          </Box>
        )}
      />
    </Box>
  );
};
