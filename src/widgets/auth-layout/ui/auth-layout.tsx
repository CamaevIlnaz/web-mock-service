import { Box, Flex, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { AuthCubesBackground } from './auth-cubes-background';
import { AuthLogo } from './auth-logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="page"
      overflow="hidden"
    >
      <AuthCubesBackground />

      <Box position="absolute" top="6" left="6" zIndex="1">
        <AuthLogo />
      </Box>

      <Flex
        position="relative"
        zIndex="1"
        minH="100vh"
        align="center"
        justify="center"
        px="4"
        py="16"
      >
        <Box
          w="100%"
          maxW="420px"
          bg="panel"
          borderWidth="1px"
          borderColor="border"
          borderRadius="md"
          px={{ base: '6', md: '8' }}
          py={{ base: '8', md: '10' }}
          boxShadow="sm"
        >
          {children}
        </Box>
      </Flex>

      <Text
        position="absolute"
        bottom="5"
        left="0"
        right="0"
        textAlign="center"
        fontSize="sm"
        color="muted"
        zIndex="1"
      >
        © 2026 Mock Hub
      </Text>
    </Box>
  );
}
