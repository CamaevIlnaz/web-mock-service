import { combine, createEvent, createStore, sample, type Event } from 'effector';
import { createRoute } from 'atomic-router';

import { mockServerModel } from '@/entities/mock-server';
import {
  mockRuleModel,
  type FetchRulesParams,
  type MockRulesControllerFindAllMethod,
} from '@/entities/mock-rule';
import { chainAuthorized } from '@/entities/session';
import { configureMockRuleModel } from '@/features/configure-mock-rule';
import { notifyErrorFx } from '@/shared/ui';

import { PAGE_SIZE } from './constants';

const debounceEvent = <T>(clock: Event<T>, timeout: number): Event<T> => {
  const debounced = createEvent<T>();
  let timer: ReturnType<typeof setTimeout> | undefined;

  clock.watch((payload) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      debounced(payload);
    }, timeout);
  });

  return debounced;
};

export const rulesRoute = createRoute();
export const rulesAuthRoute = chainAuthorized(rulesRoute);

export const pageMounted = createEvent();
export const serverSelected = createEvent<number>();
export const searchChanged = createEvent<string>();
export const methodChanged =
  createEvent<MockRulesControllerFindAllMethod | ''>();
export const onlyEnabledChanged = createEvent<boolean>();
export const loadMore = createEvent();
export const ruleToggled = createEvent<{ id: number; isEnabled: boolean }>();
export const ruleOrderChanged = createEvent<number[]>();

export const $selectedServerId = createStore<number | null>(null).on(
  serverSelected,
  (_, id) => id,
);

export const $search = createStore('').on(searchChanged, (_, value) => value);

export const $method = createStore<MockRulesControllerFindAllMethod | ''>(
  '',
).on(methodChanged, (_, value) => value);

export const $onlyEnabled = createStore(false).on(
  onlyEnabledChanged,
  (_, value) => value,
);

export const $serverOptions = mockServerModel.$servers.map((servers) =>
  servers.map((server) => ({
    value: String(server.id),
    label: server.name,
  })),
);

export const $isPageLoading = combine(
  mockServerModel.$isServersLoading,
  mockRuleModel.$isRulesLoading,
  $selectedServerId,
  (serversLoading, rulesLoading, serverId) =>
    serversLoading || (serverId !== null && rulesLoading),
);

const $filterQuery = combine(
  $search,
  $method,
  $onlyEnabled,
  (search, method, onlyEnabled) => ({
    search: search.trim(),
    method: method || undefined,
    isEnabled: onlyEnabled ? true : undefined,
  }),
);

const buildFetchParams = (
  mockServerId: number,
  filters: {
    search: string;
    method?: MockRulesControllerFindAllMethod;
    isEnabled?: boolean;
  },
  page: number,
  mode: FetchRulesParams['mode'],
): FetchRulesParams => ({
  mockServerId,
  page,
  limit: PAGE_SIZE,
  mode,
  ...(filters.search ? { search: filters.search } : {}),
  ...(filters.method ? { method: filters.method } : {}),
  ...(filters.isEnabled !== undefined
    ? { isEnabled: filters.isEnabled }
    : {}),
});

const searchDebounced = debounceEvent(searchChanged, 300);

sample({
  clock: rulesAuthRoute.opened,
  target: pageMounted,
});

sample({
  clock: pageMounted,
  target: mockServerModel.serversRequested,
});

sample({
  clock: mockServerModel.fetchServersFx.doneData,
  source: $selectedServerId,
  filter: (_, servers) => servers.length > 0,
  fn: (selectedId, servers) => {
    if (
      selectedId !== null &&
      servers.some((server) => server.id === selectedId)
    ) {
      return selectedId;
    }

    return servers[0]!.id;
  },
  target: serverSelected,
});

sample({
  clock: serverSelected,
  target: configureMockRuleModel.panelClosed,
});

sample({
  clock: serverSelected,
  source: $filterQuery,
  fn: (filters, mockServerId) =>
    buildFetchParams(mockServerId, filters, 1, 'replace'),
  target: mockRuleModel.rulesRequested,
});

sample({
  clock: searchDebounced,
  source: combine($selectedServerId, $method, $onlyEnabled),
  filter: ([serverId]) => serverId !== null,
  fn: ([serverId, method, onlyEnabled], search) =>
    buildFetchParams(
      serverId!,
      {
        search: search.trim(),
        method: method || undefined,
        isEnabled: onlyEnabled ? true : undefined,
      },
      1,
      'replace',
    ),
  target: mockRuleModel.rulesRequested,
});

sample({
  clock: methodChanged,
  source: combine($selectedServerId, $search, $onlyEnabled),
  filter: ([serverId]) => serverId !== null,
  fn: ([serverId, search, onlyEnabled], method) =>
    buildFetchParams(
      serverId!,
      {
        search: search.trim(),
        method: method || undefined,
        isEnabled: onlyEnabled ? true : undefined,
      },
      1,
      'replace',
    ),
  target: mockRuleModel.rulesRequested,
});

sample({
  clock: onlyEnabledChanged,
  source: combine($selectedServerId, $search, $method),
  filter: ([serverId]) => serverId !== null,
  fn: ([serverId, search, method], onlyEnabled) =>
    buildFetchParams(
      serverId!,
      {
        search: search.trim(),
        method: method || undefined,
        isEnabled: onlyEnabled ? true : undefined,
      },
      1,
      'replace',
    ),
  target: mockRuleModel.rulesRequested,
});

sample({
  clock: loadMore,
  source: combine({
    serverId: $selectedServerId,
    page: mockRuleModel.$page,
    filters: $filterQuery,
    hasMore: mockRuleModel.$hasMore,
    isLoadingMore: mockRuleModel.$isLoadingMore,
  }),
  filter: ({ serverId, hasMore, isLoadingMore }) =>
    serverId !== null && hasMore && !isLoadingMore,
  fn: ({ serverId, page, filters }) =>
    buildFetchParams(serverId!, filters, page + 1, 'append'),
  target: mockRuleModel.rulesRequested,
});

sample({
  clock: ruleToggled,
  source: $selectedServerId,
  filter: Boolean,
  fn: (serverId, { id, isEnabled }) => ({
    mockServerId: serverId!,
    id,
    data: { isEnabled },
  }),
  target: mockRuleModel.ruleUpdated,
});

sample({
  clock: ruleOrderChanged,
  source: $selectedServerId,
  filter: Boolean,
  fn: (serverId, orderedIds) => ({
    mockServerId: serverId!,
    orderedIds,
  }),
  target: mockRuleModel.rulesReordered,
});

sample({
  clock: mockRuleModel.updateRuleFx.failData,
  fn: (error) => error.message || 'Не удалось обновить правило',
  target: notifyErrorFx,
});

sample({
  clock: mockRuleModel.reorderRulesFx.failData,
  fn: (error) => error.message || 'Не удалось изменить порядок правил',
  target: notifyErrorFx,
});

sample({
  clock: mockRuleModel.fetchRulesFx.failData,
  fn: (error) => error.message || 'Не удалось загрузить правила',
  target: notifyErrorFx,
});
