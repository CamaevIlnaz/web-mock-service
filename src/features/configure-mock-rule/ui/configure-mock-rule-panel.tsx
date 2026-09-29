import {
  Box,
  Button,
  Flex,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';

import { CreateMockRuleDtoResponseType } from '@/shared/api/generated/model/createMockRuleDtoResponseType';
import {
  FormInput,
  FormProvider,
  FormSelect,
  useAppForm,
} from '@/shared/form';

import {
  DEFAULT_FORM_VALUES,
  METHOD_OPTIONS,
  STATUS_CODE_OPTIONS,
  configureRuleFormSchema,
  toFormValues,
  type ConfigureRuleFormValues,
} from '../lib';
import { configureMockRuleModel } from '../model';
import { FileResponseSource } from './file-response-source';
import { JsonResponseEditor } from './json-response-editor';
import { ResponseSourceSegment } from './response-source-segment';

export const ConfigureMockRulePanel = () => {
  const [
    isOpen,
    mode,
    rule,
    isSubmitting,
    submitError,
    fileOptions,
    hasExistingFiles,
    isFilesLoading,
    uploadedFile,
    closePanel,
    submitForm,
    selectFile,
  ] = useUnit([
    configureMockRuleModel.$isOpen,
    configureMockRuleModel.$mode,
    configureMockRuleModel.$rule,
    configureMockRuleModel.$isSubmitting,
    configureMockRuleModel.$submitError,
    configureMockRuleModel.$fileOptions,
    configureMockRuleModel.$hasExistingFiles,
    configureMockRuleModel.$isFilesLoading,
    configureMockRuleModel.$uploadedFile,
    configureMockRuleModel.panelClosed,
    configureMockRuleModel.formSubmitted,
    configureMockRuleModel.fileSelected,
  ]);

  const form = useAppForm({
    schema: configureRuleFormSchema,
    defaultValues: DEFAULT_FORM_VALUES,
  });
  const { reset, handleSubmit, control, setError, clearErrors, setValue } =
    form;
  const responseType = useWatch({ control, name: 'responseType' });
  const fileMode = useWatch({ control, name: 'fileMode' });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (mode === 'edit' && rule) {
      reset(toFormValues(rule));
      return;
    }

    reset(DEFAULT_FORM_VALUES);
  }, [isOpen, mode, rule, reset]);

  useEffect(() => {
    if (!isOpen || isFilesLoading || hasExistingFiles || fileMode === 'upload') {
      return;
    }

    setValue('fileMode', 'upload');
  }, [isOpen, isFilesLoading, hasExistingFiles, fileMode, setValue]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || isSubmitting) {
        return;
      }

      event.preventDefault();
      closePanel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, closePanel]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = handleSubmit((values: ConfigureRuleFormValues) => {
    const requiresUpload =
      values.responseType === CreateMockRuleDtoResponseType.FILE &&
      (!hasExistingFiles || values.fileMode === 'upload');

    if (requiresUpload && !uploadedFile) {
      setError('responseFileId', {
        type: 'manual',
        message: 'Выберите файл для загрузки',
      });
      return;
    }

    clearErrors('responseFileId');
    submitForm({
      values,
      file: uploadedFile,
      hasExistingFiles,
    });
  });

  return (
    <Box
      w="400px"
      flexShrink={0}
      bg="panel"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="border"
      alignSelf="flex-start"
      position="sticky"
      top="8"
      maxH="calc(100vh - 64px)"
      overflowY="auto"
    >
      <FormProvider {...form}>
        <Box as="form" noValidate onSubmit={onSubmit} p="5">
          <Flex align="center" justify="space-between" gap="3" mb="5">
            <Text fontSize="lg" fontWeight="bold" color="heading">
              Настройка URL
            </Text>
            <Controller
              name="isEnabled"
              control={control}
              render={({ field }) => (
                <Flex align="center" gap="2">
                  <Text fontSize="sm" color="text" fontWeight="medium">
                    Включён
                  </Text>
                  <Switch.Root
                    checked={field.value}
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
          </Flex>

          <VStack align="stretch" gap="4">
            <FormInput name="name" label="Название" required />

            <Flex gap="3">
              <Box flex="1" minW="0">
                <FormSelect
                  name="method"
                  label="Метод"
                  options={[...METHOD_OPTIONS]}
                  required
                />
              </Box>
              <Box flex="1" minW="0">
                <FormSelect
                  name="statusCode"
                  label="HTTP-статус"
                  options={[...STATUS_CODE_OPTIONS]}
                  required
                />
              </Box>
            </Flex>

            <FormInput name="urlMask" label="Маска URL" required />
            <Text fontSize="sm" color="accent" mt="-2">
              Поддерживаются *, ** и :param
            </Text>

            <FormInput name="delayMs" label="Задержка, мс" required />

            <ResponseSourceSegment />

            {responseType === CreateMockRuleDtoResponseType.INLINE_JSON ? (
              <JsonResponseEditor />
            ) : (
              <FileResponseSource
                fileOptions={fileOptions}
                hasExistingFiles={hasExistingFiles}
                uploadedFile={uploadedFile}
                onFileSelected={selectFile}
              />
            )}

            {submitError ? (
              <Text fontSize="sm" color="danger">
                {submitError}
              </Text>
            ) : null}

            <Flex justify="flex-end" gap="3" pt="2">
              <Button
                type="button"
                variant="outline"
                borderColor="brand"
                color="brand"
                fontWeight="medium"
                cursor="pointer"
                onClick={closePanel}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                bg="primary"
                color="primaryText"
                fontWeight="medium"
                cursor="pointer"
                loading={isSubmitting}
                _hover={{ opacity: 0.9 }}
              >
                Сохранить
              </Button>
            </Flex>
          </VStack>
        </Box>
      </FormProvider>
    </Box>
  );
};
