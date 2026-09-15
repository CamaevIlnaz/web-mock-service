import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';

import { type NavItem } from '../model/nav-items';

interface SidebarNavItemProps {
  item: NavItem;
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <Box
      css={{
        '& > a': {
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '3',
          py: '2.5',
          borderRadius: 'md',
          color: 'text',
          textDecoration: 'none',
          transition: 'background 0.15s ease, color 0.15s ease',
          '&:hover:not(.active)': {
            bg: 'panelAlt',
          },
          '&.active': {
            bg: 'navActive',
            color: 'brand',
            '& svg': {
              color: 'brand',
            },
          },
          '& svg': {
            color: 'muted',
            flexShrink: 0,
          },
        },
        '& > a.active svg': {
          color: 'brand',
        },
      }}
    >
      <Link to={item.route} activeClassName="active">
        <Flex align="center" gap="3">
          <Icon size={22} strokeWidth={1.75} />
          <Text fontSize="sm" fontWeight="medium" lineHeight="1.25">
            {item.label}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
}
