export const PAGE_SIZE = 20;

export interface FilesTableColumn {
  id: string;
  label: string;
  width?: string;
}

export const FILES_TABLE_COLUMNS: FilesTableColumn[] = [
  { id: 'name', label: 'Имя', width: '32%' },
  { id: 'mime', label: 'Тип', width: '20%' },
  { id: 'size', label: 'Размер', width: '14%' },
  { id: 'createdAt', label: 'Создан', width: '18%' },
  { id: 'actions', label: '' },
];
