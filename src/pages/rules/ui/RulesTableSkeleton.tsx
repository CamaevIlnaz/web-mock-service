import { Box, Flex, Skeleton, Table } from '@chakra-ui/react';

import { RULES_TABLE_COLUMNS } from '../constants';

const SKELETON_ROWS = 5;

export const RulesTableSkeleton = () => {
  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {RULES_TABLE_COLUMNS.map((column) => (
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
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <Table.Row key={index}>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="16px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="20px" width="36px" borderRadius="full" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="16px" width="140px" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Flex align="center" gap="2">
                <Skeleton height="20px" width="48px" borderRadius="md" />
                <Skeleton height="14px" width="180px" />
              </Flex>
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Skeleton height="22px" width="72px" borderRadius="full" />
            </Table.Cell>
            <Table.Cell borderColor="border" py="4">
              <Box>
                <Skeleton height="18px" width="18px" />
              </Box>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
