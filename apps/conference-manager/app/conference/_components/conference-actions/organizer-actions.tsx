import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { isOrganizerOfConference } from "@/actions/user";

interface OrganizerActionsProps {
  conferenceId: string;
}

export default async function OrganizerActions({
  conferenceId,
}: OrganizerActionsProps) {
  const isOrganizer = await isOrganizerOfConference(conferenceId);

  return (
    isOrganizer && (
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
