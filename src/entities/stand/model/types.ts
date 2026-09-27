import type {
  CreateStandDto,
  StandResponseDto,
  UpdateStandDto,
} from '@/shared/api/generated/model';

export type { CreateStandDto, StandResponseDto, UpdateStandDto };

export interface UpdateStandParams {
  id: number;
  data: UpdateStandDto;
}
