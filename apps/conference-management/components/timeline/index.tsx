import { Icon } from '@iconify/react';
import { type ZonedDateTime } from '@internationalized/date';

import { Button, Chip } from '@repo/shared/nextui';
import { getFormattedDateTime } from '@repo/shared/utils/formatters/date-formatter/index';

type Event = {
  title: string;
  description: string;
  date: ZonedDateTime;
  onDeleteClick?: () => void;
};

type TimeLineProps = {
  events: Event[];
  mode: 'display' | 'edit';
};

function TimeLine({ events, mode }: TimeLineProps) {
  const sortedEvents = events.sort((a, b) => a.date.compare(b.date));

  return sortedEvents.length < 1 ? (
    <h2>No agenda found</h2>
  ) : (
    <ul className="space-y-6">
      {events.map((event, eventIdx) => (
        <li
          key={event.title + event.description + event.date.toAbsoluteString()}
          className="flex space-x-4"
        >
          <div className="relative">
            <Chip color="primary" className="z-20">
              <time dateTime={event.date.toString()} className="flex-none">
                {getFormattedDateTime(event.date)}
              </time>
            </Chip>
            {eventIdx !== events.length - 1 ? (
              <span
                style={{
                  height: `calc(100% + 16px)`,
                }}
                className="absolute left-1/2 top-4 mx-auto w-px bg-primary"
                aria-hidden="true"
              />
            ) : null}
          </div>
          <div className="flex-auto py-0.5">
            <p>{event.title}</p>
            <p className="text-gray-400">{event.description}</p>
          </div>
          {mode === 'edit' && (
            <Button
              isIconOnly
              color="danger"
              onClick={() => {
                if (event.onDeleteClick) {
                  event.onDeleteClick();
                }
              }}
              aria-label={`Delete ${event.title}`}
            >
              <Icon icon="ri:close-fill" className="h-6" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}

export { TimeLine };
