import {
  loginFx,
  logoutFx,
  meFx,
  registerFx,
} from './effects';
import {
  $authStatus,
  $authView,
  $isSubmitting,
  $submitError,
  $user,
  loginFormSubmitted,
  loginViewOpened,
  logoutRequested,
  registerFormSubmitted,
  registerViewOpened,
  sessionRequested,
} from './stores';

export const sessionModel = {
  $user,
  $authStatus,
  $authView,
  $isSubmitting,
  $submitError,
  sessionRequested,
  loginFormSubmitted,
  registerFormSubmitted,
  logoutRequested,
  loginViewOpened,
  registerViewOpened,
  meFx,
  loginFx,
  registerFx,
  logoutFx,
};

export type {
  AuthStatus,
  AuthUserResponseDto,
  AuthView,
  LoginDto,
  RegisterPayload,
} from './types';
