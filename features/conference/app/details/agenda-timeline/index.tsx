import { parseAbsoluteToLocal } from '@internationalized/date';

import { TimeLine } from '@/features/conference/components/timeline';
import { FragmentOf, readFragment } from '@/libs/graphql';

import { conferenceAgendaFragment } from './conference-agenda-fragment';

type AgendaTmelineProps = {
  data: FragmentOf<typeof conferenceAgendaFragment>;
};

async function AgendaTimeline({ data }: AgendaTmelineProps) {
  const { agenda } = readFragment(conferenceAgendaFragment, data);

  return (
    <TimeLine
      mode="display"
      events={agenda.map((event) => ({
        title: event.speaker,
        description: event.event,
        date: parseAbsoluteToLocal(event.startTime),
      }))}
    />
  );
}

export { AgendaTimeline, conferenceAgendaFragment };
