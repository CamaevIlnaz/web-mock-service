import { createEffect, createEvent, createStore, sample } from 'effector';

import {
  mockResponseFileModel,
  type MockResponseFileMetaDto,
  type ResponseFileContent,
} from '@/entities/mock-response-file';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

import type { EditFileFormValues } from './lib';

export interface EditMockResponseFilePayload {
  mockServerId: number;
  file: MockResponseFileMetaDto;
}

export const panelOpened = createEvent<EditMockResponseFilePayload>();
export const panelClosed = createEvent();
export const formSubmitted = createEvent<EditFileFormValues>();
export const copyRequested = createEvent();
export const downloadRequested = createEvent();

const previewReleased = createEvent<ResponseFileContent>();

const revokePreviewFx = createEffect((content: ResponseFileContent) => {
  if (content.kind === 'pdf') {
    URL.revokeObjectURL(content.objectUrl);
  }
});

export const $mockServerId = createStore<number | null>(null)
  .on(panelOpened, (_, { mockServerId }) => mockServerId)
  .reset(panelClosed);

export const $file = createStore<MockResponseFileMetaDto | null>(null)
  .on(panelOpened, (_, { file }) => file)
  .on(mockResponseFileModel.updateResponseFileFx.doneData, (file, updated) =>
    file?.id === updated.id ? updated : file,
  )
  .reset(panelClosed);

export const $isOpen = $file.map((file) => file !== null);
export const $selectedFileId = $file.map((file) => file?.id ?? null);

export const $content = createStore<ResponseFileContent | null>(null)
  .on(mockResponseFileModel.updateResponseFileFx.done, (content, { params }) =>
    content?.kind === 'json' &&
    content.fileId === params.fileId &&
    params.jsonContent !== undefined
      ? { ...content, text: params.jsonContent }
      : content,
  )
  .reset(previewReleased);

export const $contentError = createStore<string | null>(null)
  .on(
    mockResponseFileModel.fetchResponseFileContentFx.failData,
    (_, error) => error.message || 'Не удалось загрузить содержимое файла',
  )
  .reset(panelOpened, panelClosed);

export const $isContentLoading =
  mockResponseFileModel.fetchResponseFileContentFx.pending;
export const $isSaving = mockResponseFileModel.updateResponseFileFx.pending;
export const $isCopying = mockResponseFileModel.copyResponseFileFx.pending;

sample({
  clock: [panelOpened, panelClosed],
  source: $content,
  filter: Boolean,
  target: previewReleased,
});

sample({
  clock: previewReleased,
  target: revokePreviewFx,
});

sample({
  clock: panelOpened,
  target: mockResponseFileModel.fetchResponseFileContentFx,
});

const contentLoaded = mockResponseFileModel.fetchResponseFileContentFx.doneData;

sample({
  clock: contentLoaded,
  source: $selectedFileId,
  filter: (fileId, content) => fileId === content.fileId,
  fn: (_, content) => content,
  target: $content,
});

sample({
  clock: contentLoaded,
  source: $selectedFileId,
  filter: (fileId, content) => fileId !== content.fileId,
  fn: (_, content) => content,
  target: revokePreviewFx,
});

sample({
  clock: formSubmitted,
  source: { mockServerId: $mockServerId, file: $file, content: $content },
  filter: ({ mockServerId, file }) => mockServerId !== null && file !== null,
  fn: ({ mockServerId, file, content }, values) => {
    const originalName = values.originalName.trim();
    const isContentChanged =
      content?.kind === 'json' &&
      values.content !== null &&
      values.content !== content.text;

    return {
      mockServerId: mockServerId!,
      fileId: file!.id,
      ...(originalName !== file!.originalName ? { originalName } : {}),
      ...(isContentChanged ? { jsonContent: values.content! } : {}),
    };
  },
  target: mockResponseFileModel.updateResponseFileFx,
});

sample({
  clock: copyRequested,
  source: { mockServerId: $mockServerId, file: $file },
  filter: ({ mockServerId, file }) => mockServerId !== null && file !== null,
  fn: ({ mockServerId, file }) => ({
    mockServerId: mockServerId!,
    fileId: file!.id,
  }),
  target: mockResponseFileModel.copyResponseFileFx,
});

sample({
  clock: downloadRequested,
  source: { mockServerId: $mockServerId, file: $file },
  filter: ({ mockServerId, file }) => mockServerId !== null && file !== null,
  fn: ({ mockServerId, file }) => ({
    mockServerId: mockServerId!,
    file: file!,
  }),
  target: mockResponseFileModel.fileDownloadRequested,
});

sample({
  clock: mockResponseFileModel.removeResponseFileFx.doneData,
  source: $selectedFileId,
  filter: (selectedId, removedId) => selectedId === removedId,
  target: panelClosed,
});

sample({
  clock: mockResponseFileModel.updateResponseFileFx.done,
  fn: () => 'Файл сохранён',
  target: notifySuccessFx,
});

sample({
  clock: mockResponseFileModel.updateResponseFileFx.failData,
  fn: (error) => error.message || 'Не удалось сохранить файл',
  target: notifyErrorFx,
});

sample({
  clock: mockResponseFileModel.copyResponseFileFx.doneData,
  fn: (copied) => `Создана копия «${copied.originalName}»`,
  target: notifySuccessFx,
});

sample({
  clock: mockResponseFileModel.copyResponseFileFx.failData,
  fn: (error) => error.message || 'Не удалось скопировать файл',
  target: notifyErrorFx,
});

export const editMockResponseFileModel = {
  $isOpen,
  $file,
  $selectedFileId,
  $content,
  $contentError,
  $isContentLoading,
  $isSaving,
  $isCopying,
  panelOpened,
  panelClosed,
  formSubmitted,
  copyRequested,
  downloadRequested,
};
