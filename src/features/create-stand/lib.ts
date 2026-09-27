import type { StandFormValues } from '@/entities/stand';

export type { StandFormValues };

export const CREATE_STAND_DEFAULT_VALUES: StandFormValues = {
  code: '',
  name: '',
  domain: '',
  basePath: '/',
};
