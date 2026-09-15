import { ServersPage, serversRoute } from './servers';
import { NotFoundPage, notFoundRoute } from './not-found';

export const routes = [
  {
    path: '/servers',
    route: serversRoute,
    view: ServersPage,
  },
];

export { notFoundRoute, NotFoundPage };
