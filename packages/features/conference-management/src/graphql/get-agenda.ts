import { graphql } from '@repo/shared/graphql';

export const getAgendaQuery = graphql(`
  query GetAgenda($id: ID!) {
    conference(id: $id) {
      id
      agenda {
        id
        startTime
        endTime
        event
        speaker
      }
    }
  }
`);
