'use server';

import { revalidateTag } from 'next/cache';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { removeUserFromConferenceMutation } from '@/graphql/remove-user-from-conference';
import { ResponseStatus, type ServerResponse } from '@/types/response';

export const leaveConferenceAction = (
  conferenceId: string,
): Promise<ServerResponse> =>
  serverFetcher({
    document: removeUserFromConferenceMutation,
    variables: { conferenceId },
  })
    .then(() => ({
      status: ResponseStatus.Success,
      message: 'Successfully left conference',
    }))
    .catch(() => ({
      status: ResponseStatus.Error,
      message: 'Failed to leave conference',
    }))
    .finally(() => {
      revalidateTag(`/${conferenceId}`);
    });
