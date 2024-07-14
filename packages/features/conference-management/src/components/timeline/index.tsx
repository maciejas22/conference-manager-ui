import { Icon } from '@iconify/react';

import { dayjs } from '@repo/libs/dayjs';
import { Button, Chip } from '@repo/libs/nextui';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  onDeleteClick?: () => void;
}

interface TimeLineProps {
  events: Event[];
  mode: 'display' | 'edit';
}

function TimeLine({ events, mode }: TimeLineProps) {
  const sortedEvents = events.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

  return sortedEvents.length < 1 ? (
    <h2>No agenda found</h2>
  ) : (
    <ul className="cm-space-y-6">
      {events.map((event, eventIdx) => (
        <li key={event.id} className="cm-flex cm-space-x-4">
          <div className="relative">
            {/*TODO: Change to mono font*/}
            <Chip color="primary" className="cm-z-20">
              <time dateTime={event.date} className="cm-flex-none">
                {dayjs(event.date).format('DD/MM HH:mm')}
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
          <p className="cm-flex-auto cm-py-0.5">
            <span className="cm-text-primary">{event.title}: </span>
            {event.description}
          </p>
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
