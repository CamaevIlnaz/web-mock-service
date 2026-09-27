import { Box, Flex, Skeleton, Table } from '@chakra-ui/react';

import { SERVERS_TABLE_COLUMNS } from '../constants';

const SKELETON_ROWS = 5;

export const ServersTableSkeleton = () => {
  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {SERVERS_TABLE_COLUMNS.map((column, index) => (
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
              <Box>
                <Skeleton height="16px" width="140px" mb="2" />
                <Skeleton height="12px" width="90px" />
              </Box>
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="36px" width="220px" borderRadius="md" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="36px" width="280px" borderRadius="md" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Flex align="center" gap="3">
                <Skeleton height="14px" width="80px" />
                <Skeleton height="20px" width="36px" borderRadius="full" />
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
