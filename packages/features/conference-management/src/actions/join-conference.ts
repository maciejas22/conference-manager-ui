'use server';

import { revalidatePath } from 'next/cache';

import { addUserToConference } from '#services/add-user-to-conference';

export const joinConferenceAction = async (
  conferenceId: string,
  formState: any,
  _formData: FormData,
) => {
  await addUserToConference(conferenceId);
  revalidatePath(`/conference/${conferenceId}`);
};
