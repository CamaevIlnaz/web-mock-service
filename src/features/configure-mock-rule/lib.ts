import { z } from 'zod';

import type { MockRuleResponseDto } from '@/entities/mock-rule';
import { CreateMockRuleDtoMethod } from '@/shared/api/generated/model/createMockRuleDtoMethod';
import { CreateMockRuleDtoResponseType } from '@/shared/api/generated/model/createMockRuleDtoResponseType';

export const METHOD_OPTIONS = [
  { value: CreateMockRuleDtoMethod.GET, label: 'GET' },
  { value: CreateMockRuleDtoMethod.POST, label: 'POST' },
  { value: CreateMockRuleDtoMethod.PUT, label: 'PUT' },
  { value: CreateMockRuleDtoMethod.PATCH, label: 'PATCH' },
  { value: CreateMockRuleDtoMethod.DELETE, label: 'DELETE' },
] as const;

export const STATUS_CODE_OPTIONS = [
  { value: '200', label: '200 OK' },
  { value: '201', label: '201 Created' },
  { value: '204', label: '204 No Content' },
  { value: '301', label: '301 Moved Permanently' },
  { value: '302', label: '302 Found' },
  { value: '400', label: '400 Bad Request' },
  { value: '401', label: '401 Unauthorized' },
  { value: '403', label: '403 Forbidden' },
  { value: '404', label: '404 Not Found' },
  { value: '409', label: '409 Conflict' },
  { value: '422', label: '422 Unprocessable Entity' },
  { value: '500', label: '500 Internal Server Error' },
  { value: '502', label: '502 Bad Gateway' },
  { value: '503', label: '503 Service Unavailable' },
] as const;

const methodValues = Object.values(CreateMockRuleDtoMethod) as [
  string,
  ...string[],
];

const responseTypeValues = Object.values(CreateMockRuleDtoResponseType) as [
  string,
  ...string[],
];

export const configureRuleFormSchema = z
  .object({
    name: z.string().trim().min(1, 'Укажите название'),
    method: z.enum(methodValues, { message: 'Выберите метод' }),
    statusCode: z.string().min(1, 'Выберите HTTP-статус'),
    urlMask: z.string().trim().min(1, 'Укажите маску URL'),
    delayMs: z
      .string()
      .trim()
      .min(1, 'Укажите задержку')
      .refine((value) => /^\d+$/.test(value), 'Задержка должна быть числом')
      .refine((value) => Number(value) >= 0, 'Задержка не может быть отрицательной'),
    isEnabled: z.boolean(),
    responseType: z.enum(responseTypeValues),
    responseBody: z.string(),
    fileMode: z.enum(['existing', 'upload']),
    responseFileId: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.responseType === CreateMockRuleDtoResponseType.INLINE_JSON) {
      const trimmed = values.responseBody.trim();
      if (!trimmed) {
        ctx.addIssue({
          code: 'custom',
          path: ['responseBody'],
          message: 'Укажите JSON ответа',
        });
        return;
      }

      try {
        JSON.parse(trimmed);
      } catch {
        ctx.addIssue({
          code: 'custom',
          path: ['responseBody'],
          message: 'JSON некорректен',
        });
      }
      return;
    }

    if (values.fileMode === 'existing' && !values.responseFileId) {
      ctx.addIssue({
        code: 'custom',
        path: ['responseFileId'],
        message: 'Выберите файл',
      });
    }
  });

export type ConfigureRuleFormValues = z.infer<typeof configureRuleFormSchema>;

export const DEFAULT_FORM_VALUES: ConfigureRuleFormValues = {
  name: '',
  method: CreateMockRuleDtoMethod.GET,
  statusCode: '200',
  urlMask: '',
  delayMs: '0',
  isEnabled: true,
  responseType: CreateMockRuleDtoResponseType.INLINE_JSON,
  responseBody: '{\n  \n}',
  fileMode: 'existing',
  responseFileId: '',
};

const formatResponseBody = (
  body: MockRuleResponseDto['responseBody'],
): string => {
  if (body === undefined || body === null) {
    return '{\n  \n}';
  }

  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return '{\n  \n}';
  }
};

export const toFormValues = (
  rule: MockRuleResponseDto,
): ConfigureRuleFormValues => {
  const statusExists = STATUS_CODE_OPTIONS.some(
    (option) => option.value === String(rule.statusCode),
  );

  return {
    name: rule.name,
    method: rule.method,
    statusCode: statusExists ? String(rule.statusCode) : '200',
    urlMask: rule.urlMask,
    delayMs: String(rule.delayMs),
    isEnabled: rule.isEnabled,
    responseType: rule.responseType,
    responseBody: formatResponseBody(rule.responseBody),
    // По умолчанию «Выбрать существующий» (как в дизайне); если файлов нет —
    // панель переключит на upload.
    fileMode: 'existing',
    responseFileId:
      rule.responseFileId != null ? String(rule.responseFileId) : '',
  };
};

export type ConfigureRuleSubmitPayload = {
  values: ConfigureRuleFormValues;
  file: File | null;
  hasExistingFiles: boolean;
};
