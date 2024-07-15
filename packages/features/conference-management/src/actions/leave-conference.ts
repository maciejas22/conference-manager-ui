'use server';

import { revalidatePath } from 'next/cache';

import { nanoid } from 'nanoid';

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
): Promise<LeaveConferenceFormState> => {
  await removeUserFromConference(conferenceId).catch((error) => {
    console.error(error);
    return {
      message: {
        id: nanoid(),
        text: 'Failed to leave conference',
      },
    };
  });

  revalidatePath(`/conference/${conferenceId}`);
  return {
    message: {
      id: nanoid(),
      text: 'Successfully left conference',
    },
  };
};
