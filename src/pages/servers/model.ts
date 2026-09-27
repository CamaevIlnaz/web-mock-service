import { combine, createEvent, sample } from 'effector';
import { createRoute } from 'atomic-router';

import { formatStartCommand, mockServerModel } from '@/entities/mock-server';
import { chainAuthorized } from '@/entities/session';
import { formatStandLabel, standModel } from '@/entities/stand';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

import type { ServerViewItem } from './types';

export type { ServerViewItem, StandOption, ServersTableProps } from './types';

export const serversRoute = createRoute();
export const serversAuthRoute = chainAuthorized(serversRoute);

export const pageMounted = createEvent();
export const standChanged = createEvent<{ id: string; standCode: string }>();

export const $serversView = combine(
  mockServerModel.$servers,
  standModel.$stands,
  (servers, stands): ServerViewItem[] => {
    const standsByCode = new Map(stands.map((stand) => [stand.code, stand]));

    return servers.map((server) => {
      const stand = standsByCode.get(server.standCode) ?? null;

      return {
        id: server.id,
        name: server.name,
        rulesCount: 0,
        standCode: server.standCode,
        standLabel: stand ? formatStandLabel(stand) : server.standCode,
        startCommand: formatStartCommand(server.connectionToken),
        stand,
        server,
      };
    });
  },
);

export const $standsOptions = standModel.$stands.map((stands) =>
  stands.map((stand) => ({
    value: stand.code,
    label: formatStandLabel(stand),
  })),
);

export const $isPageLoading = combine(
  mockServerModel.$isServersLoading,
  standModel.$isStandsLoading,
  (serversLoading, standsLoading) => serversLoading || standsLoading,
);

sample({
  clock: serversAuthRoute.opened,
  target: pageMounted,
});

sample({
  clock: pageMounted,
  target: [mockServerModel.serversRequested, standModel.standsRequested],
});

sample({
  clock: standChanged,
  fn: ({ id, standCode }) => ({ id, data: { standCode } }),
  target: mockServerModel.serverUpdated,
});

sample({
  clock: mockServerModel.updateServerFx.done,
  fn: () => 'Удалённый сервер изменён',
  target: notifySuccessFx,
});

sample({
  clock: mockServerModel.updateServerFx.failData,
  fn: (error) => error.message || 'Не удалось изменить удалённый сервер',
  target: notifyErrorFx,
});
