import { z } from 'zod';

export const updateProfileFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Укажите имя')
    .max(100, 'Максимум 100 символов'),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileFormSchema>;
