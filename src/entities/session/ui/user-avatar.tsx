import { Avatar } from '@chakra-ui/react';

import { getAvatarSrc } from '../lib/get-avatar-src';
import type { AuthUserResponseDto } from '../model';

interface UserAvatarProps {
  user: AuthUserResponseDto | null;
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function UserAvatar({ user, size }: UserAvatarProps) {
  const name = user?.firstName ?? '';

  return (
    <Avatar.Root size={size} bg="muted" color="primaryText" flexShrink={0}>
      <Avatar.Fallback name={name}>{name.charAt(0).toUpperCase()}</Avatar.Fallback>
      <Avatar.Image src={getAvatarSrc(user?.avatarUrl ?? null)} alt={name} />
    </Avatar.Root>
  );
}
