import { ServersPage, serversRoute } from './servers';
import { RequestsPage, requestsRoute } from './requests';
import { BpmPage, bpmRoute } from './bpm';
import { DocumentationPage, documentationRoute } from './documentation';
import { NotFoundPage, notFoundRoute } from './not-found';

export const routes = [
  {
    path: '/',
    route: serversRoute,
    view: ServersPage,
  },
  {
    path: '/servers',
    route: serversRoute,
    view: ServersPage,
  },
  {
    path: '/requests',
    route: requestsRoute,
    view: RequestsPage,
  },
  {
    path: '/bpm',
    route: bpmRoute,
    view: BpmPage,
  },
  {
    path: '/documentation',
    route: documentationRoute,
    view: DocumentationPage,
  },
];

export { notFoundRoute, NotFoundPage };
