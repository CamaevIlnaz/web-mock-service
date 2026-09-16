export interface ServersTableColumn {
  id: string;
  label: string;
  width?: string;
}

export const SERVERS_TABLE_COLUMNS: ServersTableColumn[] = [
  { id: 'server', label: 'Сервер', width: '20%' },
  { id: 'stand', label: 'Удалённый сервер', width: '24%' },
  { id: 'command', label: 'Команда запуска', width: '32%' },
  { id: 'status', label: 'Состояние мок-правил' },
];
