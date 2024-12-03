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
  status: FormStatus | 'paywall';
  message?: string;
  clientSecret?: string;
};

export const joinConferenceAction = async (
  conferenceId: number,
): Promise<JoinConferenceActionResponse> =>
  serverFetcher({
    document: getConferencePaymentIntent,
    variables: { conferenceId },
  })
    .then(({ addUserToConference: clientSecret }) => {
      if (!clientSecret) {
        revalidatePath(`conference/${conferenceId}`);
        return {
          status: FormStatus.Success,
          message: 'Successfully joined conference',
        };
      }

      return {
        status: 'paywall' as const,
        clientSecret,
      };
    })
    .catch((err) => {
      return {
        status: FormStatus.Error,
        message: err.response.errors.map((e: any) => e.message).toString(),
      };
    });
