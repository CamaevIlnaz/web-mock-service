import { Box, Button, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import {
  CreateStandModal,
  createStandModel,
} from '@/features/create-stand';
import {
  DeleteStandDialog,
  deleteStandModel,
} from '@/features/delete-stand';
import { EditStandModal, editStandModel } from '@/features/edit-stand';
import { standModel } from '@/entities/stand';
import { Title } from '@/shared/ui';

import { StandsTable } from './stands-table';
import { StandsTableSkeleton } from './stands-table-skeleton';

export const SettingsPage = () => {
  const [stands, isLoading, openCreate, openEdit, openDelete] = useUnit([
    standModel.$stands,
    standModel.$isStandsLoading,
    createStandModel.modalOpened,
    editStandModel.modalOpened,
    deleteStandModel.dialogOpened,
  ]);

  return (
    <Box px="8" py="8" maxW="1200px">
      <Title size="lg">Настройки</Title>

      <Box
        mt="8"
        bg="panel"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border"
        overflow="hidden"
      >
        <Box px="6" pt="5" pb="3">
          <Text fontSize="md" fontWeight="semibold" color="heading">
            Удалённые серверы
          </Text>
        </Box>

        <Box px="2">
          {isLoading ? (
            <StandsTableSkeleton />
          ) : (
            <StandsTable
              stands={stands}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          )}
        </Box>

        <Box px="6" py="5">
          <Button
            bg="primary"
            color="primaryText"
            size="md"
            borderRadius="md"
            fontWeight="medium"
            px="4"
            gap="2"
            _hover={{ opacity: 0.9 }}
            onClick={openCreate}
            disabled={isLoading}
          >
            <Plus size={18} strokeWidth={2} />
            Добавить стенд
          </Button>
        </Box>
      </Box>

      <CreateStandModal />
      <EditStandModal />
      <DeleteStandDialog />
    </Box>
  );
};
