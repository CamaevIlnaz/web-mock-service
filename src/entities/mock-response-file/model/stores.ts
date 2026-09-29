import { createEvent, createStore, sample } from 'effector';

import {
  downloadResponseFileFx,
  fetchResponseFilesFx,
  removeResponseFileFx,
} from './effects';
import type {
  DownloadResponseFileParams,
  MockResponseFileMetaDto,
  RemoveResponseFileParams,
} from './types';

export const filesRequested = createEvent<number>();
export const filesReset = createEvent();
export const fileRemoved = createEvent<RemoveResponseFileParams>();
export const fileDownloadRequested =
  createEvent<DownloadResponseFileParams>();

export const $files = createStore<MockResponseFileMetaDto[]>([])
  .on(fetchResponseFilesFx.doneData, (_, files) => files)
  .on(removeResponseFileFx.doneData, (files, fileId) =>
    files.filter((file) => file.id !== fileId),
  )
  .reset(filesReset);

export const $filesError = createStore<string | null>(null)
  .on(fetchResponseFilesFx.failData, (_, error) => error.message)
  .on(fetchResponseFilesFx, () => null)
  .on(removeResponseFileFx.failData, (_, error) => error.message)
  .on(downloadResponseFileFx.failData, (_, error) => error.message)
  .reset(filesReset);

export const $isFilesLoading = fetchResponseFilesFx.pending;

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
