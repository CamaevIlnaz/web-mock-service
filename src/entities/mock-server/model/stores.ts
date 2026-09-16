import { createEvent, createStore, sample } from 'effector';

import {
  createServerFx,
  fetchServerFx,
  fetchServersFx,
  removeServerFx,
  updateServerFx,
} from './effects';
import type {
  CreateMockServerDto,
  MockServerResponseDto,
  UpdateServerParams,
} from './types';

export const serversRequested = createEvent();
export const serverRequested = createEvent<string>();
export const serverCreated = createEvent<CreateMockServerDto>();
export const serverUpdated = createEvent<UpdateServerParams>();
export const serverRemoved = createEvent<string>();

export const $servers = createStore<MockServerResponseDto[]>([]);
export const $server = createStore<MockServerResponseDto | null>(null);
export const $isServersLoading = fetchServersFx.pending;
export const $serversError = createStore<string | null>(null);

$servers
  .on(fetchServersFx.doneData, (_, servers) => servers)
  .on(createServerFx.doneData, (servers, server) => [...servers, server])
  .on(updateServerFx.doneData, (servers, updated) =>
    servers.map((server) => (server.id === updated.id ? updated : server)),
  )
  .on(removeServerFx.doneData, (servers, id) =>
    servers.filter((server) => server.id !== id),
  );

$server
  .on(fetchServerFx.doneData, (_, server) => server)
  .on(updateServerFx.doneData, (current, updated) =>
    current?.id === updated.id ? updated : current,
  )
  .on(removeServerFx.doneData, (current, id) =>
    current?.id === id ? null : current,
  );

$serversError
  .on(fetchServersFx.failData, (_, error) => error.message)
  .on(fetchServersFx, () => null)
  .on(fetchServerFx.failData, (_, error) => error.message)
  .on(createServerFx.failData, (_, error) => error.message)
  .on(updateServerFx.failData, (_, error) => error.message)
  .on(removeServerFx.failData, (_, error) => error.message);

sample({
  clock: serversRequested,
  target: fetchServersFx,
});

sample({
  clock: serverRequested,
  target: fetchServerFx,
});

sample({
  clock: serverCreated,
  target: createServerFx,
});

sample({
  clock: serverUpdated,
  target: updateServerFx,
});

sample({
  clock: serverRemoved,
  target: removeServerFx,
});
