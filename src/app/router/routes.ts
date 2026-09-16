import { notFoundRoute } from '@/pages';
import { serversRoute } from '@/pages/servers';
import { requestsRoute } from '@/pages/requests';
import { bpmRoute } from '@/pages/bpm';
import { documentationRoute } from '@/pages/documentation';

export const routes = {
  servers: serversRoute,
  requests: requestsRoute,
  bpm: bpmRoute,
  documentation: documentationRoute,
  notFound: notFoundRoute,
};
