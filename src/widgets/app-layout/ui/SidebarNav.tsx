import { Flex } from '@chakra-ui/react';

import { navItems } from '../model/nav-items';
import { SidebarNavItem } from './SidebarNavItem';

export function SidebarNav() {
  return (
    <Flex as="nav" direction="column" gap="1" flex="1">
      {navItems.map((item) => (
        <SidebarNavItem key={item.label} item={item} />
      ))}
    </Flex>
  );
}
