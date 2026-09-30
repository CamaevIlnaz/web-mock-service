import { Box, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Title } from '@/shared/ui';

interface ProfilePanelProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ProfilePanel({ title, description, children }: ProfilePanelProps) {
  return (
    <Box
      bg="panel"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="border"
      px="6"
      py="5"
    >
      <Title size="sm">{title}</Title>
      {description ? (
        <Text mt="1" fontSize="sm" color="muted">
          {description}
        </Text>
      ) : null}
      <Box mt="5">{children}</Box>
    </Box>
  );
}
