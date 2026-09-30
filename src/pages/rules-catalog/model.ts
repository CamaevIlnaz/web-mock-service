import { combine, createEvent, createStore, sample, type Event } from 'effector';
import { createRoute } from 'atomic-router';

import {
  mockRuleModel,
  type FetchCatalogRulesParams,
  type MockRulesCatalogControllerFindAllCatalogMethod,
} from '@/entities/mock-rule';
import { chainAuthorized } from '@/entities/session';
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

export const rulesCatalogRoute = createRoute();
export const rulesCatalogAuthRoute = chainAuthorized(rulesCatalogRoute);

export const pageMounted = createEvent();
export const searchChanged = createEvent<string>();
export const methodChanged =
  createEvent<MockRulesCatalogControllerFindAllCatalogMethod | ''>();
export const loadMore = createEvent();

export const $search = createStore('').on(searchChanged, (_, value) => value);

export const $method = createStore<
  MockRulesCatalogControllerFindAllCatalogMethod | ''
>('').on(methodChanged, (_, value) => value);

export const $isPageLoading = mockRuleModel.$isCatalogRulesLoading;

const $filterQuery = combine($search, $method, (search, method) => ({
  search: search.trim(),
  method: method || undefined,
}));

const buildFetchParams = (
  filters: {
    search: string;
    method?: MockRulesCatalogControllerFindAllCatalogMethod;
  },
  page: number,
  mode: FetchCatalogRulesParams['mode'],
): FetchCatalogRulesParams => ({
  page,
  limit: PAGE_SIZE,
  mode,
  ...(filters.search ? { search: filters.search } : {}),
  ...(filters.method ? { method: filters.method } : {}),
});

const searchDebounced = debounceEvent(searchChanged, 300);

sample({
  clock: rulesCatalogAuthRoute.opened,
  target: pageMounted,
});

sample({
  clock: pageMounted,
  source: $filterQuery,
  fn: (filters) => buildFetchParams(filters, 1, 'replace'),
  target: mockRuleModel.catalogRulesRequested,
});

sample({
  clock: searchDebounced,
  source: $method,
  fn: (method, search) =>
    buildFetchParams(
      {
        search: search.trim(),
        method: method || undefined,
      },
      1,
      'replace',
    ),
  target: mockRuleModel.catalogRulesRequested,
});

sample({
  clock: methodChanged,
  source: $search,
  fn: (search, method) =>
    buildFetchParams(
      {
        search: search.trim(),
        method: method || undefined,
      },
      1,
      'replace',
    ),
  target: mockRuleModel.catalogRulesRequested,
});

sample({
  clock: loadMore,
  source: combine({
    page: mockRuleModel.$catalogPage,
    filters: $filterQuery,
    hasMore: mockRuleModel.$catalogHasMore,
    isLoadingMore: mockRuleModel.$isCatalogLoadingMore,
  }),
  filter: ({ hasMore, isLoadingMore }) => hasMore && !isLoadingMore,
  fn: ({ page, filters }) => buildFetchParams(filters, page + 1, 'append'),
  target: mockRuleModel.catalogRulesRequested,
});

sample({
  clock: mockRuleModel.fetchCatalogRulesFx.failData,
  fn: (error) => error.message || 'Не удалось загрузить каталог правил',
  target: notifyErrorFx,
});
