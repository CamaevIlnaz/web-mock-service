import { createEffect } from 'effector';

import {
  authControllerLogin,
  authControllerLogout,
  authControllerMe,
  authControllerRegister,
} from '@/shared/api/generated/auth/auth';

import type { AuthUserResponseDto, LoginDto, RegisterPayload } from './types';

export const meFx = createEffect<void, AuthUserResponseDto>(() =>
  authControllerMe(),
);

export const loginFx = createEffect<LoginDto, AuthUserResponseDto>((dto) =>
  authControllerLogin(dto),
);

export const registerFx = createEffect<RegisterPayload, AuthUserResponseDto>(
  (payload) => authControllerRegister(payload),
);

export const logoutFx = createEffect<void, void>(() => authControllerLogout());
