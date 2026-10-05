import { z } from 'zod';

import { validateJson } from '@/shared/lib';

export const editFileFormSchema = z
  .object({
    originalName: z
      .string()
      .trim()
      .min(1, 'Укажите имя файла')
      .max(255, 'Имя файла не длиннее 255 символов'),
    // null — содержимое не редактируется (PDF)
    content: z.string().nullable(),
  })
  .superRefine((values, ctx) => {
    if (values.content === null) {
      return;
    }

    const validation = validateJson(values.content, 'Укажите содержимое JSON');
    if (!validation.ok) {
      ctx.addIssue({
        code: 'custom',
        path: ['content'],
        message: validation.message,
      });
    }
  });

export type EditFileFormValues = z.infer<typeof editFileFormSchema>;

export const FILE_TYPE_LABELS: Record<string, string> = {
  'application/json': 'JSON',
  'application/pdf': 'PDF',
};

export const getFileTypeLabel = (mimeType: string): string =>
  FILE_TYPE_LABELS[mimeType] ?? mimeType;
