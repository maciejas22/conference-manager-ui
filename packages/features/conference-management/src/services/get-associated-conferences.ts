import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

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
