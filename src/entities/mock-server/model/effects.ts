import { createEffect } from 'effector';

import {
  mockServersControllerCreate,
  mockServersControllerFindAll,
  mockServersControllerFindOne,
  mockServersControllerRemove,
  mockServersControllerUpdate,
} from '@/shared/api/generated/mock-servers/mock-servers';

import type {
  CreateMockServerDto,
  MockServerResponseDto,
  UpdateServerParams,
} from './types';

export const fetchServersFx = createEffect<void, MockServerResponseDto[]>(() =>
  mockServersControllerFindAll(),
);

export const fetchServerFx = createEffect<string, MockServerResponseDto>((id) =>
  mockServersControllerFindOne(id),
);

export const createServerFx = createEffect<
  CreateMockServerDto,
  MockServerResponseDto
>((dto) => mockServersControllerCreate(dto));

export const updateServerFx = createEffect<
  UpdateServerParams,
  MockServerResponseDto
>(({ id, data }) => mockServersControllerUpdate(id, data));

export const removeServerFx = createEffect<string, string>(async (id) => {
  await mockServersControllerRemove(id);
  return id;
});
