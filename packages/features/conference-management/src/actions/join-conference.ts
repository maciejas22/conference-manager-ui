'use server';

import { revalidatePath } from 'next/cache';

import { nanoid } from 'nanoid';

import { addUserToConference } from '#services/add-user-to-conference';

interface JoinConferenceFormState {
  message?: {
    id: string;
    text: string;
  };
}

export const joinConferenceAction = async (
  conferenceId: string,
  _formState: JoinConferenceFormState,
  _formData: FormData,
): Promise<JoinConferenceFormState> => {
  await addUserToConference(conferenceId).catch((error) => {
    console.error(error);
    return {
      message: {
        id: nanoid(),
        text: 'Failed to join conference',
      },
    };
  });

  revalidatePath(`/conference/${conferenceId}`);
  return {
    message: {
      id: nanoid(),
      text: 'Successfully joined conference',
    },
  };
};
