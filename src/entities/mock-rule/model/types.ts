import type {
  CreateMockRuleDto,
  MockRuleResponseDto,
  MockRulesControllerFindAllMethod,
  MockRulesControllerFindAllParams,
  PaginatedMockRulesResponseDto,
  UpdateMockRuleDto,
} from '@/shared/api/generated/model';

export type {
  CreateMockRuleDto,
  MockRuleResponseDto,
  MockRulesControllerFindAllMethod,
  MockRulesControllerFindAllParams,
  PaginatedMockRulesResponseDto,
  UpdateMockRuleDto,
};

export type FetchRulesMode = 'replace' | 'append';

export interface FetchRulesParams {
  mockServerId: number;
  page: number;
  limit: number;
  search?: string;
  method?: MockRulesControllerFindAllMethod;
  isEnabled?: boolean;
  mode: FetchRulesMode;
}

export interface CreateRuleParams {
  mockServerId: number;
  data: CreateMockRuleDto;
  file?: File;
}

export interface UpdateRuleParams {
  mockServerId: number;
  id: number;
  data: UpdateMockRuleDto;
  file?: File;
}

export interface RemoveRuleParams {
  mockServerId: number;
  id: number;
}

export interface ReorderRulesParams {
  mockServerId: number;
  orderedIds: number[];
}
