import { Box, Flex, Text } from '@chakra-ui/react';

export function SidebarHeader() {
  return (
    <Flex align="center" gap="3" mb="8" px="1">
      <Box
        w="10"
        h="10"
        borderRadius="lg"
        flexShrink={0}
        bgGradient="to-br"
        gradientFrom="#4f8cff"
        gradientTo="brand"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="4"
          h="4"
          borderRadius="sm"
          border="2px solid"
          borderColor="white"
          opacity={0.9}
        />
      </Box>
      <Text fontSize="xl" fontWeight="bold" lineHeight="1">
        <Text as="span" color="heading">
          Life
        </Text>
        <Text as="span" color="brand">
          OS
        </Text>
      </Text>
    </Flex>
  );
}
