import { fetchResponseFilesFx } from './effects';
import {
  $files,
  $filesError,
  $isFilesLoading,
  filesRequested,
  filesReset,
} from './stores';

export const mockResponseFileModel = {
  $files,
  $filesError,
  $isFilesLoading,
  filesRequested,
  filesReset,
  fetchResponseFilesFx,
};

export type { MockResponseFileMetaDto } from './types';
