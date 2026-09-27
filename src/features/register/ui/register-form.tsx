import {
  Box,
  Button,
  Flex,
  Separator,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Lock, Mail, User } from 'lucide-react';

import { sessionModel } from '@/entities/session';
import { FormInput, FormProvider, useAppForm } from '@/shared/form';

import { registerFormSchema, type RegisterFormValues } from '../lib';

const DEFAULT_VALUES: RegisterFormValues = {
  firstName: '',
  login: '',
  password: '',
  confirmPassword: '',
};

export function RegisterForm() {
  const [isSubmitting, submitError, submitForm, openLogin] = useUnit([
    sessionModel.$isSubmitting,
    sessionModel.$submitError,
    sessionModel.registerFormSubmitted,
    sessionModel.loginViewOpened,
  ]);

  const form = useAppForm({
    schema: registerFormSchema,
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit((values) => {
    submitForm({
      firstName: values.firstName,
      login: values.login,
      password: values.password,
    });
  });

  return (
    <FormProvider {...form}>
      <Box as="form" noValidate onSubmit={onSubmit} w="100%">
        <Flex direction="column" gap="5">
          <FormInput
            name="firstName"
            label="Имя"
            placeholder="Введите имя"
            required
            startElement={<User size={18} strokeWidth={1.75} />}
          />
          <FormInput
            name="login"
            label="Логин"
            placeholder="Введите логин"
            required
            startElement={<Mail size={18} strokeWidth={1.75} />}
          />
          <FormInput
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            required
            startElement={<Lock size={18} strokeWidth={1.75} />}
          />
          <FormInput
            name="confirmPassword"
            label="Повторите пароль"
            placeholder="Введите пароль ещё раз"
            type="password"
            required
            startElement={<Lock size={18} strokeWidth={1.75} />}
          />

          {submitError ? (
            <Text fontSize="sm" color="danger">
              {submitError}
            </Text>
          ) : null}

          <Button
            type="submit"
            w="100%"
            h="12"
            bg="primary"
            color="primaryText"
            fontWeight="semibold"
            borderRadius="md"
            loading={isSubmitting}
            _hover={{ bg: 'heading' }}
          >
            Создать аккаунт
          </Button>

          <Flex align="center" gap="3">
            <Separator flex="1" borderColor="border" />
            <Text fontSize="sm" color="muted">
              или
            </Text>
            <Separator flex="1" borderColor="border" />
          </Flex>

          <Text textAlign="center" fontSize="sm" color="text">
            Уже есть аккаунт?{' '}
            <Button
              type="button"
              variant="plain"
              color="blue.600"
              fontWeight="semibold"
              textDecoration="underline"
              p="0"
              h="auto"
              minW="auto"
              onClick={openLogin}
            >
              Войти
            </Button>
          </Text>
        </Flex>
      </Box>
    </FormProvider>
  );
}
