import { graphql } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

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
