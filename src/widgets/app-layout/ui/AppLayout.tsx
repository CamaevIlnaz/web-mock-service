import { type ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Sidebar } from './Sidebar';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex h="100vh" bg="page" fontFamily="body" overflow="hidden">
      <Sidebar />
      <Box as="main" flex="1" minW="0" overflowY="auto" bg="page">
        {children}
      </Box>
    </Flex>
  );
}
