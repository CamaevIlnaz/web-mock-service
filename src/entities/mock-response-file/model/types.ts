import type {
  MockResponseFileMetaDto,
  PaginatedMockResponseFilesResponseDto,
} from '@/shared/api/generated/model';

export type { MockResponseFileMetaDto, PaginatedMockResponseFilesResponseDto };

export interface FetchResponseFilesParams {
  mockServerId: number;
  page: number;
  limit: number;
  mode: 'replace' | 'append';
}

export interface RemoveResponseFileParams {
  mockServerId: number;
  fileId: number;
}

export interface DownloadResponseFileParams {
  mockServerId: number;
  file: MockResponseFileMetaDto;
}

export interface FetchResponseFileContentParams {
  mockServerId: number;
  file: MockResponseFileMetaDto;
}

export type ResponseFileContent =
  | { kind: 'json'; fileId: number; text: string }
  | { kind: 'pdf'; fileId: number; objectUrl: string };

export interface UpdateResponseFileParams {
  mockServerId: number;
  fileId: number;
  originalName?: string;
  jsonContent?: string;
}

export interface UploadResponseFileParams {
  mockServerId: number;
  file: File;
}

export interface CopyResponseFileParams {
  mockServerId: number;
  fileId: number;
}
