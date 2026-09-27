import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

import { notFoundRoute, routes } from '@/pages';

export const router = createHistoryRouter({
  routes: routes.map(({ path, route }) => ({ path, route })),
  notFoundRoute,
});

router.setHistory(createBrowserHistory());
