import { type ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Sidebar } from './Sidebar';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex minH="100vh" bg="page" fontFamily="body">
      <Sidebar />
      <Box as="main" flex="1" overflow="auto" bg="page">
        {children}
      </Box>
    </Flex>
  );
}
