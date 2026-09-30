import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { LogOut } from 'lucide-react';

import { sessionModel } from '@/entities/session';
import { Title } from '@/shared/ui';

export function SessionSection() {
  const [logout, isLoggingOut] = useUnit([
    sessionModel.logoutRequested,
    sessionModel.logoutFx.pending,
  ]);

  return (
    <Flex
      align="center"
      justify="space-between"
      gap="4"
      bg="panel"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="border"
      px="6"
      py="5"
    >
      <Box>
        <Title size="sm">Сеанс</Title>
        <Text mt="1" fontSize="sm" color="muted">
          Завершить текущий сеанс на этом устройстве
        </Text>
      </Box>

      <Button
        type="button"
        variant="outline"
        borderColor="danger"
        color="danger"
        fontWeight="medium"
        borderRadius="md"
        px="5"
        gap="2"
        loading={isLoggingOut}
        _hover={{ bg: 'dangerBg' }}
        onClick={logout}
      >
        <LogOut size={18} strokeWidth={1.75} />
        Выйти из аккаунта
      </Button>
    </Flex>
  );
}
