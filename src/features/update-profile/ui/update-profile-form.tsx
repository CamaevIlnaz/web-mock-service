import { Box, Button, Flex } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { sessionModel } from '@/entities/session';
import { FormInput, FormProvider, useAppForm } from '@/shared/form';

import { updateProfileFormSchema } from '../lib';
import { updateProfileModel } from '../model';

export function UpdateProfileForm() {
  const [user, isSubmitting, submitForm] = useUnit([
    sessionModel.$user,
    updateProfileModel.$isSubmitting,
    updateProfileModel.formSubmitted,
  ]);

  const form = useAppForm({
    schema: updateProfileFormSchema,
    defaultValues: { firstName: user?.firstName ?? '' },
  });
  const { reset, handleSubmit } = form;

  const firstName = user?.firstName ?? '';

  useEffect(() => {
    reset({ firstName });
  }, [firstName, reset]);

  const onSubmit = handleSubmit((values) => {
    submitForm(values);
  });

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={onSubmit}>
        <Box maxW="360px">
          <FormInput name="firstName" label="Имя" placeholder="Введите имя" />
        </Box>

        <Flex justify="flex-end" mt="5">
          <Button
            type="submit"
            bg="brand"
            color="primaryText"
            fontWeight="medium"
            borderRadius="md"
            px="5"
            loading={isSubmitting}
            _hover={{ opacity: 0.9 }}
          >
            Сохранить изменения
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
