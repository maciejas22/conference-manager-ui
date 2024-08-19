import { graphql, type VariablesOf } from '@repo/shared/graphql';

export const createConferenceMutation = graphql(`
  mutation CreateConference($createConferenceInput: CreateConferenceInput!) {
    createConference(createConferenceInput: $createConferenceInput) {
      id
    }
  }
`);

export type CreateConferenceInput = VariablesOf<
  typeof createConferenceMutation
>['createConferenceInput'];

export type CreateConferenceInputAgenda = NonNullable<
  CreateConferenceInput['agenda']
>[number];

export type CreateConferenceInputFile = NonNullable<
  CreateConferenceInput['files']
>[number];
