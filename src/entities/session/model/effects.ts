import { createEffect } from 'effector';

import {
  authControllerLogin,
  authControllerLogout,
  authControllerMe,
  authControllerRegister,
} from '@/shared/api/generated/auth/auth';
import {
  usersControllerChangePassword,
  usersControllerUpdateProfile,
  usersControllerUploadAvatar,
} from '@/shared/api/generated/users/users';

import type {
  AuthUserResponseDto,
  ChangePasswordDto,
  LoginDto,
  RegisterPayload,
  UpdateProfileDto,
} from './types';

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

export const updateProfileFx = createEffect<
  UpdateProfileDto,
  AuthUserResponseDto
>((dto) => usersControllerUpdateProfile(dto));

export const changePasswordFx = createEffect<ChangePasswordDto, void>(
  (dto) => usersControllerChangePassword(dto),
);

export const uploadAvatarFx = createEffect<File, AuthUserResponseDto>(
  (avatar) => usersControllerUploadAvatar({ avatar }),
);
