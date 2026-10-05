import { combine, createEvent, createStore, sample } from 'effector';
import { createRoute } from 'atomic-router';

import {
  mockResponseFileModel,
  type MockResponseFileMetaDto,
} from '@/entities/mock-response-file';
import { mockServerModel } from '@/entities/mock-server';
import { chainAuthorized } from '@/entities/session';
import { editMockResponseFileModel } from '@/features/edit-mock-response-file';
import { notifyErrorFx } from '@/shared/ui';

import { PAGE_SIZE } from './constants';

export const filesRoute = createRoute();
export const filesAuthRoute = chainAuthorized(filesRoute);

export const pageMounted = createEvent();
export const serverSelected = createEvent<number>();
export const fileDownloadRequested = createEvent<MockResponseFileMetaDto>();
export const fileSelected = createEvent<MockResponseFileMetaDto>();
export const loadMore = createEvent();

export const $selectedServerId = createStore<number | null>(null).on(
  serverSelected,
  (_, id) => id,
);

export const $serverOptions = mockServerModel.$servers.map((servers) =>
  servers.map((server) => ({
    value: String(server.id),
    label: server.name,
  })),
);

export const $isPageLoading = combine(
  mockServerModel.$isServersLoading,
  mockResponseFileModel.$isFilesLoading,
  $selectedServerId,
  (serversLoading, filesLoading, serverId) =>
    serversLoading || (serverId !== null && filesLoading),
);

sample({
  clock: filesAuthRoute.opened,
  target: pageMounted,
});

sample({
  clock: pageMounted,
  target: mockServerModel.serversRequested,
});

sample({
  clock: mockServerModel.fetchServersFx.doneData,
  source: $selectedServerId,
  filter: (_, servers) => servers.length > 0,
  fn: (selectedId, servers) => {
    if (
      selectedId !== null &&
      servers.some((server) => server.id === selectedId)
    ) {
      return selectedId;
    }

    return servers[0]!.id;
  },
  target: serverSelected,
});

sample({
  clock: [serverSelected, filesRoute.closed],
  target: editMockResponseFileModel.panelClosed,
});

sample({
  clock: serverSelected,
  fn: (mockServerId) => ({
    mockServerId,
    page: 1,
    limit: PAGE_SIZE,
    mode: 'replace' as const,
  }),
  target: mockResponseFileModel.filesRequested,
});

sample({
  clock: loadMore,
  source: {
    serverId: $selectedServerId,
    page: mockResponseFileModel.$page,
    hasMore: mockResponseFileModel.$hasMore,
    isLoadingMore: mockResponseFileModel.$isLoadingMore,
  },
  filter: ({ serverId, hasMore, isLoadingMore }) =>
    serverId !== null && hasMore && !isLoadingMore,
  fn: ({ serverId, page }) => ({
    mockServerId: serverId!,
    page: page + 1,
    limit: PAGE_SIZE,
    mode: 'append' as const,
  }),
  target: mockResponseFileModel.filesRequested,
});

sample({
  clock: fileSelected,
  source: $selectedServerId,
  filter: Boolean,
  fn: (mockServerId, file) => ({ mockServerId: mockServerId!, file }),
  target: editMockResponseFileModel.panelOpened,
});

sample({
  clock: mockResponseFileModel.uploadResponseFileFx.doneData,
  target: fileSelected,
});

sample({
  clock: fileDownloadRequested,
  source: $selectedServerId,
  filter: Boolean,
  fn: (mockServerId, file) => ({
    mockServerId: mockServerId!,
    file,
  }),
  target: mockResponseFileModel.fileDownloadRequested,
});

sample({
  clock: mockResponseFileModel.fetchResponseFilesFx.failData,
  fn: (error) => error.message || 'Не удалось загрузить файлы',
  target: notifyErrorFx,
});

sample({
  clock: mockResponseFileModel.downloadResponseFileFx.failData,
  fn: (error) => error.message || 'Не удалось скачать файл',
  target: notifyErrorFx,
});
