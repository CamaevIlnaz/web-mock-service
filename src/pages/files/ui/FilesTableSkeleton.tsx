import { Flex, Skeleton, Table } from '@chakra-ui/react';

import { FILES_TABLE_COLUMNS } from '../constants';

const SKELETON_ROWS = 5;

export const FilesTableSkeleton = () => {
  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {FILES_TABLE_COLUMNS.map((column, index) => (
            <Table.ColumnHeader
              key={column.id}
              color="muted"
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.04em"
              borderColor="border"
              w={column.width}
              pl={index === 0 ? '6' : undefined}
              pr={column.id === 'actions' ? '6' : undefined}
            >
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <Table.Row key={index}>
            <Table.Cell borderColor="border" py="4" pl="6">
              <Skeleton height="16px" width="180px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="120px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="64px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="110px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4" pr="6">
              <Flex align="center" justify="flex-end" gap="2">
                <Skeleton height="18px" width="18px" />
                <Skeleton height="18px" width="18px" />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
