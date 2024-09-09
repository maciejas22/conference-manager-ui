'use client';

import { useState } from 'react';

import {
  getLocalTimeZone,
  now,
  toZoned,
  type ZonedDateTime,
} from '@internationalized/date';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { type z } from 'zod';

import { Card } from '@repo/shared/components';
import { Button, DateRangePicker, Input } from '@repo/shared/nextui';

import {
  agendaItemSchema,
  type ConferenceFormSchema,
} from '../types/form-schema';

type AgendaFormInputs = z.infer<typeof agendaItemSchema>;
type AgendaFormErrors = Partial<Record<keyof AgendaFormInputs, string[]>>;

export function AgendaForm() {
  const { control } = useFormContext<ConferenceFormSchema>();
  const { append } = useFieldArray({
    control,
    name: 'agenda',
  });
  const [event, setEvent] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [dateRange, setDateRange] = useState<{
    start: ZonedDateTime;
    end: ZonedDateTime;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<AgendaFormErrors>({});

  const resetErrors = () => {
    setFieldErrors({});
  };

  const resetInputs = () => {
    setEvent('');
    setSpeaker('');
    setDateRange(null);
  };

  const addAgendaItem = () => {
    const data = {
      event,
      speaker,
      dateRange: {
        startDate: dateRange?.start.toAbsoluteString(),
        endDate: dateRange?.end.toAbsoluteString(),
      },
    };
    const validationResult = agendaItemSchema.safeParse(data);

    switch (validationResult.success) {
      case true:
        resetErrors();
        resetInputs();
        append(validationResult.data);
        return;
      case false:
        setFieldErrors({
          ...validationResult.error.flatten().fieldErrors,
          dateRange: [
            ...new Set(validationResult.error.flatten().fieldErrors.dateRange),
          ],
        });
    }
  };

  return (
    <Card header="Agenda Informations">
      <Input
        name="eventName"
        label="Event name"
        value={event}
        onChange={(e) => {
          setEvent(e.target.value);
        }}
        isInvalid={Boolean(fieldErrors.event)}
        errorMessage={fieldErrors.event}
      />
      <Input
        label="Speaker"
        value={speaker}
        onChange={(e) => {
          setSpeaker(e.target.value);
        }}
        isInvalid={Boolean(fieldErrors.speaker)}
        errorMessage={fieldErrors.speaker}
      />
      <DateRangePicker
        label="Start Time"
        hideTimeZone
        granularity="minute"
        minValue={now(getLocalTimeZone())}
        errorMessage={fieldErrors.dateRange}
        isInvalid={
          Array.isArray(fieldErrors.dateRange) &&
          fieldErrors.dateRange.length > 0
        }
        value={dateRange}
        onChange={(value) => {
          setDateRange({
            start: toZoned(value.start, getLocalTimeZone()),
            end: toZoned(value.end, getLocalTimeZone()),
          });
        }}
      />
      <Button
        color="primary"
        variant="light"
        fullWidth
        onClick={() => {
          addAgendaItem();
        }}
      >
        Add agenda item to timeline
      </Button>
    </Card>
  );
}
