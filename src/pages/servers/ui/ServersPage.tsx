import { Box, Button, Flex } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import { Title } from '@/shared/ui';

import { $isPageLoading, $serversView, $standsOptions } from '../model';
import { ServersInfoBanner } from './ServersInfoBanner';
import { ServersTable } from './ServersTable';
import { ServersTableSkeleton } from './ServersTableSkeleton';

export const ServersPage = () => {
  const [servers, standOptions, isLoading] = useUnit([
    $serversView,
    $standsOptions,
    $isPageLoading,
  ]);

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
          _hover={{ opacity: 0.9 }}
        >
          <Plus size={18} strokeWidth={2} />
          Новый сервер
        </Button>
      </Flex>

      <Box bg="panel" borderRadius="lg" overflow="hidden">
        {isLoading ? (
          <ServersTableSkeleton />
        ) : (
          <ServersTable servers={servers} standOptions={standOptions} />
        )}
      </Box>

      {!isLoading && <ServersInfoBanner />}
    </Box>
  );
};
