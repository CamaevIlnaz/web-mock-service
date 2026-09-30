import { API_BASE_URL } from '@/shared/config';

import type { AuthUserResponseDto } from '../model';

// В OpenAPI-спеке avatarUrl описан как объект, фактически бэк отдаёт строку.
export const getAvatarSrc = (
  avatarUrl: AuthUserResponseDto['avatarUrl'],
): string | undefined => {
  if (typeof avatarUrl !== 'string' || !avatarUrl) {
    return undefined;
  }

  if (/^https?:\/\//.test(avatarUrl)) {
    return avatarUrl;
  }

  return `${API_BASE_URL.replace(/\/$/, '')}${avatarUrl}`;
};
