import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

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

export const getAgenda = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getAgendaQuery, { id });
};
