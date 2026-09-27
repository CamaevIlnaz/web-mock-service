import { notFoundRoute } from '@/pages';
import { serversRoute } from '@/pages/servers';
import { requestsRoute } from '@/pages/requests';
import { bpmRoute } from '@/pages/bpm';
import { documentationRoute } from '@/pages/documentation';
import { settingsRoute } from '@/pages/settings';

export const routes = {
  servers: serversRoute,
  requests: requestsRoute,
  bpm: bpmRoute,
  settings: settingsRoute,
  documentation: documentationRoute,
  notFound: notFoundRoute,
};
