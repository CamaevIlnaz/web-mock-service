import {
  Box,
  Button,
  Flex,
  Separator,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Lock, Mail } from 'lucide-react';

import { sessionModel } from '@/entities/session';
import { FormInput, FormProvider, useAppForm } from '@/shared/form';

import { loginFormSchema, type LoginFormValues } from '../lib';

const DEFAULT_VALUES: LoginFormValues = {
  login: '',
  password: '',
};

export function LoginForm() {
  const [isSubmitting, submitError, submitForm, openRegister] = useUnit([
    sessionModel.$isSubmitting,
    sessionModel.$submitError,
    sessionModel.loginFormSubmitted,
    sessionModel.registerViewOpened,
  ]);

  const form = useAppForm({
    schema: loginFormSchema,
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit((values) => {
    submitForm(values);
  });

  return (
    <FormProvider {...form}>
      <Box as="form" noValidate onSubmit={onSubmit} w="100%">
        <Flex direction="column" gap="5">
          <FormInput
            name="login"
            label="Логин"
            placeholder="name@example.com"
            startElement={<Mail size={18} strokeWidth={1.75} />}
          />
          <FormInput
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
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
            Войти
          </Button>

          <Flex align="center" gap="3">
            <Separator flex="1" borderColor="border" />
            <Text fontSize="sm" color="muted">
              или
            </Text>
            <Separator flex="1" borderColor="border" />
          </Flex>

          <Text textAlign="center" fontSize="sm" color="text">
            Нет аккаунта?{' '}
            <Button
              type="button"
              variant="plain"
              color="blue.600"
              fontWeight="semibold"
              textDecoration="underline"
              p="0"
              h="auto"
              minW="auto"
              onClick={openRegister}
            >
              Зарегистрироваться
            </Button>
          </Text>
        </Flex>
      </Box>
    </FormProvider>
  );
}
