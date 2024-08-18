import { Button, Link } from '@repo/shared/nextui';

type OrganizerActionsProps = {
  conferenceId: string;
};

export function OrganizerActions({ conferenceId }: OrganizerActionsProps) {
  return (
    <Button as={Link} href={`/conference/${conferenceId}/edit`} color="primary">
      Edit conference
    </Button>
  );
}
