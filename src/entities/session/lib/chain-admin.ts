import {
  chainRoute,
  type RouteInstance,
  type RouteParams,
  type RouteParamsAndQuery,
} from 'atomic-router';
import { createEvent, sample } from 'effector';

import { sessionModel } from '../model';

export function chainAdmin<Params extends RouteParams>(
  route: RouteInstance<Params>,
) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAdmin = sample({
    clock: sessionCheckStarted,
    source: {
      status: sessionModel.$authStatus,
      user: sessionModel.$user,
    },
    filter: ({ status, user }) =>
      status === 'authenticated' && user?.role === 'admin',
  });

  const becameAdmin = sample({
    clock: [
      sessionModel.meFx.done,
      sessionModel.loginFx.done,
      sessionModel.registerFx.done,
    ],
    source: sessionModel.$user,
    filter: (user) => user?.role === 'admin',
  });

  const accessDenied = sample({
    clock: sessionCheckStarted,
    source: {
      status: sessionModel.$authStatus,
      user: sessionModel.$user,
    },
    filter: ({ status, user }) =>
      status === 'authenticated' && user?.role !== 'admin',
  });

  const becameNonAdmin = sample({
    clock: [
      sessionModel.meFx.done,
      sessionModel.loginFx.done,
      sessionModel.registerFx.done,
    ],
    source: sessionModel.$user,
    filter: (user) => Boolean(user) && user?.role !== 'admin',
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAdmin, becameAdmin],
    cancelOn: [
      accessDenied,
      becameNonAdmin,
      sessionModel.meFx.fail,
      sessionModel.logoutFx.done,
    ],
  });
}
