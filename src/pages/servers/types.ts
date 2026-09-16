import type { MockServerResponseDto } from '@/entities/mock-server';
import type { StandResponseDto } from '@/entities/stand';

export interface ServerViewItem {
  id: string;
  name: string;
  rulesCount: number;
  standCode: string;
  standLabel: string;
  startCommand: string;
  stand: StandResponseDto | null;
  server: MockServerResponseDto;
}

export interface StandOption {
  value: string;
  label: string;
}

export interface ServersTableProps {
  servers: ServerViewItem[];
  standOptions: StandOption[];
}
