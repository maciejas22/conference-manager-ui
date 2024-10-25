'use server';

import { revalidatePath } from 'next/cache';

import { graphql } from '@/libs/graphql';
import { FormStatus } from '@/types/response';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getConferencePaymentIntent = graphql(`
  mutation AddUserToConference($conferenceId: ID!) {
    addUserToConference(conferenceId: $conferenceId)
  }
`);

type JoinConferenceActionResponse = {
  status: FormStatus;
  message?: string;
  clientSecret?: string;
};

export const joinConferenceAction = (
  conferenceId: number,
): Promise<JoinConferenceActionResponse> =>
  serverFetcher({
    document: getConferencePaymentIntent,
    variables: { conferenceId },
  })
    .then(({ addUserToConference: clientSecret }) => {
      if (!clientSecret) {
        return {
          status: FormStatus.Success,
          message: 'Successfully joined conference',
        };
      }
      return {
        status: FormStatus.Success,
        data: { clientSecret },
      };
    })
    .catch((err) => {
      return {
        status: FormStatus.Error,
        message: err.response.errors.map((e: any) => e.message).toString(),
      };
    })
    .finally(() => {
      revalidatePath(`conference/${conferenceId}`);
    });
