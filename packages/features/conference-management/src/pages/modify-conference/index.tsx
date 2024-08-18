import { getAgenda } from '#actions/get-agenda';
import { getConference } from '#actions/get-conference';

import { ConferenceForm } from '../components/conference-form';

export async function ConferenceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const conference = await getConference(params.id);
  const agenda = await getAgenda(params.id);

  return (
    <ConferenceForm
      operation="edit"
      initialConferenceData={conference.conference}
      initialAgendaData={agenda.conference?.agenda}
      initialFiles={conference.conference?.files}
    />
  );
}
