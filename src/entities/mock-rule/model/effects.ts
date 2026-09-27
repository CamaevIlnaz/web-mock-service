import { createEffect } from 'effector';

import {
  mockRulesControllerFindAll,
  mockRulesControllerRemove,
  mockRulesControllerUpdate,
} from '@/shared/api/generated/mock-rules/mock-rules';

import type {
  FetchRulesParams,
  MockRuleResponseDto,
  PaginatedMockRulesResponseDto,
  RemoveRuleParams,
  UpdateRuleParams,
} from './types';

export const fetchRulesFx = createEffect<
  FetchRulesParams,
  PaginatedMockRulesResponseDto & { mode: FetchRulesParams['mode'] }
>(async ({ mode, mockServerId, page, limit, search, method, isEnabled }) => {
  const response = await mockRulesControllerFindAll(mockServerId, {
    page,
    limit,
    ...(search ? { search } : {}),
    ...(method ? { method } : {}),
    ...(isEnabled !== undefined ? { isEnabled } : {}),
  });

  return { ...response, mode };
});

export const updateRuleFx = createEffect<
  UpdateRuleParams,
  MockRuleResponseDto
>(({ mockServerId, id, data }) =>
  mockRulesControllerUpdate(mockServerId, id, data),
);

export const removeRuleFx = createEffect<RemoveRuleParams, number>(
  async ({ mockServerId, id }) => {
    await mockRulesControllerRemove(mockServerId, id);
    return id;
  },
);

export const reorderRulesFx = createEffect<
  { mockServerId: number; updates: Array<{ id: number; priority: number }> },
  Array<{ id: number; priority: number }>
>(async ({ mockServerId, updates }) => {
  await Promise.all(
    updates.map(({ id, priority }) =>
      mockRulesControllerUpdate(mockServerId, id, { priority }),
    ),
  );
  return updates;
});
