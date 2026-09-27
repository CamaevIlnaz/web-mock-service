import { Box, Button, Flex } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import {
  CreateMockServerModal,
  createMockServerModel,
} from '@/features/create-mock-server';
import {
  DeleteMockServerDialog,
  deleteMockServerModel,
} from '@/features/delete-mock-server';
import { Title, notify } from '@/shared/ui';

import {
  $isPageLoading,
  $serversView,
  $standsOptions,
  standChanged,
} from '../model';
import { ServersInfoBanner } from './ServersInfoBanner';
import { ServersTable } from './ServersTable';
import { ServersTableSkeleton } from './ServersTableSkeleton';

export const ServersPage = () => {
  const [
    servers,
    standOptions,
    isLoading,
    openCreateModal,
    changeStand,
    openDelete,
  ] = useUnit([
    $serversView,
    $standsOptions,
    $isPageLoading,
    createMockServerModel.modalOpened,
    standChanged,
    deleteMockServerModel.dialogOpened,
  ]);

  const handleCopyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      notify.success('Команда скопирована');
    } catch {
      notify.error('Не удалось скопировать команду');
    }
  };

  const handleStandChange = (serverId: number, standCode: string) => {
    changeStand({ id: serverId, standCode });
  };

  return (
    <Box px="8" py="8" maxW="1200px">
      <Flex align="center" justify="space-between" mb="8">
        <Title size="lg">Серверы</Title>
        <Button
          bg="primary"
          color="primaryText"
          size="md"
          borderRadius="md"
          fontWeight="medium"
          px="4"
          gap="2"
          cursor="pointer"
          _hover={{ opacity: 0.9 }}
          onClick={openCreateModal}
        >
          <Plus size={18} strokeWidth={2} />
          Новый сервер
        </Button>
      </Flex>

      <Box bg="panel" borderRadius="lg" overflow="hidden">
        {isLoading ? (
          <ServersTableSkeleton />
        ) : (
          <ServersTable
            servers={servers}
            standOptions={standOptions}
            onStandChange={handleStandChange}
            onCopyCommand={handleCopyCommand}
            onDelete={openDelete}
          />
        )}
      </Box>

      {!isLoading && <ServersInfoBanner />}

      <CreateMockServerModal />
      <DeleteMockServerDialog />
    </Box>
  );
};
