import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Toast,
  VStack,
  createToaster,
} from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
  overlap: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root width={{ md: 'sm' }}>
            {toast.type === 'loading' ? (
              <Spinner size="sm" color="brand" />
            ) : (
              <Toast.Indicator />
            )}

            <VStack gap="1" flex="1" maxWidth="100%" align="flex-start">
              {toast.title ? <Toast.Title>{toast.title}</Toast.Title> : null}
              {toast.description ? (
                <Toast.Description>{toast.description}</Toast.Description>
              ) : null}
            </VStack>

            {toast.action ? (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            ) : null}
            {toast.closable ? <Toast.CloseTrigger /> : null}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
