import { getUser } from '@/actions/get-user';
import { Footer } from '@/components/footer';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

import { OrganizerActions } from './organizer';
import { ParticipantActions } from './participant';

const isUserAssociatedWithConferenceQuery = graphql(`
  query isUserAssociatedWithConference($conferenceId: ID!) {
    isUserAssociatedWithConference(conferenceId: $conferenceId)
  }
`);

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
