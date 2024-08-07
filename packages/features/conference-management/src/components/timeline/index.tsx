import { Icon } from '@iconify/react';
import { type ZonedDateTime } from '@internationalized/date';

import { Button, Chip } from '@repo/shared/nextui';
import { formatter } from '@repo/shared/utils';

interface Event {
  title: string;
  description: string;
  date: ZonedDateTime;
  onDeleteClick?: () => void;
}

interface TimeLineProps {
  events: Event[];
  mode: 'display' | 'edit';
}

function TimeLine({ events, mode }: TimeLineProps) {
  const sortedEvents = events.sort((a, b) => a.date.compare(b.date));

  return sortedEvents.length < 1 ? (
    <h2>No agenda found</h2>
  ) : (
    <ul className="cm-space-y-6">
      {events.map((event, eventIdx) => (
        <li
          key={event.title + event.description + event.date.toAbsoluteString()}
          className="cm-flex cm-space-x-4"
        >
          <div className="relative">
            {/*TODO: Change to mono font*/}
            <Chip color="primary" className="cm-z-20">
              <time dateTime={event.date.toString()} className="cm-flex-none">
                {formatter.getFormattedDateTime(event.date)}
              </time>
            </Chip>
            {eventIdx !== events.length - 1 ? (
              <span
                style={{
                  height: `calc(100% + 16px)`,
                }}
                className="cm-absolute cm-left-1/2 cm-top-4 cm-mx-auto cm-w-px cm-bg-primary"
                aria-hidden="true"
              />
            ) : null}
          </div>
          <div className="cm-flex-auto cm-py-0.5">
            <p>{event.title}: </p>
            <p className="cm-text-gray-400">{event.description}</p>
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
              <Icon icon="ri:close-fill" className="cm-h-6" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}

export { TimeLine };
