import { ServersPage, serversRoute } from './servers';
import { RulesPage, rulesRoute } from './rules';
import { RulesCatalogPage, rulesCatalogRoute } from './rules-catalog';
import { FilesPage, filesRoute } from './files';
// TODO: временно скрыто
// import { BpmPage, bpmRoute } from './bpm';
import { DocumentationPage, documentationRoute } from './documentation';
import { SettingsPage, settingsRoute } from './settings';
import { ProfilePage, profileRoute } from './profile';
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
    path: '/rules-catalog',
    route: rulesCatalogRoute,
    view: RulesCatalogPage,
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
  {
    path: '/profile',
    route: profileRoute,
    view: ProfilePage,
  },
];

export { notFoundRoute, NotFoundPage };
