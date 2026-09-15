import { Flex } from '@chakra-ui/react';

import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  return (
    <Flex
      as="aside"
      direction="column"
      w="260px"
      flexShrink={0}
      h="100vh"
      bg="panel"
      borderRight="1px solid"
      borderColor="border"
      py="6"
      px="4"
    >
      <SidebarHeader />
      <SidebarNav />
    </Flex>
  );
}
