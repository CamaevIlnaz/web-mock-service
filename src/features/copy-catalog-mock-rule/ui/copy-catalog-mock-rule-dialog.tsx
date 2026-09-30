import {
  Button,
  Dialog,
  Flex,
  IconButton,
  NativeSelect,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { X } from 'lucide-react';

import { copyCatalogMockRuleModel } from '../model';

export const CopyCatalogMockRuleDialog = () => {
  const [
    isOpen,
    rule,
    targetMockServerId,
    serverOptions,
    isSubmitting,
    submitError,
    closeDialog,
    selectServer,
    confirmCopy,
  ] = useUnit([
    copyCatalogMockRuleModel.$isOpen,
    copyCatalogMockRuleModel.$rule,
    copyCatalogMockRuleModel.$targetMockServerId,
    copyCatalogMockRuleModel.$serverOptions,
    copyCatalogMockRuleModel.$isSubmitting,
    copyCatalogMockRuleModel.$submitError,
    copyCatalogMockRuleModel.dialogClosed,
    copyCatalogMockRuleModel.targetServerSelected,
    copyCatalogMockRuleModel.confirmed,
  ]);

  const canSubmit =
    targetMockServerId !== null && serverOptions.length > 0 && !isSubmitting;

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
                  Скопировать правило
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
                {rule
                  ? `Выберите свой мок-сервер, куда скопировать «${rule.name}».`
                  : 'Выберите свой мок-сервер для копирования.'}
              </Dialog.Description>
            </Dialog.Header>

            <Dialog.Body px="6" py="0">
              <NativeSelect.Root size="md" width="100%">
                <NativeSelect.Field
                  value={
                    targetMockServerId !== null
                      ? String(targetMockServerId)
                      : ''
                  }
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    if (!Number.isNaN(value)) {
                      selectServer(value);
                    }
                  }}
                  cursor="pointer"
                  bg="panel"
                  borderColor="border"
                  color="text"
                  disabled={serverOptions.length === 0 || isSubmitting}
                >
                  {serverOptions.length === 0 ? (
                    <option value="">Нет серверов</option>
                  ) : (
                    serverOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  )}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              {submitError ? (
                <Text fontSize="sm" color="danger" mt="3">
                  {submitError}
                </Text>
              ) : null}

              {serverOptions.length === 0 ? (
                <Text fontSize="sm" color="muted" mt="3">
                  Сначала создайте мок-сервер в разделе «Серверы».
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
                bg="primary"
                color="primaryText"
                cursor="pointer"
                loading={isSubmitting}
                disabled={!canSubmit}
                onClick={confirmCopy}
                _hover={{ opacity: 0.9 }}
              >
                Скопировать
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
