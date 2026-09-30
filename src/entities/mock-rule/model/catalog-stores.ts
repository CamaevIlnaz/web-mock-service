import { combine, createEvent, createStore, sample } from 'effector';

import {
  copyCatalogRuleFx,
  fetchCatalogRulesFx,
} from './catalog-effects';
import type {
  CatalogMockRuleResponseDto,
  CopyCatalogRuleParams,
  FetchCatalogRulesParams,
} from './catalog-types';

export const catalogRulesRequested = createEvent<FetchCatalogRulesParams>();
export const catalogRuleCopyRequested = createEvent<CopyCatalogRuleParams>();
export const catalogRulesReset = createEvent();

export const $catalogRules = createStore<CatalogMockRuleResponseDto[]>([]);
export const $catalogPage = createStore(0);
export const $catalogTotalPages = createStore(0);
export const $catalogTotal = createStore(0);
export const $catalogFetchMode =
  createStore<FetchCatalogRulesParams['mode']>('replace');
export const $catalogRulesError = createStore<string | null>(null);

export const $isCatalogRulesLoading = combine(
  fetchCatalogRulesFx.pending,
  $catalogFetchMode,
  (pending, mode) => pending && mode === 'replace',
);

export const $isCatalogLoadingMore = combine(
  fetchCatalogRulesFx.pending,
  $catalogFetchMode,
  (pending, mode) => pending && mode === 'append',
);

export const $catalogHasMore = combine(
  $catalogPage,
  $catalogTotalPages,
  (page, totalPages) => page > 0 && page < totalPages,
);

$catalogFetchMode.on(catalogRulesRequested, (_, params) => params.mode);

$catalogRules
  .on(fetchCatalogRulesFx.doneData, (rules, response) =>
    response.mode === 'append'
      ? [...rules, ...response.items]
      : response.items,
  )
  .reset(catalogRulesReset);

$catalogPage
  .on(fetchCatalogRulesFx.doneData, (_, response) => response.page)
  .reset(catalogRulesReset);

$catalogTotalPages
  .on(fetchCatalogRulesFx.doneData, (_, response) => response.totalPages)
  .reset(catalogRulesReset);

$catalogTotal
  .on(fetchCatalogRulesFx.doneData, (_, response) => response.total)
  .reset(catalogRulesReset);

$catalogRulesError
  .on(fetchCatalogRulesFx.failData, (_, error) => error.message)
  .on(copyCatalogRuleFx.failData, (_, error) => error.message)
  .on(fetchCatalogRulesFx, () => null)
  .reset(catalogRulesReset);

sample({
  clock: catalogRulesRequested,
  target: fetchCatalogRulesFx,
});

sample({
  clock: catalogRuleCopyRequested,
  target: copyCatalogRuleFx,
});
