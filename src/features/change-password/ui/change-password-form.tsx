import { Button, Flex, Grid, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { FormInput, FormProvider, useAppForm } from '@/shared/form';

import {
  CHANGE_PASSWORD_DEFAULT_VALUES,
  changePasswordFormSchema,
} from '../lib';
import { changePasswordModel } from '../model';

export function ChangePasswordForm() {
  const [isSubmitting, submitError, submitForm] = useUnit([
    changePasswordModel.$isSubmitting,
    changePasswordModel.$submitError,
    changePasswordModel.formSubmitted,
  ]);

  const form = useAppForm({
    schema: changePasswordFormSchema,
    defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES,
  });
  const { reset, handleSubmit } = form;

  useEffect(
    () =>
      changePasswordModel.passwordChanged.watch(() => {
        reset(CHANGE_PASSWORD_DEFAULT_VALUES);
      }),
    [reset],
  );

  const onSubmit = handleSubmit((values) => {
    submitForm(values);
  });

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={onSubmit}>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="4">
          <FormInput
            name="currentPassword"
            label="Текущий пароль"
            type="password"
          />
          <FormInput name="newPassword" label="Новый пароль" type="password" />
          <FormInput
            name="confirmPassword"
            label="Повторите пароль"
            type="password"
          />
        </Grid>

        {submitError ? (
          <Text mt="4" fontSize="sm" color="danger">
            {submitError}
          </Text>
        ) : null}

        <Flex justify="flex-end" mt="5">
          <Button
            type="submit"
            variant="outline"
            borderColor="brand"
            color="brand"
            fontWeight="medium"
            borderRadius="md"
            px="5"
            loading={isSubmitting}
            _hover={{ bg: 'brandSoft' }}
          >
            Изменить пароль
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
