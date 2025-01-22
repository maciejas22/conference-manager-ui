'use server';

import { revalidatePath } from 'next/cache';

import { graphql } from '@/libs/graphql';
import { FormStatus, type ServerResponse } from '@/types/response';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const removeUserFromConferenceMutation = graphql(`
  mutation RemoveUserFromConference($conferenceId: ID!) {
    removeUserFromConference(conferenceId: $conferenceId)
  }
`);

export const leaveConferenceAction = async (
  conferenceId: number,
): Promise<ServerResponse> =>
  serverFetcher({
    document: removeUserFromConferenceMutation,
    variables: { conferenceId },
  })
    .then(() => ({
      status: FormStatus.Success,
      message: 'Successfully left conference',
    }))
    .catch(() => ({
      status: FormStatus.Error,
      message: 'Failed to leave conference',
    }))
    .finally(() => {
      revalidatePath(`/${conferenceId.toString()}`);
    });
