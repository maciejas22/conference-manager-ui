import { graphql } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const getAssociatedConferencesQuery = graphql(`
  query GetAssociatedConferences {
    associatedConferences {
      id
      title
      date
      location
      participantsCount
    }
  }
`);

export const getAssociatedConferences = () => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getAssociatedConferencesQuery);
};
