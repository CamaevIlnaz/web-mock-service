import {
  downloadResponseFileFx,
  fetchResponseFilesFx,
  removeResponseFileFx,
} from './effects';
import {
  $files,
  $filesError,
  $isFilesLoading,
  fileDownloadRequested,
  fileRemoved,
  filesRequested,
  filesReset,
} from './stores';

export const mockResponseFileModel = {
  $files,
  $filesError,
  $isFilesLoading,
  filesRequested,
  filesReset,
  fileRemoved,
  fileDownloadRequested,
  fetchResponseFilesFx,
  removeResponseFileFx,
  downloadResponseFileFx,
};

export type {
  DownloadResponseFileParams,
  MockResponseFileMetaDto,
  RemoveResponseFileParams,
} from './types';
