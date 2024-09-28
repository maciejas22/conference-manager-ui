import { graphql, VariablesOf } from '@/libs/graphql';
import { FormStatus, ServerResponse } from '@/types/response';

export const createConferenceMutation = graphql(`
  mutation CreateConference($createConferenceInput: CreateConferenceInput!) {
    createConference(createConferenceInput: $createConferenceInput)
  }
`);

type SuccessResponse = ServerResponse & {
  status: FormStatus.Success;
  conferenceId: string;
};

type ErrorResponse = ServerResponse & {
  status: FormStatus.Error;
};

export type CreateConferenceResponse = SuccessResponse | ErrorResponse;

export type CreateConferenceInput = VariablesOf<
  typeof createConferenceMutation
>['createConferenceInput'];

export type CreateConferenceInputAgenda = NonNullable<
  CreateConferenceInput['agenda']
>[number];

export type CreateConferenceInputFile = NonNullable<
  CreateConferenceInput['files']
>[number];
