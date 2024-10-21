import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

type OrganizerActionsProps = {
  conferenceId: number;
};

export function OrganizerActions({ conferenceId }: OrganizerActionsProps) {
  return (
    <Button
      as={Link}
      href={`/conference/${conferenceId.toString()}/edit`}
      color="primary"
    >
      Edit conference
    </Button>
  );
}
