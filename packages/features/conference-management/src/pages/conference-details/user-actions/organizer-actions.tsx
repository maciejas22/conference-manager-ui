import { Button, Link } from '@repo/shared/nextui';

import { isOrganizer as isOrganizerOfConference } from '#services/is-organizer';

interface OrganizerActionsProps {
  conferenceId: string;
}

export async function OrganizerActions({
  conferenceId,
}: OrganizerActionsProps) {
  const data = await isOrganizerOfConference(conferenceId);

  return (
    data.isOrganizer && (
      <Button
        as={Link}
        href={`/conference/${conferenceId}/edit`}
        color="primary"
      >
        Edit conference
      </Button>
    )
  );
}
