import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import type { MockResponseFileMetaDto } from '@/entities/mock-response-file';
import { FormInput, FormProvider, useAppForm } from '@/shared/form';
import { validateJson } from '@/shared/lib';
import { JsonValidationStatus } from '@/shared/ui';

import { editFileFormSchema, type EditFileFormValues } from '../lib';
import { editMockResponseFileModel } from '../model';
import { FileContentField } from './file-content-field';
import { FilePanelHeader } from './file-panel-header';

interface EditMockResponseFilePanelProps {
  onDelete: (file: MockResponseFileMetaDto) => void;
}

const EMPTY_VALUES: EditFileFormValues = { originalName: '', content: null };

export const EditMockResponseFilePanel = ({
  onDelete,
}: EditMockResponseFilePanelProps) => {
  const [
    file,
    content,
    contentError,
    isContentLoading,
    isSaving,
    isCopying,
    closePanel,
    submitForm,
    copyFile,
    downloadFile,
  ] = useUnit([
    editMockResponseFileModel.$file,
    editMockResponseFileModel.$content,
    editMockResponseFileModel.$contentError,
    editMockResponseFileModel.$isContentLoading,
    editMockResponseFileModel.$isSaving,
    editMockResponseFileModel.$isCopying,
    editMockResponseFileModel.panelClosed,
    editMockResponseFileModel.formSubmitted,
    editMockResponseFileModel.copyRequested,
    editMockResponseFileModel.downloadRequested,
  ]);

  const form = useAppForm({
    schema: editFileFormSchema,
    defaultValues: EMPTY_VALUES,
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = form;
  const contentValue = useWatch({ control, name: 'content' });
  const validation = useMemo(
    () =>
      contentValue === null
        ? null
        : validateJson(contentValue, 'Укажите содержимое JSON'),
    [contentValue],
  );

  const originalName = file?.originalName ?? '';
  const jsonText = content?.kind === 'json' ? content.text : null;

  useEffect(() => {
    reset({ originalName, content: jsonText });
  }, [file?.id, originalName, jsonText, reset]);

  if (!file) {
    return null;
  }

  const isFormReady = !isContentLoading && !contentError && content !== null;

  return (
    <Box
      flex="1"
      minW="0"
      bg="panel"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="border"
      alignSelf="flex-start"
      position="sticky"
      top="8"
    >
      <FormProvider {...form}>
        <Box
          as="form"
          noValidate
          onSubmit={handleSubmit((values) => submitForm(values))}
          p="5"
        >
          <FilePanelHeader
            file={file}
            isDirty={isDirty}
            isCopying={isCopying}
            onDownload={downloadFile}
            onCopy={copyFile}
            onDelete={() => onDelete(file)}
          />

          <VStack align="stretch" gap="4">
            <FormInput
              name="originalName"
              label="Имя файла"
              required
              disabled={!isFormReady}
            />

            <FileContentField
              content={content}
              isLoading={isContentLoading}
              error={contentError}
              fileName={file.originalName}
            />

            <Flex align="center" justify="space-between" gap="3" pt="1">
              <Box minW="0">
                {validation && isFormReady ? (
                  <JsonValidationStatus
                    ok={validation.ok}
                    message={validation.message}
                  />
                ) : null}
              </Box>

              <Flex gap="3" flexShrink={0}>
                <Button
                  type="button"
                  variant="outline"
                  borderColor="brand"
                  color="brand"
                  fontWeight="medium"
                  cursor="pointer"
                  onClick={closePanel}
                  disabled={isSaving}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  bg="primary"
                  color="primaryText"
                  fontWeight="medium"
                  cursor="pointer"
                  loading={isSaving}
                  disabled={!isDirty || !isFormReady}
                  _hover={{ opacity: 0.9 }}
                >
                  Сохранить
                </Button>
              </Flex>
            </Flex>
          </VStack>
        </Box>
      </FormProvider>
    </Box>
  );
};
