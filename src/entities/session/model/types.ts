import type {
  AuthUserResponseDto,
  ChangePasswordDto,
  LoginDto,
  UpdateProfileDto,
} from '@/shared/api/generated/model';

export type { AuthUserResponseDto, ChangePasswordDto, LoginDto, UpdateProfileDto };

export type AuthStatus = 'pending' | 'anonymous' | 'authenticated';

export type AuthView = 'login' | 'register';

export interface RegisterPayload {
  login: string;
  password: string;
  firstName: string;
}
