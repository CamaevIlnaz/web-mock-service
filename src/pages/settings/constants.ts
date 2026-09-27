export interface StandsTableColumn {
  id: string;
  label: string;
  width?: string;
}

export const STANDS_TABLE_COLUMNS: StandsTableColumn[] = [
  { id: 'code', label: 'Code', width: '16%' },
  { id: 'name', label: 'Name', width: '20%' },
  { id: 'domain', label: 'Domain', width: '28%' },
  { id: 'basePath', label: 'Base path', width: '20%' },
  { id: 'actions', label: '', width: '16%' },
];
