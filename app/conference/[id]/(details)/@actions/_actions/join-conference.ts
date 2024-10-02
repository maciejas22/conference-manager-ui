'use server';

import { revalidatePath } from 'next/cache';

import { graphql } from '@/libs/graphql';
import { FormStatus, type ServerResponse } from '@/types/response';
import { serverFetcher } from '@/utils/server-fetcher';

const addUserToConferenceMutation = graphql(`
  mutation AddUserToConference($conferenceId: ID!) {
    addUserToConference(conferenceId: $conferenceId)
  }
`);

export const joinConferenceAction = (
  conferenceId: number,
): Promise<ServerResponse> =>
  serverFetcher({
    document: addUserToConferenceMutation,
    variables: { conferenceId },
  })
    .then(() => ({
      status: FormStatus.Success,
      message: 'Successfully joined conference',
    }))
    .catch((err) => {
      return {
        status: FormStatus.Error,
        message: err.response.errors.map((e: any) => e.message).toString(),
      };
    })
    .finally(() => {
      revalidatePath(`/${conferenceId.toString()}`);
    });
