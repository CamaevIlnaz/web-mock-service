import { createRoutesView } from 'atomic-router-react';

import { NotFoundPage, routes } from '@/pages';

export const RoutesView = createRoutesView({
  routes: routes.map(({ route, view }) => ({ route, view })),
  otherwise: NotFoundPage,
});
