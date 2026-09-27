import { createEvent, createStore, sample } from 'effector';

import {
  createStandFx,
  fetchStandFx,
  fetchStandsFx,
  removeStandFx,
  updateStandFx,
} from './effects';
import type { CreateStandDto, StandResponseDto, UpdateStandParams } from './types';

export const standsRequested = createEvent();
export const standRequested = createEvent<number>();
export const standCreated = createEvent<CreateStandDto>();
export const standUpdated = createEvent<UpdateStandParams>();
export const standRemoved = createEvent<number>();

export const $stands = createStore<StandResponseDto[]>([]);
export const $stand = createStore<StandResponseDto | null>(null);
export const $isStandsLoading = fetchStandsFx.pending;
export const $standsError = createStore<string | null>(null);

$stands
  .on(fetchStandsFx.doneData, (_, stands) => stands)
  .on(createStandFx.doneData, (stands, stand) => [...stands, stand])
  .on(updateStandFx.doneData, (stands, updated) =>
    stands.map((stand) => (stand.id === updated.id ? updated : stand)),
  )
  .on(removeStandFx.doneData, (stands, id) =>
    stands.filter((stand) => stand.id !== id),
  );

$stand
  .on(fetchStandFx.doneData, (_, stand) => stand)
  .on(updateStandFx.doneData, (current, updated) =>
    current?.id === updated.id ? updated : current,
  )
  .on(removeStandFx.doneData, (current, id) =>
    current?.id === id ? null : current,
  );

$standsError
  .on(fetchStandsFx.failData, (_, error) => error.message)
  .on(fetchStandsFx, () => null)
  .on(fetchStandFx.failData, (_, error) => error.message)
  .on(createStandFx.failData, (_, error) => error.message)
  .on(updateStandFx.failData, (_, error) => error.message)
  .on(removeStandFx.failData, (_, error) => error.message);

sample({
  clock: standsRequested,
  target: fetchStandsFx,
});

sample({
  clock: standRequested,
  target: fetchStandFx,
});

sample({
  clock: standCreated,
  target: createStandFx,
});

sample({
  clock: standUpdated,
  target: updateStandFx,
});

sample({
  clock: standRemoved,
  target: removeStandFx,
});
