import { createEvent, createStore, sample } from 'effector';

import {
  mockRuleModel,
  type MockRuleResponseDto,
} from '@/entities/mock-rule';
import { notifySuccessFx } from '@/shared/ui';

export const dialogOpened = createEvent<MockRuleResponseDto>();
export const dialogClosed = createEvent();
export const confirmed = createEvent();

export const $rule = createStore<MockRuleResponseDto | null>(null)
  .on(dialogOpened, (_, rule) => rule)
  .reset(dialogClosed, mockRuleModel.removeRuleFx.done);

export const $isOpen = createStore(false)
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)
  .on(mockRuleModel.removeRuleFx.done, () => false);

export const $isSubmitting = mockRuleModel.removeRuleFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(mockRuleModel.removeRuleFx.failData, (_, error) => error.message)
  .reset(dialogClosed, confirmed, mockRuleModel.removeRuleFx.done);

sample({
  clock: confirmed,
  source: $rule,
  filter: Boolean,
  fn: (rule) => ({
    mockServerId: rule!.mockServerId,
    id: rule!.id,
  }),
  target: mockRuleModel.ruleRemoved,
});

sample({
  clock: mockRuleModel.removeRuleFx.done,
  fn: () => 'Правило удалено',
  target: notifySuccessFx,
});

export const deleteMockRuleModel = {
  $rule,
  $isOpen,
  $isSubmitting,
  $submitError,
  dialogOpened,
  dialogClosed,
  confirmed,
};
