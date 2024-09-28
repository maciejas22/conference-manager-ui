'use server';

import { FormStatus } from '@/types/response';
import { serverFetcher } from '@/utils/server-fetcher';

import {
  ModifyConferenceInput,
  modifyConferenceMutation,
  ModifyConferenceResponse,
} from '../graphql/modify-conference';

export const modifyConferenceAction = async (
  input: ModifyConferenceInput,
): Promise<ModifyConferenceResponse> => {
  return serverFetcher({
    document: modifyConferenceMutation,
    variables: { input },
  })
    .then((responseData) => {
      return {
        conferenceId: responseData.modifyConference?.toString() ?? '',
        status: FormStatus.Success,
        message: 'Conference modified successfully',
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        status: FormStatus.Error,
        message: 'Failed to modify conference',
      };
    });
};
