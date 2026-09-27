import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

import { standFormSchema } from '@/entities/stand';
import { FormInput, FormProvider, useAppForm } from '@/shared/form';

import { EDIT_STAND_DEFAULT_VALUES, toStandFormValues } from '../lib';
import { editStandModel } from '../model';

export const EditStandModal = () => {
  const [isOpen, stand, isSubmitting, submitError, closeModal, submitForm] =
    useUnit([
      editStandModel.$isOpen,
      editStandModel.$stand,
      editStandModel.$isSubmitting,
      editStandModel.$submitError,
      editStandModel.modalClosed,
      editStandModel.formSubmitted,
    ]);

  const form = useAppForm({
    schema: standFormSchema,
    defaultValues: EDIT_STAND_DEFAULT_VALUES,
  });
  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (isOpen && stand) {
      reset(toStandFormValues(stand));
    }
  }, [isOpen, stand, reset]);

  const onSubmit = handleSubmit((values) => {
    submitForm(values);
  });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          closeModal();
        }
      }}
      placement="center"
      motionPreset="scale"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.500" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="panel"
            borderRadius="lg"
            maxW="480px"
            w="100%"
            mx="4"
            p="0"
            boxShadow="lg"
          >
            <Dialog.Header
              px="6"
              pt="6"
              pb="4"
              flexDirection="column"
              alignItems="stretch"
              gap="1"
              position="relative"
            >
              <Flex justify="space-between" align="flex-start" gap="4">
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="bold"
                  color="heading"
                  lineHeight="1.3"
                >
                  Редактировать стенд
                </Dialog.Title>
                <IconButton
                  aria-label="Закрыть"
                  variant="ghost"
                  size="sm"
                  color="muted"
                  onClick={closeModal}
                >
                  <X size={18} strokeWidth={1.75} />
                </IconButton>
              </Flex>
              <Dialog.Description fontSize="sm" color="muted" lineHeight="1.5">
                Измените параметры удалённого сервера.
              </Dialog.Description>
            </Dialog.Header>

            <FormProvider {...form}>
              <Box as="form" noValidate onSubmit={onSubmit}>
                <Dialog.Body
                  px="6"
                  py="0"
                  display="flex"
                  flexDirection="column"
                  gap="5"
                >
                  <FormInput
                    name="code"
                    label="Code"
                    placeholder="DEV"
                    required
                  />
                  <FormInput
                    name="name"
                    label="Name"
                    placeholder="Develop"
                    required
                  />
                  <FormInput
                    name="domain"
                    label="Domain"
                    placeholder="dev.example.ru"
                    required
                  />
                  <FormInput
                    name="basePath"
                    label="Base path"
                    placeholder="/api"
                    required
                  />

                  {submitError ? (
                    <Text fontSize="sm" color="danger">
                      {submitError}
                    </Text>
                  ) : null}
                </Dialog.Body>

                <Dialog.Footer px="6" py="6" gap="3">
                  <Button
                    type="button"
                    variant="outline"
                    borderColor="border"
                    color="text"
                    onClick={closeModal}
                    disabled={isSubmitting}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    bg="primary"
                    color="primaryText"
                    loading={isSubmitting}
                    _hover={{ opacity: 0.9 }}
                  >
                    Сохранить
                  </Button>
                </Dialog.Footer>
              </Box>
            </FormProvider>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
