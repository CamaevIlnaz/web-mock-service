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
