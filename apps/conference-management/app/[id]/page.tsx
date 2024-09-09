import { type Metadata } from 'next';

import { Icon, type IconifyIcon } from '@iconify/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

import { Header } from '@repo/shared/components';
import { Link } from '@repo/shared/nextui';
import { getFormattedDateTime } from '@repo/shared/utils/formatters/date-formatter/index';

import { getAgenda } from '@/actions/get-agenda';
import { getConference } from '@/actions/get-conference';
import { getUser } from '@/actions/get-user';
import { FileList } from '@/components/file-list/index';
import { TimeLine } from '@/components/timeline/index';
import { type Conference } from '@/graphql/get-conference';

import { UserActions } from './user-actions';

export const metadata: Metadata = {
  title: 'Conference Details | Conference Manager',
};

type Metric = {
  id: number;
  label: string;
  value: string;
  icon?: IconifyIcon | string;
  link?: boolean;
};

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
      value: `${getFormattedDateTime(parseAbsoluteToLocal(conference.startDate))} - ${getFormattedDateTime(parseAbsoluteToLocal(conference.endDate))}`,
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
      value: getFormattedDateTime(
        parseAbsoluteToLocal(conference.registrationDeadline),
      ),
      icon: 'ri:time-line',
    });
  }

  return metrics;
};

export default async function ConferencePage({
  params,
}: {
  params: { id: string };
}) {
  const userData = await getUser();
  const user = userData.user;

  const conferenceData = await getConference(params.id);
  const agendaData = await getAgenda(params.id);
  const conference = conferenceData.conference;
  const agenda = agendaData.conference?.agenda;

  if (!user || !conference || !agenda) {
    return null;
  }

  const metrics = getMetrics(conference);
  return (
    <>
      <div>
        <div className="grid gap-8 grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold">{conference.title}</h1>
            <p className="my-4 text-xl text-gray-400">{conference.acronym}</p>
            <p>{conference.additionalInfo}</p>
          </div>
          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex space-x-1">
                {metric.icon ? (
                  <Icon icon={metric.icon} className="h-6" />
                ) : null}
                <h2>
                  <p className="font-semibold text-lg">{metric.label}: </p>
                  {metric.link ? (
                    <Link isExternal href={metric.value}>
                      {metric.value}
                    </Link>
                  ) : (
                    <p>{metric.value}</p>
                  )}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <Header className="text-3xl">Agenda</Header>
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

        <div className="space-y-8">
          <Header className="text-3xl">Attachments</Header>
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
      <UserActions conferenceId={params.id} user={user} />
    </>
  );
}
