import { combine, createEvent, createStore, sample } from 'effector';

import { loginFx, logoutFx, meFx, registerFx } from './effects';
import type {
  AuthStatus,
  AuthUserResponseDto,
  AuthView,
  LoginDto,
  RegisterPayload,
} from './types';

export const sessionRequested = createEvent();
export const loginFormSubmitted = createEvent<LoginDto>();
export const registerFormSubmitted = createEvent<RegisterPayload>();
export const logoutRequested = createEvent();
export const loginViewOpened = createEvent();
export const registerViewOpened = createEvent();

export const $user = createStore<AuthUserResponseDto | null>(null)
  .on(meFx.doneData, (_, user) => user)
  .on(loginFx.doneData, (_, user) => user)
  .on(registerFx.doneData, (_, user) => user)
  .on(logoutFx.done, () => null)
  .on(meFx.fail, () => null);

export const $authStatus = createStore<AuthStatus>('pending')
  .on(meFx.done, () => 'authenticated')
  .on(meFx.fail, () => 'anonymous')
  .on(loginFx.done, () => 'authenticated')
  .on(registerFx.done, () => 'authenticated')
  .on(logoutFx.done, () => 'anonymous');

export const $authView = createStore<AuthView>('login')
  .on(loginViewOpened, () => 'login')
  .on(registerViewOpened, () => 'register')
  .on(loginFx.done, () => 'login')
  .on(registerFx.done, () => 'login')
  .on(logoutFx.done, () => 'login');

export const $isSubmitting = combine(
  loginFx.pending,
  registerFx.pending,
  (loginPending, registerPending) => loginPending || registerPending,
);

export const $submitError = createStore<string | null>(null)
  .on(loginFx.failData, (_, error) => error.message)
  .on(registerFx.failData, (_, error) => error.message)
  .reset(
    loginFormSubmitted,
    registerFormSubmitted,
    loginViewOpened,
    registerViewOpened,
    loginFx.done,
    registerFx.done,
  );

sample({
  clock: sessionRequested,
  target: meFx,
});

sample({
  clock: loginFormSubmitted,
  target: loginFx,
});

sample({
  clock: registerFormSubmitted,
  target: registerFx,
});

sample({
  clock: logoutRequested,
  target: logoutFx,
});

sessionRequested();
