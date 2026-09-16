import type {
  CreateMockServerDto,
  MockServerResponseDto,
  UpdateMockServerDto,
} from '@/shared/api/generated/model';

export type {
  CreateMockServerDto,
  MockServerResponseDto,
  UpdateMockServerDto,
};

export interface UpdateServerParams {
  id: string;
  data: UpdateMockServerDto;
}
