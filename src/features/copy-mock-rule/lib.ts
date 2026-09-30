import type {
  CreateMockRuleDto,
  MockRuleResponseDto,
} from '@/entities/mock-rule';
import { CreateMockRuleDtoResponseType } from '@/shared/api/generated/model/createMockRuleDtoResponseType';

const COPY_SUFFIX_RE = / copy \d+$/;

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const buildCopyName = (
  name: string,
  existingNames: string[],
): string => {
  const baseName = name.replace(COPY_SUFFIX_RE, '');
  const pattern = new RegExp(`^${escapeRegExp(baseName)} copy (\\d+)$`);

  let max = 0;
  for (const existing of existingNames) {
    const match = existing.match(pattern);
    if (match) {
      max = Math.max(max, Number(match[1]));
    }
  }

  return `${baseName} copy ${max + 1}`;
};

export const toCreateDtoFromRule = (
  rule: MockRuleResponseDto,
  name: string,
): CreateMockRuleDto => {
  const dto: CreateMockRuleDto = {
    name,
    method: rule.method,
    urlMask: rule.urlMask,
    isEnabled: rule.isEnabled,
    statusCode: rule.statusCode,
    delayMs: rule.delayMs,
    responseType: rule.responseType,
  };

  if (
    rule.responseType === CreateMockRuleDtoResponseType.INLINE_JSON &&
    rule.responseBody != null
  ) {
    dto.responseBody = rule.responseBody;
  }

  if (
    rule.responseType === CreateMockRuleDtoResponseType.FILE &&
    rule.responseFileId != null
  ) {
    dto.responseFileId = Number(rule.responseFileId);
  }

  if (rule.responseHeaders != null) {
    dto.responseHeaders = rule.responseHeaders;
  }

  return dto;
};
