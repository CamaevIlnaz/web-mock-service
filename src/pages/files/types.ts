import type { MockResponseFileMetaDto } from '@/entities/mock-response-file';

export interface ServerOption {
  value: string;
  label: string;
}

export interface FilesTableProps {
  files: MockResponseFileMetaDto[];
  selectedFileId?: number | null;
  onSelect: (file: MockResponseFileMetaDto) => void;
  onDownload: (file: MockResponseFileMetaDto) => void;
  onDelete: (file: MockResponseFileMetaDto) => void;
}

export interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}
