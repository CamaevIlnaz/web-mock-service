import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { X } from 'lucide-react';

import { deleteMockServerModel } from '../model';

export const DeleteMockServerDialog = () => {
  const [
    isOpen,
    server,
    isSubmitting,
    submitError,
    closeDialog,
    confirmDelete,
  ] = useUnit([
    deleteMockServerModel.$isOpen,
    deleteMockServerModel.$server,
    deleteMockServerModel.$isSubmitting,
    deleteMockServerModel.$submitError,
    deleteMockServerModel.dialogClosed,
    deleteMockServerModel.confirmed,
  ]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          closeDialog();
        }
      }}
      placement="center"
      motionPreset="scale"
      role="alertdialog"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.500" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="panel"
            borderRadius="lg"
            maxW="420px"
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
            >
              <Flex justify="space-between" align="flex-start" gap="4">
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="bold"
                  color="heading"
                  lineHeight="1.3"
                >
                  Удалить сервер?
                </Dialog.Title>
                <IconButton
                  aria-label="Закрыть"
                  variant="ghost"
                  size="sm"
                  color="muted"
                  cursor="pointer"
                  onClick={closeDialog}
                >
                  <X size={18} strokeWidth={1.75} />
                </IconButton>
              </Flex>
              <Dialog.Description fontSize="sm" color="muted" lineHeight="1.5">
                {server
                  ? `Сервер «${server.name}» будет удалён без возможности восстановления.`
                  : 'Сервер будет удалён без возможности восстановления.'}
              </Dialog.Description>
            </Dialog.Header>

            <Dialog.Body px="6" py="0">
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
                cursor="pointer"
                onClick={closeDialog}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
              <Button
                type="button"
                bg="danger"
                color="primaryText"
                cursor="pointer"
                loading={isSubmitting}
                onClick={confirmDelete}
                _hover={{ opacity: 0.9 }}
              >
                Удалить
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
