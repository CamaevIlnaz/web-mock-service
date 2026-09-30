import type { CatalogMockRuleResponseDto } from '@/entities/mock-rule';

export interface CatalogFiltersProps {
  search: string;
  method: string;
  onSearchChange: (value: string) => void;
  onMethodChange: (value: string) => void;
}

export interface CatalogTableProps {
  rules: CatalogMockRuleResponseDto[];
  isCopying: boolean;
  onCopy: (rule: CatalogMockRuleResponseDto) => void;
}

export interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}
