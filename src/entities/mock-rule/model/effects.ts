import { createEffect } from 'effector';

import {
  getMockRulesControllerCreateUrl,
  getMockRulesControllerUpdateUrl,
  mockRulesControllerCreate,
  mockRulesControllerFindAll,
  mockRulesControllerRemove,
  mockRulesControllerUpdate,
} from '@/shared/api/generated/mock-rules/mock-rules';
import { customFetch } from '@/shared/api/http-client';

import type {
  CreateRuleParams,
  FetchRulesParams,
  MockRuleResponseDto,
  PaginatedMockRulesResponseDto,
  RemoveRuleParams,
  UpdateRuleParams,
} from './types';

const createRuleWithFile = (
  mockServerId: number,
  data: CreateRuleParams['data'],
  file: File,
) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('file', file);

  return customFetch<MockRuleResponseDto>(
    getMockRulesControllerCreateUrl(mockServerId),
    {
      method: 'POST',
      body: formData,
    },
  );
};

const updateRuleWithFile = (
  mockServerId: number,
  id: number,
  data: UpdateRuleParams['data'],
  file: File,
) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('file', file);

  return customFetch<MockRuleResponseDto>(
    getMockRulesControllerUpdateUrl(mockServerId, id),
    {
      method: 'PATCH',
      body: formData,
    },
  );
};

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

export const createRuleFx = createEffect<
  CreateRuleParams,
  MockRuleResponseDto
>(({ mockServerId, data, file }) => {
  if (file) {
    return createRuleWithFile(mockServerId, data, file);
  }

  return mockRulesControllerCreate(mockServerId, data);
});

export const updateRuleFx = createEffect<
  UpdateRuleParams,
  MockRuleResponseDto
>(({ mockServerId, id, data, file }) => {
  if (file) {
    return updateRuleWithFile(mockServerId, id, data, file);
  }

  return mockRulesControllerUpdate(mockServerId, id, data);
});

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
