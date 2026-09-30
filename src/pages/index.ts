import { ServersPage, serversRoute } from './servers';
import { RulesPage, rulesRoute } from './rules';
import { FilesPage, filesRoute } from './files';
// TODO: временно скрыто
// import { BpmPage, bpmRoute } from './bpm';
import { DocumentationPage, documentationRoute } from './documentation';
import { SettingsPage, settingsRoute } from './settings';
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
    path: '/rules',
    route: rulesRoute,
    view: RulesPage,
  },
  {
    path: '/files',
    route: filesRoute,
    view: FilesPage,
  },
  // TODO: временно скрыто
  // {
  //   path: '/bpm',
  //   route: bpmRoute,
  //   view: BpmPage,
  // },
  {
    path: '/settings',
    route: settingsRoute,
    view: SettingsPage,
  },
  {
    path: '/documentation',
    route: documentationRoute,
    view: DocumentationPage,
  },
];

export { notFoundRoute, NotFoundPage };
