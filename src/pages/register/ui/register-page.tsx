import { Heading, Text, VStack } from '@chakra-ui/react';

import { RegisterForm } from '@/features/register';
import { AuthLayout } from '@/widgets/auth-layout';

export function RegisterPage() {
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
            Регистрация
          </Heading>
          <Text fontSize="sm" color="muted" lineHeight="1.5">
            Создайте аккаунт для работы с мок-серверами.
          </Text>
        </VStack>
        <RegisterForm />
      </VStack>
    </AuthLayout>
  );
}
