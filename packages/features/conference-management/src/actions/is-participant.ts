'use server';

import { isParticipant as isParticipantQuery } from '@/services/is-participant';

export const isParticipant = (id: string) => {
  return isParticipantQuery(id);
};
