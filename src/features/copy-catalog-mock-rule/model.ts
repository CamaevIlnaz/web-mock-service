import { createEvent, createStore, sample } from 'effector';

import {
  mockRuleModel,
  type CatalogMockRuleResponseDto,
} from '@/entities/mock-rule';
import { mockServerModel } from '@/entities/mock-server';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const dialogOpened = createEvent<CatalogMockRuleResponseDto>();
export const dialogClosed = createEvent();
export const targetServerSelected = createEvent<number>();
export const confirmed = createEvent();

export const $rule = createStore<CatalogMockRuleResponseDto | null>(null)
  .on(dialogOpened, (_, rule) => rule)
  .reset(dialogClosed, mockRuleModel.copyCatalogRuleFx.done);

export const $targetMockServerId = createStore<number | null>(null)
  .on(targetServerSelected, (_, id) => id)
  .on(dialogOpened, () => null)
  .reset(dialogClosed, mockRuleModel.copyCatalogRuleFx.done);

export const $isOpen = createStore(false)
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)
  .on(mockRuleModel.copyCatalogRuleFx.done, () => false);

export const $isSubmitting = mockRuleModel.copyCatalogRuleFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(mockRuleModel.copyCatalogRuleFx.failData, (_, error) => error.message)
  .reset(
    dialogClosed,
    confirmed,
    targetServerSelected,
    mockRuleModel.copyCatalogRuleFx.done,
  );

export const $serverOptions = mockServerModel.$servers.map((servers) =>
  servers.map((server) => ({
    value: String(server.id),
    label: server.name,
  })),
);

sample({
  clock: dialogOpened,
  target: mockServerModel.serversRequested,
});

sample({
  clock: mockServerModel.fetchServersFx.doneData,
  source: {
    isOpen: $isOpen,
    selectedId: $targetMockServerId,
  },
  filter: ({ isOpen }, servers) => isOpen && servers.length > 0,
  fn: ({ selectedId }, servers) => {
    if (
      selectedId !== null &&
      servers.some((server) => server.id === selectedId)
    ) {
      return selectedId;
    }

    return servers[0]!.id;
  },
  target: targetServerSelected,
});

sample({
  clock: confirmed,
  source: {
    rule: $rule,
    targetMockServerId: $targetMockServerId,
  },
  filter: ({ rule, targetMockServerId }) =>
    rule !== null && targetMockServerId !== null,
  fn: ({ rule, targetMockServerId }) => ({
    id: rule!.id,
    targetMockServerId: targetMockServerId!,
  }),
  target: mockRuleModel.catalogRuleCopyRequested,
});

sample({
  clock: mockRuleModel.copyCatalogRuleFx.done,
  fn: () => 'Правило скопировано',
  target: notifySuccessFx,
});

sample({
  clock: mockRuleModel.copyCatalogRuleFx.failData,
  source: $isOpen,
  filter: Boolean,
  fn: (_, error) => error.message || 'Не удалось скопировать правило',
  target: notifyErrorFx,
});

export const copyCatalogMockRuleModel = {
  $rule,
  $targetMockServerId,
  $isOpen,
  $isSubmitting,
  $submitError,
  $serverOptions,
  dialogOpened,
  dialogClosed,
  targetServerSelected,
  confirmed,
};
