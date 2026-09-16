import {
  createServerFx,
  fetchServerFx,
  fetchServersFx,
  removeServerFx,
  updateServerFx,
} from './effects';
import {
  $isServersLoading,
  $server,
  $servers,
  $serversError,
  serverCreated,
  serverRemoved,
  serverRequested,
  serversRequested,
  serverUpdated,
} from './stores';

export const mockServerModel = {
  $servers,
  $server,
  $isServersLoading,
  $serversError,
  serversRequested,
  serverRequested,
  serverCreated,
  serverUpdated,
  serverRemoved,
  fetchServersFx,
  fetchServerFx,
  createServerFx,
  updateServerFx,
  removeServerFx,
};

export type {
  CreateMockServerDto,
  MockServerResponseDto,
  UpdateMockServerDto,
  UpdateServerParams,
} from './types';
