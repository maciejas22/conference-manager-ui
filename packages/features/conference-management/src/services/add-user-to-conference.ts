import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

export const addUserToConferenceQuery = graphql(`
  mutation AddUserToConference($conferenceId: String!) {
    addUserToConference(conferenceId: $conferenceId) {
      id
    }
  }
`);

export const addUserToConference = (conferenceId: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(addUserToConferenceQuery, { conferenceId });
};
