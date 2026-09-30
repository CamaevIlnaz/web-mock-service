import { Flex, Separator, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { UpdateProfileForm } from '@/features/update-profile';
import { UploadAvatarButton } from '@/features/upload-avatar';
import { sessionModel, UserAvatar } from '@/entities/session';

import { ProfilePanel } from './profile-panel';

export function ProfileSection() {
  const user = useUnit(sessionModel.$user);

  return (
    <ProfilePanel title="Профиль">
      <Flex align="center" gap="6">
        <UserAvatar user={user} size="2xl" />
        <Flex direction="column" gap="3">
          <Text fontSize="md" fontWeight="semibold" color="heading">
            {user?.firstName}
          </Text>
          <UploadAvatarButton />
        </Flex>
      </Flex>

      <Separator my="5" borderColor="border" />

      <UpdateProfileForm />
    </ProfilePanel>
  );
}
