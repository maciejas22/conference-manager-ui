import { graphql, type VariablesOf } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const modifyConferenceQuery = graphql(`
  mutation ModifyConference($input: ModifyConferenceInput!) {
    modifyConference(input: $input) {
      id
    }
  }
`);

export type ModifyConferenceInput = VariablesOf<
  typeof modifyConferenceQuery
>['input'];
export type ModifyConferenceAgendaItem = NonNullable<
  ModifyConferenceInput['agenda']
>[number];

export type ModifyConferenceInputFile = NonNullable<
  ModifyConferenceInput['files']
>[number];

export const modifyConference = (vars: ModifyConferenceInput) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(modifyConferenceQuery, { input: vars });
};
