import { z } from 'zod';

export const registerFormSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Укажите имя'),
    login: z.string().trim().min(1, 'Укажите логин'),
    password: z.string().min(6, 'Минимум 6 символов'),
    confirmPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
