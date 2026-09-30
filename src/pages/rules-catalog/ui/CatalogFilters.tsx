import {
  Box,
  Flex,
  Input,
  InputGroup,
  NativeSelect,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';

import { METHOD_FILTER_OPTIONS } from '../constants';
import type { CatalogFiltersProps } from '../types';

export const CatalogFilters = ({
  search,
  method,
  onSearchChange,
  onMethodChange,
}: CatalogFiltersProps) => {
  return (
    <Flex
      align="center"
      gap="4"
      px="6"
      py="4"
      borderBottomWidth="1px"
      borderColor="border"
      flexWrap="wrap"
    >
      <InputGroup
        flex="1"
        minW="200px"
        startElement={
          <Box color="muted" display="flex" alignItems="center">
            <Search size={16} strokeWidth={1.75} />
          </Box>
        }
      >
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Поиск"
          size="sm"
          bg="panel"
          borderColor="border"
          color="text"
        />
      </InputGroup>

      <NativeSelect.Root size="sm" width="160px">
        <NativeSelect.Field
          value={method}
          onChange={(event) => onMethodChange(event.target.value)}
          cursor="pointer"
          bg="panel"
          borderColor="border"
          color="text"
        >
          {METHOD_FILTER_OPTIONS.map((option) => (
            <option key={option.value || 'all'} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  );
};
