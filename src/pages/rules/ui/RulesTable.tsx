import {
  Badge,
  Flex,
  IconButton,
  Switch,
  Table,
  Text,
} from '@chakra-ui/react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Copy, GripVertical, Trash2 } from 'lucide-react';

import type { MockRuleResponseDto } from '@/entities/mock-rule';

import { RULES_TABLE_COLUMNS } from '../constants';
import { getResponseLabel } from '../lib';
import type { RulesTableProps } from '../types';
import { MethodBadge } from './MethodBadge';

interface SortableRuleRowProps {
  rule: MockRuleResponseDto;
  isSelected: boolean;
  isCopying: boolean;
  onSelect: (rule: MockRuleResponseDto) => void;
  onToggle: (id: number, isEnabled: boolean) => void;
  onCopy: (rule: MockRuleResponseDto) => void;
  onDelete: (rule: MockRuleResponseDto) => void;
}

const SortableRuleRow = ({
  rule,
  isSelected,
  isCopying,
  onSelect,
  onToggle,
  onCopy,
  onDelete,
}: SortableRuleRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rule.id });

  const isDisabled = !rule.isEnabled;

  return (
    <Table.Row
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      opacity={isDragging ? 0.7 : 1}
      bg={isDragging || isSelected ? 'brandSoft' : undefined}
      zIndex={isDragging ? 1 : undefined}
      position="relative"
      cursor="pointer"
      onClick={() => onSelect(rule)}
      _hover={isSelected ? undefined : { bg: 'panelAlt' }}
    >
      <Table.Cell borderColor="border" py="3" verticalAlign="middle" w="40px">
        <IconButton
          aria-label="Перетащить"
          variant="ghost"
          size="xs"
          color="muted"
          cursor="grab"
          onClick={(event) => event.stopPropagation()}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} strokeWidth={1.75} />
        </IconButton>
      </Table.Cell>

      <Table.Cell
        borderColor="border"
        py="3"
        verticalAlign="middle"
        onClick={(event) => event.stopPropagation()}
      >
        <Switch.Root
          checked={rule.isEnabled}
          onCheckedChange={(details) => onToggle(rule.id, details.checked)}
          colorPalette="blue"
          size="sm"
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </Table.Cell>

      <Table.Cell borderColor="border" py="3" verticalAlign="middle">
        <Text
          fontWeight="semibold"
          fontSize="sm"
          color={isDisabled ? 'muted' : 'heading'}
        >
          {rule.name}
        </Text>
      </Table.Cell>

      <Table.Cell borderColor="border" py="3" verticalAlign="middle">
        <Flex align="center" gap="2" minW="0">
          <MethodBadge method={rule.method} />
          <Text
            fontSize="sm"
            fontFamily="mono"
            color={isDisabled ? 'muted' : 'text'}
            truncate
          >
            {rule.urlMask}
          </Text>
        </Flex>
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

      <Table.Cell
        borderColor="border"
        py="3"
        verticalAlign="middle"
        onClick={(event) => event.stopPropagation()}
      >
        <Flex align="center" gap="1">
          <IconButton
            aria-label="Копировать"
            variant="ghost"
            size="xs"
            color="muted"
            cursor="pointer"
            disabled={isCopying}
            onClick={() => onCopy(rule)}
          >
            <Copy size={16} strokeWidth={1.75} />
          </IconButton>
          <IconButton
            aria-label="Удалить"
            variant="ghost"
            size="xs"
            color="muted"
            cursor="pointer"
            onClick={() => onDelete(rule)}
          >
            <Trash2 size={16} strokeWidth={1.75} />
          </IconButton>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export const RulesTable = ({
  rules,
  selectedRuleId = null,
  isCopying = false,
  onSelect,
  onToggle,
  onCopy,
  onDelete,
  onReorder,
}: RulesTableProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = rules.findIndex((rule) => rule.id === active.id);
    const newIndex = rules.findIndex((rule) => rule.id === over.id);
    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    const reordered = arrayMove(rules, oldIndex, newIndex);
    onReorder(reordered.map((rule) => rule.id));
  };

  if (rules.length === 0) {
    return (
      <Text color="muted" fontSize="sm" px="6" py="8">
        Правил пока нет
      </Text>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={rules.map((rule) => rule.id)}
        strategy={verticalListSortingStrategy}
      >
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
            {rules.map((rule) => (
              <SortableRuleRow
                key={rule.id}
                rule={rule}
                isSelected={selectedRuleId === rule.id}
                isCopying={isCopying}
                onSelect={onSelect}
                onToggle={onToggle}
                onCopy={onCopy}
                onDelete={onDelete}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </SortableContext>
    </DndContext>
  );
};
