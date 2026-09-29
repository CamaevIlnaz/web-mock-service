import { combine, createEvent, createStore, sample } from 'effector';

import {
  mockRuleModel,
  type CreateMockRuleDto,
  type MockRuleResponseDto,
  type UpdateMockRuleDto,
} from '@/entities/mock-rule';
import { mockResponseFileModel } from '@/entities/mock-response-file';
import { CreateMockRuleDtoResponseType } from '@/shared/api/generated/model/createMockRuleDtoResponseType';
import { notifySuccessFx } from '@/shared/ui';

import type {
  ConfigureRuleFormValues,
  ConfigureRuleSubmitPayload,
} from './lib';

export type ConfigureMode = 'create' | 'edit';

export const createOpened = createEvent<{ mockServerId: number }>();
export const editOpened = createEvent<{
  mockServerId: number;
  rule: MockRuleResponseDto;
}>();
export const panelClosed = createEvent();
export const formSubmitted = createEvent<ConfigureRuleSubmitPayload>();
export const fileSelected = createEvent<File | null>();

const $formSubmitPending = createStore(false)
  .on(formSubmitted, () => true)
  .on(mockRuleModel.createRuleFx.fail, () => false)
  .on(mockRuleModel.updateRuleFx.fail, () => false)
  .reset(panelClosed);

export const $isOpen = createStore(false)
  .on(createOpened, () => true)
  .on(editOpened, () => true)
  .on(panelClosed, () => false);

export const $mode = createStore<ConfigureMode>('create')
  .on(createOpened, () => 'create')
  .on(editOpened, () => 'edit')
  .reset(panelClosed);

export const $mockServerId = createStore<number | null>(null)
  .on(createOpened, (_, { mockServerId }) => mockServerId)
  .on(editOpened, (_, { mockServerId }) => mockServerId)
  .reset(panelClosed);

export const $rule = createStore<MockRuleResponseDto | null>(null)
  .on(createOpened, () => null)
  .on(editOpened, (_, { rule }) => rule)
  .reset(panelClosed);

export const $selectedRuleId = combine(
  $isOpen,
  $mode,
  $rule,
  (isOpen, mode, rule) => (isOpen && mode === 'edit' && rule ? rule.id : null),
);

export const $uploadedFile = createStore<File | null>(null)
  .on(fileSelected, (_, file) => file)
  .reset(panelClosed, createOpened, editOpened);

export const $isSubmitting = combine(
  mockRuleModel.createRuleFx.pending,
  mockRuleModel.updateRuleFx.pending,
  $formSubmitPending,
  (creating, updating, pending) => pending && (creating || updating),
);

export const $submitError = createStore<string | null>(null)
  .on(mockRuleModel.createRuleFx.failData, (_, error) => error.message)
  .on(mockRuleModel.updateRuleFx.failData, (_, error) => error.message)
  .reset(
    panelClosed,
    formSubmitted,
    mockRuleModel.createRuleFx.done,
    mockRuleModel.updateRuleFx.done,
  );

export const $fileOptions = mockResponseFileModel.$files.map((files) =>
  files.map((file) => ({
    value: String(file.id),
    label: file.originalName,
  })),
);

export const $hasExistingFiles = mockResponseFileModel.$files.map(
  (files) => files.length > 0,
);

export const $isFilesLoading = mockResponseFileModel.$isFilesLoading;

const toCreateDto = (
  values: ConfigureRuleFormValues,
  options: { includeFileId: boolean; includeBody: boolean },
): CreateMockRuleDto => {
  const dto: CreateMockRuleDto = {
    name: values.name.trim(),
    method: values.method as CreateMockRuleDto['method'],
    urlMask: values.urlMask.trim(),
    isEnabled: values.isEnabled,
    statusCode: Number(values.statusCode),
    delayMs: Number(values.delayMs),
    responseType: values.responseType as CreateMockRuleDto['responseType'],
  };

  if (
    options.includeBody &&
    values.responseType === CreateMockRuleDtoResponseType.INLINE_JSON
  ) {
    dto.responseBody = JSON.parse(
      values.responseBody,
    ) as CreateMockRuleDto['responseBody'];
  }

  if (
    options.includeFileId &&
    values.responseType === CreateMockRuleDtoResponseType.FILE &&
    values.responseFileId
  ) {
    dto.responseFileId = Number(values.responseFileId);
  }

  return dto;
};

const toUpdateDto = (
  values: ConfigureRuleFormValues,
  options: { includeFileId: boolean; includeBody: boolean },
): UpdateMockRuleDto => toCreateDto(values, options);

sample({
  clock: [createOpened, editOpened],
  fn: (payload) => payload.mockServerId,
  target: mockResponseFileModel.filesRequested,
});

sample({
  clock: panelClosed,
  target: mockResponseFileModel.filesReset,
});

sample({
  clock: formSubmitted,
  source: { mode: $mode, mockServerId: $mockServerId },
  filter: ({ mode, mockServerId }) =>
    mode === 'create' && mockServerId !== null,
  fn: ({ mockServerId }, { values, file, hasExistingFiles }) => {
    const isUpload =
      values.responseType === CreateMockRuleDtoResponseType.FILE &&
      (!hasExistingFiles || values.fileMode === 'upload');

    return {
      mockServerId: mockServerId!,
      data: toCreateDto(values, {
        includeBody:
          values.responseType === CreateMockRuleDtoResponseType.INLINE_JSON,
        includeFileId: !isUpload,
      }),
      ...(isUpload && file ? { file } : {}),
    };
  },
  target: mockRuleModel.ruleCreated,
});

sample({
  clock: formSubmitted,
  source: { mode: $mode, mockServerId: $mockServerId, rule: $rule },
  filter: ({ mode, mockServerId, rule }) =>
    mode === 'edit' && mockServerId !== null && rule !== null,
  fn: ({ mockServerId, rule }, { values, file, hasExistingFiles }) => {
    const isUpload =
      values.responseType === CreateMockRuleDtoResponseType.FILE &&
      (!hasExistingFiles || values.fileMode === 'upload');

    return {
      mockServerId: mockServerId!,
      id: rule!.id,
      data: toUpdateDto(values, {
        includeBody:
          values.responseType === CreateMockRuleDtoResponseType.INLINE_JSON,
        includeFileId: !isUpload,
      }),
      ...(isUpload && file ? { file } : {}),
    };
  },
  target: mockRuleModel.ruleUpdated,
});

const formSaveSucceeded = sample({
  clock: [
    mockRuleModel.createRuleFx.done,
    mockRuleModel.updateRuleFx.done,
  ],
  source: $formSubmitPending,
  filter: Boolean,
});

sample({
  clock: formSaveSucceeded,
  target: panelClosed,
});

sample({
  clock: formSaveSucceeded,
  source: $mode,
  fn: (mode) =>
    mode === 'create' ? 'Правило создано' : 'Правило обновлено',
  target: notifySuccessFx,
});

export const configureMockRuleModel = {
  $isOpen,
  $mode,
  $mockServerId,
  $rule,
  $selectedRuleId,
  $uploadedFile,
  $isSubmitting,
  $submitError,
  $fileOptions,
  $hasExistingFiles,
  $isFilesLoading,
  createOpened,
  editOpened,
  panelClosed,
  formSubmitted,
  fileSelected,
};
