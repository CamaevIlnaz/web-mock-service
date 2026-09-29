import type { MockResponseFileMetaDto } from '@/entities/mock-response-file';

export interface ServerOption {
  value: string;
  label: string;
}

export interface FilesTableProps {
  files: MockResponseFileMetaDto[];
  onDownload: (file: MockResponseFileMetaDto) => void;
  onDelete: (file: MockResponseFileMetaDto) => void;
}
