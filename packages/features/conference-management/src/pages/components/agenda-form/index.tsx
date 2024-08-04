'use client';

import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import {
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
  type ZonedDateTime,
} from '@internationalized/date';
import { z } from 'zod';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DateRangePicker,
  Input,
} from '@repo/shared/nextui';

import { type AgendaItem } from '#types/agenda';

const agendaFormSchema = z.object({
  id: z.string().optional(),
  speaker: z.string().min(1, 'Speaker is required'),
  event: z.string().min(1, 'Event is required'),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
});

type AgendaFormInputs = z.infer<typeof agendaFormSchema>;

type AgendaFormErrors = Partial<Record<keyof AgendaFormInputs, string>>;

const initialAgendaFormValues: Partial<AgendaFormInputs> = {
  speaker: '',
  event: '',
};

interface AgendaFormProps {
  setAgendaItems: Dispatch<SetStateAction<AgendaItem[]>>;
}

export function AgendaForm({ setAgendaItems }: AgendaFormProps) {
  const [formValue, setFormValue] = useState(initialAgendaFormValues);
  const [errors, setErrors] = useState<AgendaFormErrors>({});
  const dateRange =
    formValue.startDateTime && formValue.endDateTime
      ? {
          start: parseAbsoluteToLocal(formValue.startDateTime),
          end: parseAbsoluteToLocal(formValue.endDateTime),
        }
      : null;

  const handleAgendaChange = useCallback(
    (name: string, value: string | ZonedDateTime) => {
      setFormValue((prevValues) => ({ ...prevValues, [name]: value }));
    },
    [],
  );

  const handleAddAgendaButton = useCallback(() => {
    const result = agendaFormSchema.safeParse(formValue);
    if (!result.success) {
      const validationErrors = result.error.flatten().fieldErrors;
      setErrors(
        Object.keys(validationErrors).reduce<AgendaFormErrors>(
          (acc, key) => ({
            ...acc,
            [key]: validationErrors[key as keyof AgendaFormErrors]?.[0],
          }),
          {},
        ),
      );
      return;
    }

    setErrors({});
    setFormValue(initialAgendaFormValues);
    const data = result.data;
    setAgendaItems((prev) => [
      ...prev,
      {
        id: data.id,
        event: data.event,
        speaker: data.speaker,
        startTime: data.startDateTime,
        endTime: data.endDateTime,
      },
    ]);
  }, [formValue, setAgendaItems]);

  return (
    <>
      {formValue.id ? (
        <input type="hidden" name="id" value={formValue.id} />
      ) : null}
      <Card>
        <CardHeader>Agenda Item</CardHeader>
        <CardBody className="cm-space-y-4">
          <Input
            label="Event name"
            value={formValue.event}
            name="event"
            isRequired
            onChange={(e) => {
              handleAgendaChange('event', e.target.value);
            }}
            isInvalid={Boolean(errors.event)}
            errorMessage={errors.event}
          />
          <Input
            label="Speaker"
            value={formValue.speaker}
            name="speaker"
            isRequired
            onChange={(e) => {
              handleAgendaChange('speaker', e.target.value);
            }}
            isInvalid={Boolean(errors.speaker)}
            errorMessage={errors.speaker}
          />
          <DateRangePicker
            label="Duration"
            hideTimeZone
            isRequired
            granularity="minute"
            minValue={now(getLocalTimeZone())}
            isInvalid={
              Boolean(errors.startDateTime) || Boolean(errors.endDateTime)
            }
            errorMessage={[
              ...(errors.startDateTime ? [errors.startDateTime] : []),
              ...(errors.endDateTime ? [errors.endDateTime] : []),
            ]}
            value={dateRange}
            onChange={(d) => {
              handleAgendaChange('startDateTime', d.start.toString());
              handleAgendaChange('endDateTime', d.end.toString());
            }}
          />
          <Button
            color="primary"
            variant="light"
            size="lg"
            fullWidth
            onClick={() => {
              handleAddAgendaButton();
            }}
          >
            Add agenda item to timeline
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
