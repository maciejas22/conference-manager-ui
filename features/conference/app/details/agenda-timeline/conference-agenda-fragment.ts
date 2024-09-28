import { graphql } from '@/libs/graphql';

export const conferenceAgendaFragment = graphql(`
  fragment AgendaFragment on Conference {
    agenda {
      id
      startTime
      endTime
      event
      speaker
    }
  }
`);
