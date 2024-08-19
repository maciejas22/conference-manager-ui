import { Footer } from '@repo/shared/components';

import { isOrganizer } from '#actions/is-organizer';
import { isParticipant } from '#actions/is-participant';
import { type Role } from '#types/role';

import { OrganizerActions } from './organizer-actions';
import { ParticipantActions } from './participant-actions';

type ConferenceActionsProps = {
  conferenceId: string;
  user: {
    id: string;
    role: Role;
  };
};

export async function UserActions({
  conferenceId,
  user,
}: ConferenceActionsProps) {
  switch (user.role) {
    case 'Participant': {
      const isParticipantOfConference = await isParticipant(conferenceId);
      return (
        <Footer>
          <ParticipantActions
            conferenceId={conferenceId}
            isParticipant={isParticipantOfConference.isParticipant ?? false}
          />
        </Footer>
      );
    }
    case 'Organizer': {
      const isOrganizerOfConference = await isOrganizer(conferenceId);
      return (
        isOrganizerOfConference.isOrganizer && (
          <Footer>
            <OrganizerActions conferenceId={conferenceId} />
          </Footer>
        )
      );
    }
  }
}
