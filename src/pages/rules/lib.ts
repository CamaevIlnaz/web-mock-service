import type { MockRuleResponseDto } from '@/entities/mock-rule';
import { MockRuleResponseDtoResponseType } from '@/shared/api/generated/model';

export const getResponseLabel = (rule: MockRuleResponseDto): string => {
  if (rule.responseType === MockRuleResponseDtoResponseType.FILE) {
    return rule.responseFile?.originalName ?? 'Файл';
  }

  return 'JSON';
};

export const getMethodBadgeStyles = (
  method: MockRuleResponseDto['method'],
): { bg: string; color: string } => {
  switch (method) {
    case 'GET':
      return { bg: 'green.100', color: 'green.800' };
    case 'POST':
      return { bg: 'blue.100', color: 'blue.800' };
    case 'PUT':
      return { bg: 'orange.100', color: 'orange.800' };
    case 'PATCH':
      return { bg: 'yellow.100', color: 'yellow.800' };
    case 'DELETE':
      return { bg: 'red.100', color: 'red.800' };
    default:
      return { bg: 'panelAlt', color: 'text' };
  }
};
