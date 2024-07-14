'use server';

import { revalidatePath } from 'next/cache';

import { removeUserFromConference } from '#services/remove-user-from-conference';

interface LeaveConferenceFormState {
  message?: {
    id: string;
    text: string;
  };
}

export const leaveConferenceAction = async (
  conferenceId: string,
  _formState: LeaveConferenceFormState,
  _formData: FormData,
) => {
  await removeUserFromConference(conferenceId);
  revalidatePath(`/conference/${conferenceId}`);
};
