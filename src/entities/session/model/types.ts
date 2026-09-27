import type {
  AuthUserResponseDto,
  LoginDto,
} from '@/shared/api/generated/model';

export type { AuthUserResponseDto, LoginDto };

export type AuthStatus = 'pending' | 'anonymous' | 'authenticated';

export type AuthView = 'login' | 'register';

export interface RegisterPayload {
  login: string;
  password: string;
  firstName: string;
}
