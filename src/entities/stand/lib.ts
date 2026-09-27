import { z } from 'zod';

import type { StandResponseDto } from './model';

const hostFromDomain = (domain: string): string => {
  try {
    const url = domain.includes('://')
      ? new URL(domain)
      : new URL(`https://${domain}`);
    return url.host;
  } catch {
    return domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
};

export const formatStandLabel = (stand: StandResponseDto): string =>
  `${stand.name} · ${hostFromDomain(stand.domain)}`;

export const standFormSchema = z.object({
  code: z.string().trim().min(1, 'Укажите код'),
  name: z.string().trim().min(1, 'Укажите название'),
  domain: z.string().trim().min(1, 'Укажите domain'),
  basePath: z.string().trim().min(1, 'Укажите base path'),
});

export type StandFormValues = z.infer<typeof standFormSchema>;
