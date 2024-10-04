import { getUser } from '@/actions/get-user';
import { Footer } from '@/components/footer';
import { serverFetcher } from '@/utils/server-fetcher';

import { isUserAssociatedWithConferenceQuery } from './_graphql/is-associated-with-conference';
import { OrganizerActions } from './organizer-actions';
import { ParticipantActions } from './participant-actions';

export default async function Actions({ params }: { params: { id: string } }) {
  const conferenceId = Number(params.id);
  const userData = await getUser();
  const user = userData.user;
  const { isUserAssociatedWithConference } = await serverFetcher({
    document: isUserAssociatedWithConferenceQuery,
    variables: { conferenceId },
  });

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'Participant': {
      return (
        <Footer>
          <ParticipantActions
            conferenceId={conferenceId}
            isParticipant={isUserAssociatedWithConference}
          />
        </Footer>
      );
    }
    case 'Organizer': {
      return (
        isUserAssociatedWithConference && (
          <Footer>
            <OrganizerActions conferenceId={conferenceId} />
          </Footer>
        )
      );
    }
  }
}
