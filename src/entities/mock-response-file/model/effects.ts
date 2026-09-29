import { createEffect } from 'effector';

import { mockResponseFilesControllerFindAll } from '@/shared/api/generated/mock-response-files/mock-response-files';

import type { MockResponseFileMetaDto } from './types';

export const fetchResponseFilesFx = createEffect<
  number,
  MockResponseFileMetaDto[]
>((mockServerId) => mockResponseFilesControllerFindAll(mockServerId));
