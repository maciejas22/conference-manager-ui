'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { addUserToConferenceMutation } from '#graphql/add-user-to-conference';
import { ResponseStatus, type ServerResponse } from '#types/response';

export const joinConferenceAction = (
  conferenceId: string,
): Promise<ServerResponse> =>
  serverFetcher({
    document: addUserToConferenceMutation,
    variables: { conferenceId },
  })
    .then(() => ({
      status: ResponseStatus.Success,
      message: 'Successfully joined conference',
    }))
    .catch(() => ({
      status: ResponseStatus.Error,
      message: 'Failed to join conference',
    }));
