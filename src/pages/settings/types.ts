import type { StandResponseDto } from '@/entities/stand';

export interface StandsTableProps {
  stands: StandResponseDto[];
  onEdit: (stand: StandResponseDto) => void;
  onDelete: (stand: StandResponseDto) => void;
}
