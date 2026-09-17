import {
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  IconButton,
  Input,
  NativeSelect,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Info, X } from 'lucide-react';

import { createMockServerModel } from '../model';

export const CreateMockServerModal = () => {
  const [
    isOpen,
    name,
    standCode,
    errors,
    isSubmitting,
    standOptions,
    submitError,
    closeModal,
    changeName,
    changeStandCode,
    submitForm,
  ] = useUnit([
    createMockServerModel.$isOpen,
    createMockServerModel.$name,
    createMockServerModel.$standCode,
    createMockServerModel.$errors,
    createMockServerModel.$isSubmitting,
    createMockServerModel.$standOptions,
    createMockServerModel.$submitError,
    createMockServerModel.modalClosed,
    createMockServerModel.nameChanged,
    createMockServerModel.standCodeChanged,
    createMockServerModel.formSubmitted,
  ]);

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

            <Dialog.Body px="6" py="0" display="flex" flexDirection="column" gap="5">
              <Field.Root invalid={Boolean(errors.name)} required>
                <Field.Label fontSize="sm" fontWeight="semibold" color="heading">
                  Название <Field.RequiredIndicator color="danger" />
                </Field.Label>
                <Input
                  value={name}
                  onChange={(event) => changeName(event.target.value)}
                  placeholder="Например, Frontend Develop"
                  size="md"
                  bg="panel"
                  borderColor="border"
                  mt="1.5"
                />
                {errors.name ? (
                  <Field.ErrorText>{errors.name}</Field.ErrorText>
                ) : null}
              </Field.Root>

              <Field.Root invalid={Boolean(errors.standCode)} required>
                <Field.Label fontSize="sm" fontWeight="semibold" color="heading">
                  Удалённый сервер <Field.RequiredIndicator color="danger" />
                </Field.Label>
                <NativeSelect.Root size="md" mt="1.5" width="100%">
                  <NativeSelect.Field
                    value={standCode}
                    onChange={(event) => changeStandCode(event.target.value)}
                    bg="panel"
                    borderColor="border"
                    color={standCode ? 'text' : 'muted'}
                  >
                    <option value="" disabled>
                      Выберите сервер
                    </option>
                    {standOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.HelperText fontSize="sm" color="muted" mt="1.5">
                  Все незамоканные запросы будут отправляться на этот сервер.
                </Field.HelperText>
                {errors.standCode ? (
                  <Field.ErrorText>{errors.standCode}</Field.ErrorText>
                ) : null}
              </Field.Root>

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
                variant="outline"
                borderColor="border"
                color="text"
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
              <Button
                bg="primary"
                color="primaryText"
                onClick={submitForm}
                loading={isSubmitting}
                _hover={{ opacity: 0.9 }}
              >
                Создать сервер
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
