import { combine, createEvent, sample } from 'effector';
import { createRoute } from 'atomic-router';

import { formatStartCommand, mockServerModel } from '@/entities/mock-server';
import { formatStandLabel, standModel } from '@/entities/stand';

import type { ServerViewItem } from './types';

export type { ServerViewItem, StandOption, ServersTableProps } from './types';

export const serversRoute = createRoute();

export const pageMounted = createEvent();

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
  clock: serversRoute.opened,
  target: pageMounted,
});

sample({
  clock: pageMounted,
  target: [mockServerModel.serversRequested, standModel.standsRequested],
});
