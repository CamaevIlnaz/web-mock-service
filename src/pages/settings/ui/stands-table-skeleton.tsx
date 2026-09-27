import { Flex, Skeleton, Table } from '@chakra-ui/react';

import { STANDS_TABLE_COLUMNS } from '../constants';

const SKELETON_ROWS = 5;

export const StandsTableSkeleton = () => {
  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {STANDS_TABLE_COLUMNS.map((column, index) => (
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
              <Skeleton height="16px" width="72px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="120px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="180px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="64px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Flex justify="flex-end" gap="1">
                <Skeleton height="28px" width="28px" borderRadius="md" />
                <Skeleton height="28px" width="28px" borderRadius="md" />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
