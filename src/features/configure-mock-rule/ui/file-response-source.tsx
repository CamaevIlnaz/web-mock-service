import { Box, Button, Flex, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { Paperclip } from 'lucide-react';
import { useRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { FormSelect, type FormFieldOption } from '@/shared/form';

import type { ConfigureRuleFormValues } from '../lib';

interface FileResponseSourceProps {
  fileOptions: FormFieldOption[];
  hasExistingFiles: boolean;
  uploadedFile: File | null;
  onFileSelected: (file: File | null) => void;
}

export const FileResponseSource = ({
  fileOptions,
  hasExistingFiles,
  uploadedFile,
  onFileSelected,
}: FileResponseSourceProps) => {
  const { control } = useFormContext<ConfigureRuleFormValues>();
  const fileMode = useWatch({ control, name: 'fileMode' });
  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveMode = hasExistingFiles ? fileMode : 'upload';

  const uploadBlock = (
    <Box mt={hasExistingFiles ? '3' : '0'}>
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          onFileSelected(file);
          event.target.value = '';
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        borderColor="border"
        color="text"
        fontWeight="medium"
        gap="2"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Paperclip size={16} strokeWidth={1.75} />
        Выбрать файл
      </Button>
      <Text fontSize="sm" color="muted" mt="2">
        {uploadedFile ? uploadedFile.name : 'Файл не выбран'}
      </Text>
    </Box>
  );

  if (!hasExistingFiles) {
    return (
      <Box
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        p="4"
        bg="panel"
      >
        <Text fontSize="sm" fontWeight="semibold" color="heading" mb="3">
          Загрузить новый
        </Text>
        {uploadBlock}
      </Box>
    );
  }

  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="md"
      p="4"
      bg="panel"
    >
      <Controller
        name="fileMode"
        control={control}
        render={({ field }) => (
          <RadioGroup.Root
            value={field.value}
            onValueChange={(details) => {
              const next = details.value as ConfigureRuleFormValues['fileMode'];
              field.onChange(next);
              if (next === 'existing') {
                onFileSelected(null);
              }
            }}
            colorPalette="purple"
          >
            <VStack align="stretch" gap="4">
              <RadioGroup.Item value="existing">
                <RadioGroup.ItemHiddenInput />
                <Flex align="flex-start" gap="3" w="100%">
                  <RadioGroup.ItemIndicator mt="0.5" />
                  <Box flex="1" minW="0">
                    <RadioGroup.ItemText
                      fontSize="sm"
                      fontWeight="semibold"
                      color="heading"
                    >
                      Выбрать существующий
                    </RadioGroup.ItemText>
                    {effectiveMode === 'existing' ? (
                      <Box mt="3">
                        <FormSelect
                          name="responseFileId"
                          label="Файл"
                          options={fileOptions}
                          placeholder="Выберите файл"
                          helperText="Файлы текущего мок-сервера"
                          required
                        />
                      </Box>
                    ) : null}
                  </Box>
                </Flex>
              </RadioGroup.Item>

              <RadioGroup.Item value="upload">
                <RadioGroup.ItemHiddenInput />
                <Flex align="flex-start" gap="3" w="100%">
                  <RadioGroup.ItemIndicator mt="0.5" />
                  <Box flex="1" minW="0">
                    <RadioGroup.ItemText
                      fontSize="sm"
                      fontWeight="semibold"
                      color="heading"
                    >
                      Загрузить новый
                    </RadioGroup.ItemText>
                    {effectiveMode === 'upload' ? uploadBlock : null}
                  </Box>
                </Flex>
              </RadioGroup.Item>
            </VStack>
          </RadioGroup.Root>
        )}
      />
    </Box>
  );
};
