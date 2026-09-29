import type { MockResponseFileMetaDto } from '@/shared/api/generated/model';

export type { MockResponseFileMetaDto };

export interface RemoveResponseFileParams {
  mockServerId: number;
  fileId: number;
}

export interface DownloadResponseFileParams {
  mockServerId: number;
  file: MockResponseFileMetaDto;
}
