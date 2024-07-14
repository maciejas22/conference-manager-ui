import { Button, Link } from '@repo/libs/nextui';

import { isOrganizer as isOrganizerOfConference } from '#services/is-organizer';

interface OrganizerActionsProps {
  conferenceId: string;
}

export async function OrganizerActions({
  conferenceId,
}: OrganizerActionsProps) {
  const data = await isOrganizerOfConference(conferenceId);
  console.log(data);

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
