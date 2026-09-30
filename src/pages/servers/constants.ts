export interface ServersTableColumn {
  id: string;
  label: string;
  width?: string;
}

export const SERVERS_TABLE_COLUMNS: ServersTableColumn[] = [
  { id: 'server', label: 'Сервер', width: '24%' },
  { id: 'stand', label: 'Удалённый сервер', width: '28%' },
  { id: 'command', label: 'Команда запуска', width: '40%' },
  { id: 'actions', label: '' },
];
