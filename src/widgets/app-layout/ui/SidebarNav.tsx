import { Flex } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { sessionModel } from '@/entities/session';

import { navItems } from '../model/nav-items';
import { SidebarNavItem } from './SidebarNavItem';

export function SidebarNav() {
  const isAdmin = useUnit(sessionModel.$isAdmin);

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin,
  );

  return (
    <Flex as="nav" direction="column" gap="1" flex="1">
      {visibleItems.map((item) => (
        <SidebarNavItem key={item.label} item={item} />
      ))}
    </Flex>
  );
}
