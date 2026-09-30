import { notFoundRoute } from '@/pages';
import { serversRoute } from '@/pages/servers';
import { rulesRoute } from '@/pages/rules';
import { rulesCatalogRoute } from '@/pages/rules-catalog';
import { filesRoute } from '@/pages/files';
// TODO: временно скрыто
// import { bpmRoute } from '@/pages/bpm';
import { documentationRoute } from '@/pages/documentation';
import { settingsRoute } from '@/pages/settings';

export const routes = {
  servers: serversRoute,
  rules: rulesRoute,
  rulesCatalog: rulesCatalogRoute,
  files: filesRoute,
  // bpm: bpmRoute,
  settings: settingsRoute,
  documentation: documentationRoute,
  notFound: notFoundRoute,
};
