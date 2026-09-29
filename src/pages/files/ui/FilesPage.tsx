import { Box, Flex, NativeSelect } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { mockResponseFileModel } from '@/entities/mock-response-file';
import {
  DeleteMockResponseFileDialog,
  deleteMockResponseFileModel,
} from '@/features/delete-mock-response-file';
import { Title } from '@/shared/ui';

import {
  $isPageLoading,
  $selectedServerId,
  $serverOptions,
  fileDownloadRequested,
  serverSelected,
} from '../model';
import { FilesTable } from './FilesTable';
import { FilesTableSkeleton } from './FilesTableSkeleton';

export const FilesPage = () => {
  const [
    files,
    serverOptions,
    selectedServerId,
    isPageLoading,
    selectServer,
    downloadFile,
    openDelete,
  ] = useUnit([
    mockResponseFileModel.$files,
    $serverOptions,
    $selectedServerId,
    $isPageLoading,
    serverSelected,
    fileDownloadRequested,
    deleteMockResponseFileModel.dialogOpened,
  ]);

  return (
    <Box px="8" py="8" maxW="1200px">
      <Flex
        align="center"
        justify="space-between"
        mb="8"
        gap="4"
        flexWrap="wrap"
      >
        <Flex align="center" gap="4" flexWrap="wrap">
          <Title size="lg">Файлы</Title>
          <NativeSelect.Root size="sm" width="220px">
            <NativeSelect.Field
              value={
                selectedServerId !== null ? String(selectedServerId) : ''
              }
              onChange={(event) => {
                const value = Number(event.target.value);
                if (!Number.isNaN(value)) {
                  selectServer(value);
                }
              }}
              cursor="pointer"
              bg="panel"
              borderColor="border"
              color="text"
            >
              {serverOptions.length === 0 ? (
                <option value="">Нет серверов</option>
              ) : (
                serverOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              )}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>
      </Flex>

      <Box bg="panel" borderRadius="lg" overflow="hidden">
        {isPageLoading ? (
          <FilesTableSkeleton />
        ) : (
          <FilesTable
            files={files}
            onDownload={downloadFile}
            onDelete={(file) => {
              if (selectedServerId === null) {
                return;
              }

              openDelete({ mockServerId: selectedServerId, file });
            }}
          />
        )}
      </Box>

      <DeleteMockResponseFileDialog />
    </Box>
  );
};
