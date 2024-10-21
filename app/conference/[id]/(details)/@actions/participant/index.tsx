import { AssociatedParticipantActions } from './associated';
import { UnassociatedParticipantActions } from './new';

type ParticipantActionsProps = {
  conferenceId: number;
  isParticipant: boolean;
};

export function ParticipantActions({
  conferenceId,
  isParticipant,
}: ParticipantActionsProps) {
  return (
    <>
      {isParticipant ? (
        <AssociatedParticipantActions conferenceId={conferenceId} />
      ) : (
        <UnassociatedParticipantActions conferenceId={conferenceId} />
      )}
    </>
  );
}
