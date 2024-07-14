import { getUser } from '#services/get-user';

import { OrganizerActions } from './organizer-actions';
import { ParticipantActions } from './participant-actions';

interface ConferenceActionsProps {
  conferenceId: string;
}

export async function UserActions({ conferenceId }: ConferenceActionsProps) {
  const data = await getUser();
  const user = data.user;

  if (!user) {
    return null;
  }

  return (
    <>
      {user.role === 'Participant' && (
        <ParticipantActions conferenceId={conferenceId} />
      )}
      {user.role === 'Organizer' && (
        <OrganizerActions conferenceId={conferenceId} />
      )}
    </>
  );
}
