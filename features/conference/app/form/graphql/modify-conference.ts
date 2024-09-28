import { graphql, type VariablesOf } from '@/libs/graphql';
import { FormStatus, ServerResponse } from '@/types/response';

export const modifyConferenceMutation = graphql(`
  mutation ModifyConference($input: ModifyConferenceInput!) {
    modifyConference(input: $input)
  }
`);

type SuccessResponse = ServerResponse & {
  status: FormStatus.Success;
  conferenceId: string;
};

type ErrorResponse = ServerResponse & {
  status: FormStatus.Error;
};

export type ModifyConferenceResponse = SuccessResponse | ErrorResponse;

export type ModifyConferenceInput = VariablesOf<
  typeof modifyConferenceMutation
>['input'];

export type ModifyConferenceInputAgendaItem = NonNullable<
  ModifyConferenceInput['agenda']
>[number];

export type ModifyConferenceInputFile = NonNullable<
  ModifyConferenceInput['files']
>[number];
