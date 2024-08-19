'use server';

import { serverFetcher } from '@repo/shared/server-fetcher';

import {
  modifyConferenceQuery,
  type ModifyConferenceInput,
} from '#graphql/modify-conference';
import { ResponseStatus, type ServerResponse } from '#types/response';

type SuccessResponse = ServerResponse & {
  status: ResponseStatus.Success;
  conferenceId: string;
};

type ErrorResponse = ServerResponse & {
  status: ResponseStatus.Error;
};

type ModifyConferenceResponse = SuccessResponse | ErrorResponse;

export const modifyConferenceAction = async (
  modifyConferenceInput: ModifyConferenceInput,
): Promise<ModifyConferenceResponse> => {
  const agenda = modifyConferenceInput.agenda ?? [];

  const input: ModifyConferenceInput = {
    id: modifyConferenceInput.id,
    title: modifyConferenceInput.title,
    acronym: modifyConferenceInput.acronym,
    location: modifyConferenceInput.location,
    startDate: modifyConferenceInput.startDate,
    endDate: modifyConferenceInput.endDate,
    website: modifyConferenceInput.website,
    additionalInfo: modifyConferenceInput.additionalInfo,
    agenda: agenda.map((item) => ({
      id: item.id,
      event: item.event,
      speaker: item.speaker,
      startTime: item.startTime,
      endTime: item.endTime,
      _destroy: item._destroy,
    })),
  };

  return serverFetcher({
    document: modifyConferenceQuery,
    variables: { input },
  })
    .then((responseData) => {
      return {
        conferenceId: responseData.modifyConference.id,
        status: ResponseStatus.Success,
        message: 'Conference modified successfully',
      };
    })
    .catch(() => {
      return {
        status: ResponseStatus.Error,
        message: 'Failed to create conference',
      };
    });
};
