import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { ChevronRight } from 'lucide-react';

import { routes } from '@/app/router';
import { sessionModel, UserAvatar } from '@/entities/session';

export function SidebarUserCard() {
  const user = useUnit(sessionModel.$user);

  return (
    <Box
      css={{
        '& > a': {
          display: 'block',
          px: '3',
          py: '2.5',
          borderRadius: 'md',
          textDecoration: 'none',
          transition: 'background 0.15s ease',
          '&:hover:not(.active)': {
            bg: 'panelAlt',
          },
          '&.active': {
            bg: 'navActive',
          },
        },
      }}
    >
      <Link to={routes.profile} activeClassName="active">
        <Flex align="center" gap="3">
          <UserAvatar user={user} size="sm" />
          <Box flex="1" minW="0">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="heading"
              lineHeight="1.25"
              truncate
            >
              {user?.firstName}
            </Text>
            <Text fontSize="xs" color="muted" lineHeight="1.25">
              Личный кабинет
            </Text>
          </Box>
          <Box color="muted" flexShrink={0}>
            <ChevronRight size={18} strokeWidth={1.75} />
          </Box>
        </Flex>
      </Link>
    </Box>
  );
}
