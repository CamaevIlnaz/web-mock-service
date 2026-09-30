import { Flex } from '@chakra-ui/react';

import { documentationNavItem } from '../model/nav-items';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserCard } from './SidebarUserCard';

export function SidebarFooter() {
  return (
    <Flex direction="column" gap="3" pt="4">
      <SidebarNavItem item={documentationNavItem} />
      <SidebarUserCard />
    </Flex>
  );
}
