import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import dayjs from "dayjs";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  onDeleteClick?: () => void;
}

interface TimeLineProps {
  events: Event[];
  mode: "display" | "edit";
}

function TimeLine({ events, mode }: TimeLineProps) {
  const sortedEvents = events.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

  return sortedEvents.length < 1 ? (
    <h2>No agenda found</h2>
  ) : (
    <>
      <ul role="list" className="space-y-6">
        {events.map((event, eventIdx) => (
          <li key={event.id} className="flex space-x-4">
            <div className="relative">
              {/*TODO: Change to mono font*/}
              <Chip color="primary" className="z-20">
                <time dateTime={event.date} className="flex-none">
                  {dayjs(event.date).format("DD/MM HH:mm")}
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
            <p className="flex-auto py-0.5">
              <span className="text-primary">{event.title}: </span>
              {event.description}
            </p>
            {mode === "edit" && (
              <Button
                isIconOnly
                color="danger"
                onClick={() => event?.onDeleteClick?.()}
                aria-label={`Delete ${event.title}`}
              >
                <XMarkIcon className="h-6" />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export { TimeLine };
