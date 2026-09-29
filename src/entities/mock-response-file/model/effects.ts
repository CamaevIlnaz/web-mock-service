import { createEffect } from 'effector';

import {
  getMockResponseFilesControllerGetContentUrl,
  mockResponseFilesControllerFindAll,
  mockResponseFilesControllerRemove,
} from '@/shared/api/generated/mock-response-files/mock-response-files';

import type {
  DownloadResponseFileParams,
  MockResponseFileMetaDto,
  RemoveResponseFileParams,
} from './types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

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

export const fetchResponseFilesFx = createEffect<
  number,
  MockResponseFileMetaDto[]
>((mockServerId) => mockResponseFilesControllerFindAll(mockServerId));

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
      );
    }

    throw error;
  }
});

export const downloadResponseFileFx = createEffect<
  DownloadResponseFileParams,
  void
>(async ({ mockServerId, file }) => {
  const response = await fetch(
    resolveUrl(
      getMockResponseFilesControllerGetContentUrl(mockServerId, file.id),
    ),
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const blob = await response.blob();
  triggerBrowserDownload(blob, file.originalName);
});
