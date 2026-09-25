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
import { Info, X } from 'lucide-react';
import { useEffect } from 'react';

import {
  FormInput,
  FormProvider,
  FormSelect,
  useAppForm,
} from '@/shared/form';

import { createServerFormSchema, type CreateServerFormValues } from '../lib';
import { createMockServerModel } from '../model';

const DEFAULT_VALUES: CreateServerFormValues = {
  name: '',
  standCode: '',
};

export const CreateMockServerModal = () => {
  const [
    isOpen,
    isSubmitting,
    standOptions,
    submitError,
    closeModal,
    submitForm,
  ] = useUnit([
    createMockServerModel.$isOpen,
    createMockServerModel.$isSubmitting,
    createMockServerModel.$standOptions,
    createMockServerModel.$submitError,
    createMockServerModel.modalClosed,
    createMockServerModel.formSubmitted,
  ]);

  const form = useAppForm({
    schema: createServerFormSchema,
    defaultValues: DEFAULT_VALUES,
  });
  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (isOpen) {
      reset(DEFAULT_VALUES);
    }
  }, [isOpen, reset]);

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
                  Новый сервер
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
                Создайте мок-сервер и выберите, куда перенаправлять запросы.
              </Dialog.Description>
            </Dialog.Header>

            <FormProvider {...form}>
              <Box as="form" onSubmit={onSubmit}>
                <Dialog.Body
                  px="6"
                  py="0"
                  display="flex"
                  flexDirection="column"
                  gap="5"
                >
                  <FormInput
                    name="name"
                    label="Название"
                    placeholder="Например, Frontend Ftest"
                    required
                  />

                  <FormSelect
                    name="standCode"
                    label="Удалённый сервер"
                    placeholder="Выберите сервер"
                    options={standOptions}
                    helperText="Все незамоканные запросы будут отправляться на этот сервер."
                    required
                  />

                  <Flex
                    align="flex-start"
                    gap="3"
                    p="3.5"
                    bg="panelAlt"
                    borderRadius="md"
                  >
                    <Box color="brand" mt="0.5" flexShrink={0}>
                      <Info size={18} strokeWidth={1.75} />
                    </Box>
                    <Text fontSize="sm" color="muted" lineHeight="1.5">
                      Команда запуска и токен будут сформированы автоматически.
                    </Text>
                  </Flex>

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
                    Создать сервер
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
