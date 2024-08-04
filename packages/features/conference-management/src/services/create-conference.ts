import { graphql, type VariablesOf } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

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

export type CreateConferenceAgendaItem = NonNullable<
  CreateConferenceInput['agenda']
>[number];

export type CreateConferenceInputFile = NonNullable<
  CreateConferenceInput['files']
>[number];

export const createConference = async (vars: CreateConferenceInput) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(createConferenceQuery, {
    createConferenceInput: vars,
  });
};
