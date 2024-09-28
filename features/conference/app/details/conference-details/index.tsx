import { Icon, type IconifyIcon } from '@iconify/react';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Link } from '@nextui-org/link';

import { FragmentOf, readFragment } from '@/libs/graphql';
import { getFormattedDateTime } from '@/utils/formatters/date-formatter';

import { conferenceDetailsFragment } from './conference-details-fragment';

type ConferenceMetrics = {
  location: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
  participantsLimit?: number | null;
  website?: string | null;
  registrationDeadline?: string | null;
};

type Metric = {
  id: number;
  label: string;
  value: string;
  icon?: IconifyIcon | string;
  link?: boolean;
};

const getMetrics = (conferenceMetrics: ConferenceMetrics): Metric[] => {
  const metrics: Metric[] = [
    {
      id: 1,
      label: 'Location',
      value: conferenceMetrics.location,
      icon: 'ri:map-pin-line',
    },
    {
      id: 2,
      label: 'Dates',
      value: `${getFormattedDateTime(parseAbsoluteToLocal(conferenceMetrics.startDate))} - ${getFormattedDateTime(parseAbsoluteToLocal(conferenceMetrics.endDate))}`,
      icon: 'ri:time-line',
    },
    {
      id: 4,
      label: 'Participants',
      value: `${conferenceMetrics.participantsCount.toString()}${
        conferenceMetrics.participantsLimit
          ? `/${conferenceMetrics.participantsLimit.toString()}`
          : ''
      }`,
      icon: 'ri:user-line',
    },
  ];
  if (conferenceMetrics.website) {
    metrics.push({
      id: 3,
      label: 'Website',
      value: conferenceMetrics.website,
      icon: 'ri:hashtag',
      link: true,
    });
  }
  if (conferenceMetrics.registrationDeadline) {
    metrics.push({
      id: 5,
      label: 'Registration Deadline',
      value: getFormattedDateTime(
        parseAbsoluteToLocal(conferenceMetrics.registrationDeadline),
      ),
      icon: 'ri:time-line',
    });
  }

  return metrics;
};

type ConferenceDetailsProps = {
  data: FragmentOf<typeof conferenceDetailsFragment>;
};

async function ConferenceDetails({ data }: ConferenceDetailsProps) {
  const conferenceData = readFragment(conferenceDetailsFragment, data);

  const metrics = getMetrics(conferenceData);
  return (
    <div className="grid gap-8 grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">{conferenceData.title}</h1>
        <p className="my-4 text-xl text-gray-400">{conferenceData.acronym}</p>
        <p>{conferenceData.additionalInfo}</p>
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex space-x-1">
            {metric.icon ? <Icon icon={metric.icon} className="h-6" /> : null}
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
  );
}

export { ConferenceDetails, conferenceDetailsFragment };
