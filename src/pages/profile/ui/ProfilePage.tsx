import { Box, Flex } from '@chakra-ui/react';

import { ChangePasswordForm } from '@/features/change-password';
import { Title } from '@/shared/ui';

import { ProfilePanel } from './profile-panel';
import { ProfileSection } from './profile-section';
import { SessionSection } from './session-section';

export function ProfilePage() {
  return (
    <Box px="8" py="8" maxW="1200px">
      <Title size="lg">Личный кабинет</Title>

      <Flex mt="8" direction="column" gap="4">
        <ProfileSection />

        <ProfilePanel
          title="Безопасность"
          description="Измените пароль для входа в аккаунт"
        >
          <ChangePasswordForm />
        </ProfilePanel>

        <SessionSection />
      </Flex>
    </Box>
  );
}
