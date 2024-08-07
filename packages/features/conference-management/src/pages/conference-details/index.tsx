import { Icon, type IconifyIcon } from '@iconify/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

import { Header } from '@repo/shared/components';
import { Link } from '@repo/shared/nextui';
import { formatter } from '@repo/shared/utils';

import { FileList } from '#components/file-list/index';
import { TimeLine } from '#components/timeline/index';
import { getAgenda } from '#services/get-agenda';
import { getConference, type Conference } from '#services/get-conference';
import { getUser } from '#services/get-user';

import { ParticipantActions } from './user-actions/participant-actions';

interface Metric {
  id: number;
  label: string;
  value: string;
  icon?: IconifyIcon | string;
  link?: boolean;
}

const getMetrics = (conference: Conference): Metric[] => {
  const metrics: Metric[] = [
    {
      id: 1,
      label: 'Location',
      value: conference.location,
      icon: 'ri:map-pin-line',
    },
    {
      id: 2,
      label: 'Dates',
      value: `${formatter.getFormattedDateTime(parseAbsoluteToLocal(conference.startDate))} - ${formatter.getFormattedDateTime(parseAbsoluteToLocal(conference.endDate))}`,
      icon: 'ri:time-line',
    },
    {
      id: 4,
      label: 'Participants',
      value: `${conference.participantsCount.toString()}${
        conference.participantsLimit
          ? `/${conference.participantsLimit.toString()}`
          : ''
      }`,
      icon: 'ri:user-line',
    },
  ];
  if (conference.website) {
    metrics.push({
      id: 3,
      label: 'Website',
      value: conference.website,
      icon: 'ri:hashtag',
      link: true,
    });
  }
  if (conference.registrationDeadline) {
    metrics.push({
      id: 5,
      label: 'Registration Deadline',
      value: formatter.getFormattedDateTime(
        parseAbsoluteToLocal(conference.registrationDeadline),
      ),
      icon: 'ri:time-line',
    });
  }

  return metrics;
};

export async function ConferencePage({ params }: { params: { id: string } }) {
  const userData = await getUser();
  const user = userData.user;

  const conferenceData = await getConference(params.id);
  const agendaData = await getAgenda(params.id);
  const conference = conferenceData.conference;
  const agenda = agendaData.conference?.agenda;

  if (!conference || !agenda) {
    return null;
  }

  const metrics = getMetrics(conference);
  return (
    <div className="cm-m-12">
      <div className="cm-grid cm-gap-8 cm-grid-cols-2">
        <div>
          <h1 className="cm-text-4xl cm-font-bold ">{conference.title}</h1>
          <p className="cm-my-4 cm-text-xl cm-text-gray-400">
            {conference.acronym}
          </p>
          <p>{conference.additionalInfo}</p>
        </div>
        <div className="cm-space-y-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="cm-flex cm-space-x-1">
              {metric.icon ? (
                <Icon icon={metric.icon} className="cm-h-6" />
              ) : null}
              <h2>
                <p className="cm-font-semibold cm-text-lg">{metric.label}: </p>
                {metric.link ? (
                  <Link href={metric.value}>{metric.value}</Link>
                ) : (
                  <p>{metric.value}</p>
                )}
              </h2>
            </div>
          ))}
          {user?.role === 'Participant' && (
            <ParticipantActions conferenceId={conference.id} />
          )}
        </div>
      </div>

      <div className="cm-space-y-8">
        <Header className="cm-text-3xl">Agenda</Header>
        {agenda.length === 0 ? (
          <p>No agenda</p>
        ) : (
          <TimeLine
            mode="display"
            events={agenda.map((event) => ({
              title: event.speaker,
              description: event.event,
              date: parseAbsoluteToLocal(event.startTime),
            }))}
          />
        )}
      </div>

      <div className="cm-space-y-8">
        <Header className="cm-text-2xl">Attachments</Header>
        {conference.files.length === 0 ? (
          <p>No files uploaded</p>
        ) : (
          <FileList
            mode="view"
            attachments={conference.files.map((f) => ({ file: f }))}
          />
        )}
      </div>
    </div>
  );
}
