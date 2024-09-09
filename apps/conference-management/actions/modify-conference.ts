'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { modifyConferenceSchema } from '@/components/conference-form/types/actions-schema';
import {
  modifyConferenceQuery,
  type ModifyConferenceInput,
} from '@/graphql/modify-conference';
import { ResponseStatus, type ServerResponse } from '@/types/response';

type SuccessResponse = ServerResponse & {
  status: ResponseStatus.Success;
  conferenceId: string;
};

type ErrorResponse = ServerResponse & {
  status: ResponseStatus.Error;
};

type ModifyConferenceResponse = SuccessResponse | ErrorResponse;

export const modifyConferenceAction = async (
  formData: FormData,
): Promise<ModifyConferenceResponse> => {
  const modifyConferenceInput = modifyConferenceSchema.parse(formData);

  const uploadFiles = modifyConferenceInput.attachments
    .filter((file) => 'base64Content' in file)
    .map((file) => ({
      uploadFile: file,
    }));
  const deleteFiles = modifyConferenceInput.attachments
    .filter((file) => 'id' in file)
    .map((file) => ({
      deleteFile: { id: file.id },
    }));
  const inputFiles = [...uploadFiles, ...deleteFiles];

  const inputAgenda = modifyConferenceInput.agenda.map((item) => ({
    id: item.id,
    event: item.event,
    speaker: item.speaker,
    startTime: item.startDate,
    endTime: item.endDate,
    _destroy: item._destroy,
  }));

  const input: ModifyConferenceInput = {
    id: modifyConferenceInput.id,
    title: modifyConferenceInput.title,
    acronym: modifyConferenceInput.acronym,
    location: modifyConferenceInput.location,
    startDate: modifyConferenceInput.startDate,
    endDate: modifyConferenceInput.endDate,
    website: modifyConferenceInput.website,
    additionalInfo: modifyConferenceInput.additionalInfo,
    agenda: inputAgenda,
    files: inputFiles,
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
