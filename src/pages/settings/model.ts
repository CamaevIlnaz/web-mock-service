import { createRoute, redirect } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { chainAdmin, sessionModel } from '@/entities/session';
import { standModel } from '@/entities/stand';
import { notFoundRoute } from '@/pages/not-found';

export const settingsRoute = createRoute();
export const settingsAdminRoute = chainAdmin(settingsRoute);

export const pageMounted = createEvent();

sample({
  clock: settingsAdminRoute.opened,
  target: pageMounted,
});

sample({
  clock: pageMounted,
  target: standModel.standsRequested,
});

const accessDenied = sample({
  clock: settingsRoute.opened,
  source: {
    isAdmin: sessionModel.$isAdmin,
    authStatus: sessionModel.$authStatus,
  },
  filter: ({ isAdmin, authStatus }) =>
    authStatus === 'authenticated' && !isAdmin,
});

redirect({
  clock: accessDenied,
  route: notFoundRoute,
  replace: true,
});
