import { Header } from '@repo/shared/components';

import { getAgenda } from '#services/get-agenda';
import { getConference } from '#services/get-conference';

import { ConferenceForm } from '../components/conference-form';

export async function ConferenceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const conference = await getConference(params.id);
  const agenda = await getAgenda(params.id);

  return (
    <>
      <Header>Edit conference</Header>
      <ConferenceForm
        operation="edit"
        initialConferenceData={conference.conference}
        initialAgendaData={agenda.conference?.agenda}
        initialFiles={conference.conference?.files}
      />
    </>
  );
}
