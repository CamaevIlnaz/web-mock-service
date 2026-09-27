import {
  Box,
  Circle,
  Flex,
  IconButton,
  Input,
  InputGroup,
  NativeSelect,
  Switch,
  Table,
  Text,
} from '@chakra-ui/react';
import { Copy, ExternalLink, Trash2 } from 'lucide-react';

import type { ServersTableProps } from '../types';
import { formatRulesCount } from '../lib';
import { SERVERS_TABLE_COLUMNS } from '../constants';

export const ServersTable = ({
  servers,
  standOptions,
  onStandChange,
  onCopyCommand,
  onDelete,
}: ServersTableProps) => {
  if (servers.length === 0) {
    return (
      <Text color="muted" fontSize="sm" py="8">
        Серверов пока нет
      </Text>
    );
  }

  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {SERVERS_TABLE_COLUMNS.map((column) => (
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
        {servers.map((server) => (
          <Table.Row key={server.id}>
            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Box>
                <Text fontWeight="semibold" color="heading" fontSize="sm">
                  {server.name}
                </Text>
                <Text fontSize="sm" color="brand" mt="0.5">
                  {formatRulesCount(server.rulesCount)}
                </Text>
              </Box>
            </Table.Cell>

            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <NativeSelect.Root size="sm" width="100%" maxW="260px">
                <NativeSelect.Field
                  value={server.standCode}
                  onChange={(event) =>
                    onStandChange(server.id, event.target.value)
                  }
                  cursor="pointer"
                  bg="panel"
                  borderColor="border"
                  color="text"
                  fontSize="sm"
                >
                  {standOptions.length > 0 ? (
                    standOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  ) : (
                    <option value={server.standCode}>{server.standLabel}</option>
                  )}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Table.Cell>

            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <InputGroup
                endElement={
                  <IconButton
                    aria-label="Копировать команду"
                    variant="ghost"
                    size="xs"
                    color="muted"
                    cursor="pointer"
                    onClick={() => onCopyCommand(server.startCommand)}
                  >
                    <Copy size={16} strokeWidth={1.75} />
                  </IconButton>
                }
              >
                <Input
                  value={server.startCommand}
                  readOnly
                  size="sm"
                  bg="panelAlt"
                  borderColor="border"
                  color="text"
                  fontFamily="mono"
                  fontSize="xs"
                />
              </InputGroup>
            </Table.Cell>

            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Flex align="center" gap="3">
                <Flex align="center" gap="2" minW="100px">
                  <Circle size="8px" bg="green.500" />
                  <Text fontSize="sm" color="text">
                    Включены
                  </Text>
                </Flex>

                <Switch.Root checked colorPalette="blue" size="sm">
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Root>

                <IconButton
                  aria-label="Открыть"
                  variant="ghost"
                  size="xs"
                  color="muted"
                  pointerEvents="none"
                >
                  <ExternalLink size={16} strokeWidth={1.75} />
                </IconButton>

                <IconButton
                  aria-label="Удалить"
                  variant="ghost"
                  size="xs"
                  color="muted"
                  cursor="pointer"
                  onClick={() => onDelete(server.server)}
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
