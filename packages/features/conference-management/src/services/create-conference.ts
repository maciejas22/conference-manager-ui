import { graphql, type VariablesOf } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const createConferenceQuery = graphql(`
  mutation CreateConference($createConferenceInput: CreateConferenceInput!) {
    createConference(createConferenceInput: $createConferenceInput) {
      id
    }
  }
`);

export type CreateConferenceInput = VariablesOf<
  typeof createConferenceQuery
>['createConferenceInput'];
export type CreateConferenceAgendaItem =
  CreateConferenceInput['agenda'][number];

export const createConference = async (vars: CreateConferenceInput) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(createConferenceQuery, {
    createConferenceInput: vars,
  });
};
