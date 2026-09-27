import { createEffect } from 'effector';

import {
  standsControllerCreate,
  standsControllerFindAll,
  standsControllerFindOne,
  standsControllerRemove,
  standsControllerUpdate,
} from '@/shared/api/generated/stands/stands';

import type {
  CreateStandDto,
  StandResponseDto,
  UpdateStandParams,
} from './types';

export const fetchStandsFx = createEffect<void, StandResponseDto[]>(() =>
  standsControllerFindAll(),
);

export const fetchStandFx = createEffect<number, StandResponseDto>((id) =>
  standsControllerFindOne(id),
);

export const createStandFx = createEffect<CreateStandDto, StandResponseDto>(
  (dto) => standsControllerCreate(dto),
);

export const updateStandFx = createEffect<
  UpdateStandParams,
  StandResponseDto
>(({ id, data }) => standsControllerUpdate(id, data));

export const removeStandFx = createEffect<number, number>(async (id) => {
  await standsControllerRemove(id);
  return id;
});
