import type { MockRuleResponseDto } from '@/entities/mock-rule';

export interface ServerOption {
  value: string;
  label: string;
}

export interface RulesFiltersProps {
  search: string;
  method: string;
  onlyEnabled: boolean;
  onSearchChange: (value: string) => void;
  onMethodChange: (value: string) => void;
  onOnlyEnabledChange: (value: boolean) => void;
}

export interface RulesTableProps {
  rules: MockRuleResponseDto[];
  onToggle: (id: number, isEnabled: boolean) => void;
  onDelete: (rule: MockRuleResponseDto) => void;
  onReorder: (orderedIds: number[]) => void;
}

export interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}
