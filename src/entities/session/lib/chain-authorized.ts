import {
  chainRoute,
  type RouteInstance,
  type RouteParams,
  type RouteParamsAndQuery,
} from 'atomic-router';
import { createEvent, sample } from 'effector';

import { sessionModel } from '../model';

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: sessionModel.$authStatus,
    filter: (status) => status === 'authenticated',
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [
      alreadyAuthorized,
      sessionModel.meFx.done,
      sessionModel.loginFx.done,
      sessionModel.registerFx.done,
    ],
    cancelOn: [sessionModel.meFx.fail, sessionModel.logoutFx.done],
  });
}
