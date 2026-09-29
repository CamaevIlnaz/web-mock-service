import { createEvent, createStore, sample } from 'effector';

import { fetchResponseFilesFx } from './effects';
import type { MockResponseFileMetaDto } from './types';

export const filesRequested = createEvent<number>();
export const filesReset = createEvent();

export const $files = createStore<MockResponseFileMetaDto[]>([])
  .on(fetchResponseFilesFx.doneData, (_, files) => files)
  .reset(filesReset);

export const $filesError = createStore<string | null>(null)
  .on(fetchResponseFilesFx.failData, (_, error) => error.message)
  .on(fetchResponseFilesFx, () => null)
  .reset(filesReset);

export const $isFilesLoading = fetchResponseFilesFx.pending;

sample({
  clock: filesRequested,
  target: fetchResponseFilesFx,
});
