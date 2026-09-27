import { combine, createEvent, createStore, sample } from 'effector';

import {
  fetchRulesFx,
  removeRuleFx,
  reorderRulesFx,
  updateRuleFx,
} from './effects';
import type {
  FetchRulesParams,
  MockRuleResponseDto,
  RemoveRuleParams,
  ReorderRulesParams,
  UpdateRuleParams,
} from './types';

export const rulesRequested = createEvent<FetchRulesParams>();
export const ruleUpdated = createEvent<UpdateRuleParams>();
export const ruleRemoved = createEvent<RemoveRuleParams>();
export const rulesReordered = createEvent<ReorderRulesParams>();
export const rulesReset = createEvent();

export const $rules = createStore<MockRuleResponseDto[]>([]);
export const $page = createStore(0);
export const $totalPages = createStore(0);
export const $total = createStore(0);
export const $fetchMode = createStore<FetchRulesParams['mode']>('replace');
export const $rulesError = createStore<string | null>(null);

export const $isRulesLoading = combine(
  fetchRulesFx.pending,
  $fetchMode,
  (pending, mode) => pending && mode === 'replace',
);

export const $isLoadingMore = combine(
  fetchRulesFx.pending,
  $fetchMode,
  (pending, mode) => pending && mode === 'append',
);

export const $hasMore = combine(
  $page,
  $totalPages,
  (page, totalPages) => page > 0 && page < totalPages,
);

$fetchMode.on(rulesRequested, (_, params) => params.mode);

const rulesReorderPrepared = sample({
  clock: rulesReordered,
  source: $rules,
  fn: (rules, { mockServerId, orderedIds }) => {
    const byId = new Map(rules.map((rule) => [rule.id, rule]));
    const nextRules = orderedIds.flatMap((id, priority) => {
      const rule = byId.get(id);
      return rule ? [{ ...rule, priority }] : [];
    });
    const updates = nextRules.flatMap((rule) => {
      const previous = byId.get(rule.id);
      if (!previous || previous.priority === rule.priority) {
        return [];
      }
      return [{ id: rule.id, priority: rule.priority }];
    });

    return { mockServerId, nextRules, updates };
  },
});

$rules
  .on(fetchRulesFx.doneData, (rules, response) =>
    response.mode === 'append'
      ? [...rules, ...response.items]
      : response.items,
  )
  .on(updateRuleFx.doneData, (rules, updated) =>
    rules.map((rule) => (rule.id === updated.id ? updated : rule)),
  )
  .on(removeRuleFx.doneData, (rules, id) =>
    rules.filter((rule) => rule.id !== id),
  )
  .on(rulesReorderPrepared, (_, { nextRules }) => nextRules)
  .reset(rulesReset);

$page
  .on(fetchRulesFx.doneData, (_, response) => response.page)
  .reset(rulesReset);

$totalPages
  .on(fetchRulesFx.doneData, (_, response) => response.totalPages)
  .reset(rulesReset);

$total
  .on(fetchRulesFx.doneData, (_, response) => response.total)
  .on(removeRuleFx.done, (total) => Math.max(0, total - 1))
  .reset(rulesReset);

$rulesError
  .on(fetchRulesFx.failData, (_, error) => error.message)
  .on(updateRuleFx.failData, (_, error) => error.message)
  .on(removeRuleFx.failData, (_, error) => error.message)
  .on(reorderRulesFx.failData, (_, error) => error.message)
  .on(fetchRulesFx, () => null)
  .reset(rulesReset);

sample({
  clock: rulesRequested,
  target: fetchRulesFx,
});

sample({
  clock: ruleUpdated,
  target: updateRuleFx,
});

sample({
  clock: ruleRemoved,
  target: removeRuleFx,
});

sample({
  clock: rulesReorderPrepared,
  filter: ({ updates }) => updates.length > 0,
  fn: ({ mockServerId, updates }) => ({ mockServerId, updates }),
  target: reorderRulesFx,
});
