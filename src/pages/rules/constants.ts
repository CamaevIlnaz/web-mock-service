export const PAGE_SIZE = 20;

export interface RulesTableColumn {
  id: string;
  label: string;
  width?: string;
}

export const RULES_TABLE_COLUMNS: RulesTableColumn[] = [
  { id: 'drag', label: '', width: '40px' },
  { id: 'enabled', label: 'Вкл', width: '72px' },
  { id: 'name', label: 'Название', width: '22%' },
  { id: 'methodUrl', label: 'Метод / URL' },
  { id: 'response', label: 'Ответ', width: '140px' },
  { id: 'actions', label: '', width: '88px' },
];

export const METHOD_FILTER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'Все методы' },
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];
