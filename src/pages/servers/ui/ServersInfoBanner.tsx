import { Box, Flex, Text } from '@chakra-ui/react';
import { Info } from 'lucide-react';

export const ServersInfoBanner = () => {
  return (
    <Flex
      align="flex-start"
      gap="3"
      mt="8"
      p="4"
      bg="panelAlt"
      borderRadius="md"
    >
      <Box color="brand" mt="0.5" flexShrink={0}>
        <Info size={20} strokeWidth={1.75} />
      </Box>
      <Box>
        <Text fontWeight="semibold" color="heading" fontSize="sm" mb="1">
          Как работают мок-серверы
        </Text>
        <Text fontSize="sm" color="muted" lineHeight="1.5">
          Выберите удалённый сервер, настройте правила ответов и используйте
          команду запуска в локальном проекте.
        </Text>
      </Box>
    </Flex>
  );
};
