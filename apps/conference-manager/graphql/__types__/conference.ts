import { type Conference as GqlConference } from './types';

type Conference = Omit<GqlConference, '__typename' | 'agenda'>;

export type { Conference };
