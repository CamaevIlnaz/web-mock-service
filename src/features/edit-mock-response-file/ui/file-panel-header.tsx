import { Badge, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { Copy, Download, Trash2 } from 'lucide-react';

import type { MockResponseFileMetaDto } from '@/entities/mock-response-file';
import { formatFileSize } from '@/shared/lib';

import { getFileTypeLabel } from '../lib';

interface FilePanelHeaderProps {
  file: MockResponseFileMetaDto;
  isDirty: boolean;
  isCopying: boolean;
  onDownload: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

export const FilePanelHeader = ({
  file,
  isDirty,
  isCopying,
  onDownload,
  onCopy,
  onDelete,
}: FilePanelHeaderProps) => (
  <Flex align="flex-start" justify="space-between" gap="3" mb="5">
    <Box minW="0">
      <Flex align="center" gap="2">
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="heading"
          truncate
          title={file.originalName}
        >
          {file.originalName}
        </Text>
        {isDirty ? (
          <Box
            w="2"
            h="2"
            borderRadius="full"
            bg="brand"
            flexShrink={0}
            title="Есть несохранённые изменения"
          />
        ) : null}
      </Flex>
      <Flex align="center" gap="2" mt="1.5">
        <Badge
          bg="brandSoft"
          color="brand"
          fontSize="xs"
          fontWeight="semibold"
          borderRadius="sm"
          px="2"
        >
          {getFileTypeLabel(file.mimeType)}
        </Badge>
        <Text fontSize="sm" color="muted">
          {formatFileSize(file.sizeBytes)}
        </Text>
      </Flex>
    </Box>

    <Flex gap="2" flexShrink={0}>
      <IconButton
        aria-label="Скачать"
        title="Скачать"
        variant="outline"
        size="sm"
        borderColor="border"
        color="text"
        cursor="pointer"
        onClick={onDownload}
      >
        <Download size={16} strokeWidth={1.75} />
      </IconButton>
      <IconButton
        aria-label="Создать копию"
        title="Создать копию"
        variant="outline"
        size="sm"
        borderColor="border"
        color="text"
        cursor="pointer"
        loading={isCopying}
        onClick={onCopy}
      >
        <Copy size={16} strokeWidth={1.75} />
      </IconButton>
      <IconButton
        aria-label="Удалить"
        title="Удалить"
        variant="outline"
        size="sm"
        borderColor="border"
        color="text"
        cursor="pointer"
        onClick={onDelete}
      >
        <Trash2 size={16} strokeWidth={1.75} />
      </IconButton>
    </Flex>
  </Flex>
);
