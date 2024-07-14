import { graphql } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const removeUserFromConferenceQuery = graphql(`
  mutation RemoveUserFromConference($conferenceId: String!) {
    removeUserFromConference(conferenceId: $conferenceId) {
      id
    }
  }
`);

export const removeUserFromConference = (conferenceId: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(removeUserFromConferenceQuery, { conferenceId });
};
