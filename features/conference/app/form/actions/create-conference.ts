'use server';

import { FormStatus } from '@/types/response';
import { serverFetcher } from '@/utils/server-fetcher';

import {
  CreateConferenceInput,
  createConferenceMutation,
  CreateConferenceResponse,
} from '../graphql/create-conference';

export const createConferenceAction = async (
  input: CreateConferenceInput,
): Promise<CreateConferenceResponse> => {
  return serverFetcher({
    document: createConferenceMutation,
    variables: { createConferenceInput: input },
  })
    .then((responseData) => {
      return {
        conferenceId: responseData.createConference?.toString() ?? '',
        status: FormStatus.Success,
        message: 'Conference created successfully',
      };
    })
    .catch(() => {
      return {
        status: FormStatus.Error,
        message: 'Failed to create conference',
      };
    });
};
