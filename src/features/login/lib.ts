import { z } from 'zod';

export const loginFormSchema = z.object({
  login: z.string().trim().min(1, 'Укажите логин'),
  password: z.string().min(1, 'Укажите пароль'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
