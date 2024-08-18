import { graphql, type VariablesOf } from '@repo/shared/graphql';

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
export type ModifyConferenceInputAgendaItem = NonNullable<
  ModifyConferenceInput['agenda']
>[number];

export type ModifyConferenceInputFile = NonNullable<
  ModifyConferenceInput['files']
>[number];
