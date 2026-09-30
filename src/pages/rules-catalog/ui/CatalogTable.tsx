import {
  Badge,
  Flex,
  IconButton,
  Table,
  Text,
} from '@chakra-ui/react';
import { Copy } from 'lucide-react';

import type { CatalogMockRuleResponseDto } from '@/entities/mock-rule';

import { CATALOG_TABLE_COLUMNS } from '../constants';
import { getResponseLabel } from '../lib';
import type { CatalogTableProps } from '../types';
import { MethodBadge } from './MethodBadge';

interface CatalogRuleRowProps {
  rule: CatalogMockRuleResponseDto;
  isCopying: boolean;
  onCopy: (rule: CatalogMockRuleResponseDto) => void;
}

const CatalogRuleRow = ({ rule, isCopying, onCopy }: CatalogRuleRowProps) => {
  return (
    <Table.Row _hover={{ bg: 'panelAlt' }}>
      <Table.Cell borderColor="border" py="3" verticalAlign="middle">
        <Text fontWeight="semibold" fontSize="sm" color="heading">
          {rule.name}
        </Text>
      </Table.Cell>

      <Table.Cell borderColor="border" py="3" verticalAlign="middle">
        <MethodBadge method={rule.method} />
      </Table.Cell>

      <Table.Cell borderColor="border" py="3" verticalAlign="middle">
        <Text fontSize="sm" fontFamily="mono" color="text" truncate>
          {rule.urlMask}
        </Text>
      </Table.Cell>

      <Table.Cell borderColor="border" py="3" verticalAlign="middle">
        <Badge
          bg="panelAlt"
          color="muted"
          px="2.5"
          py="0.5"
          borderRadius="full"
          fontSize="xs"
          fontWeight="medium"
        >
          {getResponseLabel(rule)}
        </Badge>
      </Table.Cell>

      <Table.Cell borderColor="border" py="3" verticalAlign="middle">
        <Flex align="center" gap="1">
          <IconButton
            aria-label="Скопировать"
            variant="ghost"
            size="xs"
            color="muted"
            cursor="pointer"
            disabled={isCopying}
            onClick={() => onCopy(rule)}
          >
            <Copy size={16} strokeWidth={1.75} />
          </IconButton>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export const CatalogTable = ({
  rules,
  isCopying = false,
  onCopy,
}: CatalogTableProps) => {
  if (rules.length === 0) {
    return (
      <Text color="muted" fontSize="sm" px="6" py="8">
        Правил пока нет
      </Text>
    );
  }

  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {CATALOG_TABLE_COLUMNS.map((column) => (
            <Table.ColumnHeader
              key={column.id}
              color="muted"
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.04em"
              borderColor="border"
              w={column.width}
            >
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rules.map((rule) => (
          <CatalogRuleRow
            key={rule.id}
            rule={rule}
            isCopying={isCopying}
            onCopy={onCopy}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
};
