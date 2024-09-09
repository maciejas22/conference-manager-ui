'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { createConferenceSchema } from '@/components/conference-form/types/actions-schema';
import {
  createConferenceMutation,
  type CreateConferenceInput,
} from '@/graphql/create-conference';
import { ResponseStatus, type ServerResponse } from '@/types/response';

type SuccessResponse = ServerResponse & {
  status: ResponseStatus.Success;
  conferenceId: string;
};

type ErrorResponse = ServerResponse & {
  status: ResponseStatus.Error;
};

type CreateConferenceResponse = SuccessResponse | ErrorResponse;

export const createConferenceAction = async (
  formData: FormData,
): Promise<CreateConferenceResponse> => {
  const createConferenceInput = createConferenceSchema.parse(formData);

  const inputFiles = createConferenceInput.attachments.map((file) => ({
    uploadFile: {
      fileName: file.fileName,
      base64Content: file.base64Content,
    },
  }));

  const inputAgenda = createConferenceInput.agenda.map((item) => ({
    event: item.event,
    speaker: item.speaker,
    startTime: item.startDate,
    endTime: item.endDate,
  }));

  const input: CreateConferenceInput = {
    title: createConferenceInput.title,
    acronym: createConferenceInput.acronym,
    location: createConferenceInput.location,
    startDate: createConferenceInput.startDate,
    endDate: createConferenceInput.endDate,
    website: createConferenceInput.website,
    additionalInfo: createConferenceInput.additionalInfo,
    agenda: inputAgenda,
    files: inputFiles,
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
