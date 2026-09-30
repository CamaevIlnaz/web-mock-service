export const PAGE_SIZE = 20;

export interface CatalogTableColumn {
  id: string;
  label: string;
  width?: string;
}

export const CATALOG_TABLE_COLUMNS: CatalogTableColumn[] = [
  { id: 'name', label: 'Название', width: '24%' },
  { id: 'method', label: 'Метод', width: '100px' },
  { id: 'url', label: 'URL' },
  { id: 'response', label: 'Ответ', width: '140px' },
  { id: 'actions', label: '', width: '56px' },
];

export const METHOD_FILTER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'Все методы' },
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];
