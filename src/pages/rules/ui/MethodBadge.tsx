import { Badge } from '@chakra-ui/react';

import type { MockRuleResponseDto } from '@/entities/mock-rule';

import { getMethodBadgeStyles } from '../lib';

interface MethodBadgeProps {
  method: MockRuleResponseDto['method'];
}

export const MethodBadge = ({ method }: MethodBadgeProps) => {
  const styles = getMethodBadgeStyles(method);

  return (
    <Badge
      bg={styles.bg}
      color={styles.color}
      px="2"
      py="0.5"
      borderRadius="md"
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="0.04em"
      flexShrink={0}
    >
      {method}
    </Badge>
  );
};
