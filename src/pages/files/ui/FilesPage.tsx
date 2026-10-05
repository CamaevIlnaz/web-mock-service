import { Box, Flex, NativeSelect } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import {
  mockResponseFileModel,
  type MockResponseFileMetaDto,
} from '@/entities/mock-response-file';
import {
  DeleteMockResponseFileDialog,
  deleteMockResponseFileModel,
} from '@/features/delete-mock-response-file';
import {
  EditMockResponseFilePanel,
  editMockResponseFileModel,
} from '@/features/edit-mock-response-file';
import { UploadMockResponseFileButton } from '@/features/upload-mock-response-file';
import { Title } from '@/shared/ui';

import {
  $isPageLoading,
  $selectedServerId,
  $serverOptions,
  fileDownloadRequested,
  fileSelected,
  loadMore,
  serverSelected,
} from '../model';
import { FilesTable } from './FilesTable';
import { FilesTableSkeleton } from './FilesTableSkeleton';
import { LoadMoreButton } from './LoadMoreButton';

export const FilesPage = () => {
  const [
    files,
    serverOptions,
    selectedServerId,
    selectedFileId,
    isPageLoading,
    hasMore,
    isLoadingMore,
    selectServer,
    selectFile,
    downloadFile,
    openDelete,
    requestLoadMore,
  ] = useUnit([
    mockResponseFileModel.$files,
    $serverOptions,
    $selectedServerId,
    editMockResponseFileModel.$selectedFileId,
    $isPageLoading,
    mockResponseFileModel.$hasMore,
    mockResponseFileModel.$isLoadingMore,
    serverSelected,
    fileSelected,
    fileDownloadRequested,
    deleteMockResponseFileModel.dialogOpened,
    loadMore,
  ]);

  const handleDelete = (file: MockResponseFileMetaDto) => {
    if (selectedServerId === null) {
      return;
    }

    openDelete({ mockServerId: selectedServerId, file });
  };

  return (
    <Box px="8" py="8">
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

        <UploadMockResponseFileButton mockServerId={selectedServerId} />
      </Flex>

      <Flex gap="6" align="flex-start">
        <Box flex="1" minW="0" bg="panel" borderRadius="lg" overflow="hidden">
          {isPageLoading ? (
            <FilesTableSkeleton />
          ) : (
            <FilesTable
              files={files}
              selectedFileId={selectedFileId}
              onSelect={selectFile}
              onDownload={downloadFile}
              onDelete={handleDelete}
            />
          )}

          {!isPageLoading && hasMore ? (
            <Box px="6" py="4" borderTopWidth="1px" borderColor="border">
              <LoadMoreButton
                isLoading={isLoadingMore}
                onClick={requestLoadMore}
              />
            </Box>
          ) : null}
        </Box>

        <EditMockResponseFilePanel onDelete={handleDelete} />
      </Flex>

      <DeleteMockResponseFileDialog />
    </Box>
  );
};
