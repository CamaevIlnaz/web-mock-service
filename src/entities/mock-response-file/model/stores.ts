import { combine, createEvent, createStore, sample } from 'effector';

import {
  copyResponseFileFx,
  downloadResponseFileFx,
  fetchResponseFilesFx,
  removeResponseFileFx,
  updateResponseFileFx,
  uploadResponseFileFx,
} from './effects';
import type {
  DownloadResponseFileParams,
  FetchResponseFilesParams,
  MockResponseFileMetaDto,
  RemoveResponseFileParams,
} from './types';

export const filesRequested = createEvent<FetchResponseFilesParams>();
export const filesReset = createEvent();
export const fileRemoved = createEvent<RemoveResponseFileParams>();
export const fileDownloadRequested =
  createEvent<DownloadResponseFileParams>();

export const $files = createStore<MockResponseFileMetaDto[]>([])
  .on(fetchResponseFilesFx.doneData, (files, response) =>
    response.mode === 'append'
      ? [...files, ...response.items]
      : response.items,
  )
  .on(removeResponseFileFx.doneData, (files, fileId) =>
    files.filter((file) => file.id !== fileId),
  )
  .on(updateResponseFileFx.doneData, (files, updated) =>
    files.map((file) => (file.id === updated.id ? updated : file)),
  )
  .on(copyResponseFileFx.doneData, (files, copied) => [copied, ...files])
  .on(uploadResponseFileFx.doneData, (files, uploaded) => [uploaded, ...files])
  .reset(filesReset);

export const $page = createStore(0)
  .on(fetchResponseFilesFx.doneData, (_, response) => response.page)
  .reset(filesReset);

export const $totalPages = createStore(0)
  .on(fetchResponseFilesFx.doneData, (_, response) => response.totalPages)
  .reset(filesReset);

const $fetchMode = createStore<FetchResponseFilesParams['mode']>('replace')
  .on(filesRequested, (_, params) => params.mode);

export const $filesError = createStore<string | null>(null)
  .on(fetchResponseFilesFx.failData, (_, error) => error.message)
  .on(fetchResponseFilesFx, () => null)
  .on(removeResponseFileFx.failData, (_, error) => error.message)
  .on(downloadResponseFileFx.failData, (_, error) => error.message)
  .reset(filesReset);

export const $isFilesLoading = combine(
  fetchResponseFilesFx.pending,
  $fetchMode,
  (pending, mode) => pending && mode === 'replace',
);

export const $isLoadingMore = combine(
  fetchResponseFilesFx.pending,
  $fetchMode,
  (pending, mode) => pending && mode === 'append',
);

export const $hasMore = combine(
  $page,
  $totalPages,
  (page, totalPages) => page > 0 && page < totalPages,
);

sample({
  clock: filesRequested,
  target: fetchResponseFilesFx,
});

sample({
  clock: fileRemoved,
  target: removeResponseFileFx,
});

sample({
  clock: fileDownloadRequested,
  target: downloadResponseFileFx,
});
