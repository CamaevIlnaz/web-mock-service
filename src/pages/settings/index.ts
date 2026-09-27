import { createRouteView } from 'atomic-router-react';

import { NotFoundPage } from '@/pages/not-found';

import { settingsAdminRoute } from './model';
import { SettingsPage as SettingsPageContent } from './ui/settings-page';

export { settingsRoute, settingsAdminRoute } from './model';

export const SettingsPage = createRouteView({
  route: settingsAdminRoute,
  view: SettingsPageContent,
  otherwise: NotFoundPage,
});
