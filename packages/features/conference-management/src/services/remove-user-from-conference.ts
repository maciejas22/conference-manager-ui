import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

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
