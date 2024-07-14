'use server';

import { revalidatePath } from 'next/cache';

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
) => {
  await addUserToConference(conferenceId);
  revalidatePath(`/conference/${conferenceId}`);
};
