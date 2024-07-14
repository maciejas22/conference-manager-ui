import { Icon } from '@iconify/react';

import { Header } from '@repo/components';
import { getFormattedDate } from '@repo/utils';

import { TimeLine } from '#components/timeline/index';
import { getAgenda } from '#services/get-agenda';
import { getConference } from '#services/get-conference';

import { UserActions } from './user-actions';

export async function ConferencePage({ params }: { params: { id: string } }) {
  const conferenceData = await getConference(params.id);
  const agendaData = await getAgenda(params.id);
  const conference = conferenceData.conference;
  const agenda = agendaData.conference?.agenda;

  if (!conference || !agenda) {
    return null;
  }

  return (
    <div className="cm-space-y-4">
      <div className="cm-space-y-4">
        <div className="cm-flex cm-items-center cm-justify-between">
          <Header>{conference.title}</Header>
          <UserActions conferenceId={params.id} />
        </div>
        <p className="cm-my-2">{conference.additionalInfo}</p>
        <div className="cm-flex cm-space-x-1">
          <Icon icon="ri:user-line" className="cm-h-6" />
          <h2>
            <span className="cm-font-semibold">Participants:</span>{' '}
            {conference.participantsCount}
            {conference.participantsLimit
              ? `/${conference.participantsLimit.toString()}`
              : null}
          </h2>
        </div>
        <div className="cm-flex cm-space-x-1">
          <Icon icon="ri:map-pin-line" className="cm-h-6" />
          <h2>
            <span className="font-semibold">Location:</span>{' '}
            {conference.location}
          </h2>
        </div>
        <div className="cm-flex cm-space-x-1">
          <Icon icon="ri:time-line" className="cm-h-6" />
          <h2>
            <span className="font-semibold">Date:</span>{' '}
            {getFormattedDate(conference.date)}
          </h2>
        </div>
        <div className="cm-flex">
          <Icon icon="ri:bar-chart-fill" className="cm-h-6" />
          <h2 className="cm-font-semibold">Agenda: </h2>
        </div>
      </div>
      <TimeLine
        mode="display"
        events={agenda.map((event) => ({
          id: event.id,
          title: event.speaker,
          description: event.event,
          date: event.startTime,
        }))}
      />
    </div>
  );
}
