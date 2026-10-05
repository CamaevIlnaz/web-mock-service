import { Flex, IconButton, Table, Text } from '@chakra-ui/react';
import { Download, Trash2 } from 'lucide-react';

import { FILES_TABLE_COLUMNS } from '../constants';
import { formatCreatedAt, formatFileSize } from '../lib';
import type { FilesTableProps } from '../types';

export const FilesTable = ({
  files,
  selectedFileId = null,
  onSelect,
  onDownload,
  onDelete,
}: FilesTableProps) => {
  if (files.length === 0) {
    return (
      <Text color="muted" fontSize="sm" py="8" px="6">
        Файлов пока нет
      </Text>
    );
  }

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
        {files.map((file) => (
          <Table.Row
            key={file.id}
            bg={selectedFileId === file.id ? 'brandSoft' : undefined}
            cursor="pointer"
            onClick={() => onSelect(file)}
            _hover={selectedFileId === file.id ? undefined : { bg: 'panelAlt' }}
          >
            <Table.Cell
              borderColor="border"
              py="4"
              pl="6"
              verticalAlign="middle"
            >
              <Text fontWeight="semibold" color="heading" fontSize="sm">
                {file.originalName}
              </Text>
            </Table.Cell>

            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Text fontSize="sm" color="text">
                {file.mimeType}
              </Text>
            </Table.Cell>

            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Text fontSize="sm" color="text">
                {formatFileSize(file.sizeBytes)}
              </Text>
            </Table.Cell>

            <Table.Cell borderColor="border" py="4" verticalAlign="middle">
              <Text fontSize="sm" color="text">
                {formatCreatedAt(file.createdAt)}
              </Text>
            </Table.Cell>

            <Table.Cell
              borderColor="border"
              py="4"
              pr="6"
              verticalAlign="middle"
            >
              <Flex align="center" justify="flex-end" gap="1">
                <IconButton
                  aria-label="Скачать"
                  variant="ghost"
                  size="xs"
                  color="muted"
                  cursor="pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDownload(file);
                  }}
                >
                  <Download size={16} strokeWidth={1.75} />
                </IconButton>
                <IconButton
                  aria-label="Удалить"
                  variant="ghost"
                  size="xs"
                  color="muted"
                  cursor="pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(file);
                  }}
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
