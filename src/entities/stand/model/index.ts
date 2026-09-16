import {
  createStandFx,
  fetchStandFx,
  fetchStandsFx,
  removeStandFx,
  updateStandFx,
} from './effects';
import {
  $isStandsLoading,
  $stand,
  $stands,
  $standsError,
  standCreated,
  standRemoved,
  standRequested,
  standsRequested,
  standUpdated,
} from './stores';

export const standModel = {
  $stands,
  $stand,
  $isStandsLoading,
  $standsError,
  standsRequested,
  standRequested,
  standCreated,
  standUpdated,
  standRemoved,
  fetchStandsFx,
  fetchStandFx,
  createStandFx,
  updateStandFx,
  removeStandFx,
};

export type {
  CreateStandDto,
  StandResponseDto,
  UpdateStandDto,
  UpdateStandParams,
} from './types';
