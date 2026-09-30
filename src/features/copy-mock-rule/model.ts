import { combine, createEvent, createStore, sample } from 'effector';

import {
  mockRuleModel,
  type MockRuleResponseDto,
} from '@/entities/mock-rule';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

import { buildCopyName, toCreateDtoFromRule } from './lib';

export const copyRequested = createEvent<MockRuleResponseDto>();

const copyFinished = createEvent();

export const $copyPending = createStore(false)
  .on(copyRequested, () => true)
  .on(mockRuleModel.createRuleFx.fail, () => false)
  .reset(copyFinished);

export const $isCopying = combine(
  $copyPending,
  mockRuleModel.createRuleFx.pending,
  (copyPending, pending) => copyPending && pending,
);

sample({
  clock: copyRequested,
  source: mockRuleModel.$rules,
  fn: (rules, rule) => ({
    mockServerId: rule.mockServerId,
    data: toCreateDtoFromRule(
      rule,
      buildCopyName(
        rule.name,
        rules.map((item) => item.name),
      ),
    ),
  }),
  target: mockRuleModel.ruleCreated,
});

const copySucceeded = sample({
  clock: mockRuleModel.createRuleFx.done,
  source: $copyPending,
  filter: Boolean,
});

sample({
  clock: copySucceeded,
  fn: () => 'Правило скопировано',
  target: notifySuccessFx,
});

sample({
  clock: copySucceeded,
  target: copyFinished,
});

sample({
  clock: mockRuleModel.createRuleFx.failData,
  source: $copyPending,
  filter: Boolean,
  fn: (_, error) => error.message,
  target: notifyErrorFx,
});

export const copyMockRuleModel = {
  $copyPending,
  $isCopying,
  copyRequested,
};
