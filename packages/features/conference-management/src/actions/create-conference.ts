'use server';

import { serverFetcher } from '@repo/shared/server-fetcher';

import {
  createConferenceMutation,
  type CreateConferenceInput,
} from '#graphql/create-conference';
import { ResponseStatus, type ServerResponse } from '#types/response';

type SuccessResponse = ServerResponse & {
  status: ResponseStatus.Success;
  conferenceId: string;
};

type ErrorResponse = ServerResponse & {
  status: ResponseStatus.Error;
};

type CreateConferenceResponse = SuccessResponse | ErrorResponse;

export const createConferenceAction = async (
  createConferenceInput: CreateConferenceInput,
): Promise<CreateConferenceResponse> => {
  const agenda = createConferenceInput.agenda ?? [];

  const input: CreateConferenceInput = {
    title: createConferenceInput.title,
    acronym: createConferenceInput.acronym,
    location: createConferenceInput.location,
    startDate: createConferenceInput.startDate,
    endDate: createConferenceInput.endDate,
    website: createConferenceInput.website,
    additionalInfo: createConferenceInput.additionalInfo,
    agenda: agenda.map((item) => ({
      event: item.event,
      speaker: item.speaker,
      startTime: item.startTime,
      endTime: item.endTime,
    })),
  };

  return serverFetcher({
    document: createConferenceMutation,
    variables: { createConferenceInput: input },
  })
    .then((responseData) => {
      return {
        conferenceId: responseData.createConference.id,
        status: ResponseStatus.Success,
        message: 'Conference created successfully',
      };
    })
    .catch(() => {
      return {
        status: ResponseStatus.Error,
        message: 'Failed to create conference',
      };
    });
};
