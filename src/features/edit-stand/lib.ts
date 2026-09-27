import type { StandFormValues, StandResponseDto } from '@/entities/stand';

export type { StandFormValues };

export const toStandFormValues = (
  stand: StandResponseDto,
): StandFormValues => ({
  code: stand.code,
  name: stand.name,
  domain: stand.domain,
  basePath: stand.basePath,
});

export const EDIT_STAND_DEFAULT_VALUES: StandFormValues = {
  code: '',
  name: '',
  domain: '',
  basePath: '/',
};
