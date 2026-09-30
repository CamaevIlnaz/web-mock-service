import { createEffect } from 'effector';

import {
  mockRulesCatalogControllerCopyById,
  mockRulesCatalogControllerFindAllCatalog,
} from '@/shared/api/generated/mock-rules/mock-rules';
import type { MockRuleResponseDto } from '@/shared/api/generated/model';

import type {
  CopyCatalogRuleParams,
  FetchCatalogRulesParams,
  PaginatedCatalogMockRulesResponseDto,
} from './catalog-types';

export const fetchCatalogRulesFx = createEffect<
  FetchCatalogRulesParams,
  PaginatedCatalogMockRulesResponseDto & {
    mode: FetchCatalogRulesParams['mode'];
  }
>(async ({ mode, page, limit, search, method, isEnabled }) => {
  const response = await mockRulesCatalogControllerFindAllCatalog({
    page,
    limit,
    ...(search ? { search } : {}),
    ...(method ? { method } : {}),
    ...(isEnabled !== undefined ? { isEnabled } : {}),
  });

  return { ...response, mode };
});

export const copyCatalogRuleFx = createEffect<
  CopyCatalogRuleParams,
  MockRuleResponseDto
>(({ id, targetMockServerId }) =>
  mockRulesCatalogControllerCopyById(id, { targetMockServerId }),
);
