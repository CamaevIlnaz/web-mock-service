import { Flex, IconButton, Table, Text } from '@chakra-ui/react';
import { Pencil, Trash2 } from 'lucide-react';

import { STANDS_TABLE_COLUMNS } from '../constants';
import type { StandsTableProps } from '../types';

export const StandsTable = ({ stands, onEdit, onDelete }: StandsTableProps) => {
  if (stands.length === 0) {
    return (
      <Text color="muted" fontSize="sm" py="8" px="6">
        Удалённых серверов пока нет
      </Text>
    );
  }

  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {STANDS_TABLE_COLUMNS.map((column) => (
            <Table.ColumnHeader
              key={column.id}
              color="muted"
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.04em"
              borderColor="border"
              w={column.width}
              textAlign={column.id === 'actions' ? 'right' : 'start'}
            >
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stands.map((stand) => (
          <Table.Row key={stand.id}>
            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Text fontSize="sm" fontWeight="semibold" color="heading">
                {stand.code}
              </Text>
            </Table.Cell>
            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Text fontSize="sm" color="text">
                {stand.name}
              </Text>
            </Table.Cell>
            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Text fontSize="sm" color="text">
                {stand.domain}
              </Text>
            </Table.Cell>
            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Text fontSize="sm" color="text" fontFamily="mono">
                {stand.basePath}
              </Text>
            </Table.Cell>
            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Flex justify="flex-end" gap="1">
                <IconButton
                  aria-label="Редактировать стенд"
                  variant="ghost"
                  size="sm"
                  color="muted"
                  onClick={() => onEdit(stand)}
                >
                  <Pencil size={16} strokeWidth={1.75} />
                </IconButton>
                <IconButton
                  aria-label="Удалить стенд"
                  variant="ghost"
                  size="sm"
                  color="muted"
                  onClick={() => onDelete(stand)}
                >
                  <Trash2 size={16} strokeWidth={1.75} />
                </IconButton>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
