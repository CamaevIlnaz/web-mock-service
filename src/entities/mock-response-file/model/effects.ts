import { createEffect } from 'effector';

import {
  getMockResponseFilesControllerGetContentUrl,
  getMockResponseFilesControllerUpdateContentUrl,
  mockResponseFilesControllerCopy,
  mockResponseFilesControllerFindAll,
  mockResponseFilesControllerRemove,
  mockResponseFilesControllerRename,
  mockResponseFilesControllerUpload,
} from '@/shared/api/generated/mock-response-files/mock-response-files';
import { MockResponseFileMetaDtoMimeType } from '@/shared/api/generated/model';
import { customFetch } from '@/shared/api/http-client';
import { API_BASE_URL } from '@/shared/config';

import type {
  CopyResponseFileParams,
  DownloadResponseFileParams,
  FetchResponseFileContentParams,
  FetchResponseFilesParams,
  MockResponseFileMetaDto,
  PaginatedMockResponseFilesResponseDto,
  RemoveResponseFileParams,
  ResponseFileContent,
  UpdateResponseFileParams,
  UploadResponseFileParams,
} from './types';

const resolveUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;

  return `${base}${path}`;
};

const triggerBrowserDownload = (blob: Blob, fileName: string) => {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
};

// customFetch парсит JSON-ответ, а для превью и скачивания нужно сырое содержимое
const fetchContentBlob = async (
  mockServerId: number,
  fileId: number,
): Promise<Blob> => {
  const response = await fetch(
    resolveUrl(getMockResponseFilesControllerGetContentUrl(mockServerId, fileId)),
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.blob();
};

const formatJson = (text: string): string => {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
};

export const fetchResponseFilesFx = createEffect<
  FetchResponseFilesParams,
  PaginatedMockResponseFilesResponseDto & {
    mode: FetchResponseFilesParams['mode'];
  }
>(async ({ mockServerId, page, limit, mode }) => {
  const response = await mockResponseFilesControllerFindAll(mockServerId, {
    page,
    limit,
  });

  return { ...response, mode };
});

export const removeResponseFileFx = createEffect<
  RemoveResponseFileParams,
  number
>(async ({ mockServerId, fileId }) => {
  try {
    await mockResponseFilesControllerRemove(mockServerId, fileId);
    return fileId;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith('HTTP 409')
    ) {
      throw new Error(
        'Файл используется в мок-правилах и не может быть удалён',
        { cause: error },
      );
    }

    throw error;
  }
});

export const downloadResponseFileFx = createEffect<
  DownloadResponseFileParams,
  void
>(async ({ mockServerId, file }) => {
  const blob = await fetchContentBlob(mockServerId, file.id);
  triggerBrowserDownload(blob, file.originalName);
});

export const fetchResponseFileContentFx = createEffect<
  FetchResponseFileContentParams,
  ResponseFileContent
>(async ({ mockServerId, file }) => {
  const blob = await fetchContentBlob(mockServerId, file.id);

  if (file.mimeType === MockResponseFileMetaDtoMimeType['application/pdf']) {
    return {
      kind: 'pdf',
      fileId: file.id,
      objectUrl: URL.createObjectURL(
        new Blob([blob], { type: file.mimeType }),
      ),
    };
  }

  return { kind: 'json', fileId: file.id, text: formatJson(await blob.text()) };
});

export const updateResponseFileFx = createEffect<
  UpdateResponseFileParams,
  MockResponseFileMetaDto
>(async ({ mockServerId, fileId, originalName, jsonContent }) => {
  let updated: MockResponseFileMetaDto | null = null;

  if (jsonContent !== undefined) {
    updated = await customFetch<MockResponseFileMetaDto>(
      getMockResponseFilesControllerUpdateContentUrl(mockServerId, fileId),
      {
        method: 'PUT',
        body: jsonContent,
      },
    );
  }

  if (originalName !== undefined) {
    updated = await mockResponseFilesControllerRename(mockServerId, fileId, {
      originalName,
    });
  }

  if (!updated) {
    throw new Error('Нет изменений для сохранения');
  }

  return updated;
});

export const uploadResponseFileFx = createEffect<
  UploadResponseFileParams,
  MockResponseFileMetaDto
>(async ({ mockServerId, file }) => {
  try {
    return await mockResponseFilesControllerUpload(mockServerId, { file });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('HTTP 400')) {
      throw new Error(
        'Неподдерживаемый формат или невалидное содержимое файла',
        { cause: error },
      );
    }

    throw error;
  }
});

export const copyResponseFileFx = createEffect<
  CopyResponseFileParams,
  MockResponseFileMetaDto
>(({ mockServerId, fileId }) =>
  mockResponseFilesControllerCopy(mockServerId, fileId, {}),
);
