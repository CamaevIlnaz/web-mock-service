import type {
  CatalogMockRuleResponseDto,
  MockRulesCatalogControllerFindAllCatalogMethod,
  MockRulesCatalogControllerFindAllCatalogParams,
  PaginatedCatalogMockRulesResponseDto,
} from '@/shared/api/generated/model';

export type {
  CatalogMockRuleResponseDto,
  MockRulesCatalogControllerFindAllCatalogMethod,
  MockRulesCatalogControllerFindAllCatalogParams,
  PaginatedCatalogMockRulesResponseDto,
};

export type FetchCatalogRulesMode = 'replace' | 'append';

export interface FetchCatalogRulesParams {
  page: number;
  limit: number;
  search?: string;
  method?: MockRulesCatalogControllerFindAllCatalogMethod;
  isEnabled?: boolean;
  mode: FetchCatalogRulesMode;
}

export interface CopyCatalogRuleParams {
  id: number;
  targetMockServerId: number;
}
