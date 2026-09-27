import { Heading, Text, VStack } from '@chakra-ui/react';

import { LoginForm } from '@/features/login';
import { AuthLayout } from '@/widgets/auth-layout';

export function LoginPage() {
  return (
    <AuthLayout>
      <VStack align="stretch" gap="8">
        <VStack align="stretch" gap="2">
          <Heading
            as="h1"
            fontSize="2xl"
            fontWeight="bold"
            color="heading"
            letterSpacing="-0.02em"
          >
            Вход
          </Heading>
          <Text fontSize="sm" color="muted" lineHeight="1.5">
            Войдите, чтобы управлять мок-серверами.
          </Text>
        </VStack>
        <LoginForm />
      </VStack>
    </AuthLayout>
  );
}
