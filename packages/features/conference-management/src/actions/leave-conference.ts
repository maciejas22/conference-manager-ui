'use server';

import { revalidatePath } from 'next/cache';

import { removeUserFromConference } from '#services/remove-user-from-conference';

export const leaveConferenceAction = async (
  conferenceId: string,
  formState: any,
  _formData: FormData,
) => {
  await removeUserFromConference(conferenceId);
  revalidatePath(`/conference/${conferenceId}`);
};
