import type {
  MockRuleResponseDto,
  MockRulesControllerFindAllMethod,
  MockRulesControllerFindAllParams,
  PaginatedMockRulesResponseDto,
  UpdateMockRuleDto,
} from '@/shared/api/generated/model';

export type {
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

export interface UpdateRuleParams {
  mockServerId: number;
  id: number;
  data: UpdateMockRuleDto;
}

export interface RemoveRuleParams {
  mockServerId: number;
  id: number;
}

export interface ReorderRulesParams {
  mockServerId: number;
  orderedIds: number[];
}
