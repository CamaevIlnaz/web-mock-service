import { z } from 'zod';

export const createServerFormSchema = z.object({
  name: z.string().trim().min(1, 'Укажите название'),
  standCode: z.string().min(1, 'Выберите удалённый сервер'),
});

export type CreateServerFormValues = z.infer<typeof createServerFormSchema>;
