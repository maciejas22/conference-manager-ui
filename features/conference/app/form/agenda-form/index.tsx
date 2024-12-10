'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  toZoned,
} from '@internationalized/date';
import { Button } from '@nextui-org/button';
import { DateRangePicker } from '@nextui-org/date-picker';
import { Input } from '@nextui-org/input';
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { type z } from 'zod';

import { Card } from '@/components/card';

import {
  agendaItemSchema,
  type ConferenceFormSchema,
} from '../types/form-schema';

type AgendaFormInputs = z.infer<typeof agendaItemSchema>;

export function AgendaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AgendaFormInputs>({
    resolver: zodResolver(agendaItemSchema),
    defaultValues: {
      dateRange: {},
    },
  });
  const { control: mainFormControl } = useFormContext<ConferenceFormSchema>();
  const { append } = useFieldArray({
    control: mainFormControl,
    name: 'agenda',
  });

  return (
    <Card header="Agenda Informations">
      <Input
        label="Event Name"
        errorMessage={errors.event?.message}
        isInvalid={Boolean(errors.event?.message)}
        {...register('event')}
      />
      <Input
        label="Speaker"
        errorMessage={errors.speaker?.message}
        isInvalid={Boolean(errors.speaker?.message)}
        {...register('speaker')}
      />
      <Controller
        control={control}
        name="dateRange"
        render={({ field }) => (
          <DateRangePicker
            label="Event Duration"
            hideTimeZone
            isRequired
            granularity="minute"
            popoverProps={{
              shouldCloseOnScroll: false,
            }}
            errorMessage={[
              ...new Set([
                errors.dateRange?.startDate?.message,
                errors.dateRange?.endDate?.message,
              ]),
            ].join(', ')}
            isInvalid={
              Boolean(errors.dateRange?.startDate?.message) ||
              Boolean(errors.dateRange?.endDate?.message)
            }
            value={
              field.value?.startDate && field.value?.endDate
                ? {
                    start: parseAbsoluteToLocal(field.value.startDate),
                    end: parseAbsoluteToLocal(field.value.endDate),
                  }
                : null
            }
            onChange={(value) => {
              if (!value) return;

              field.onChange({
                startDate: toZoned(
                  value.start,
                  getLocalTimeZone(),
                ).toAbsoluteString(),
                endDate: toZoned(
                  value.end,
                  getLocalTimeZone(),
                ).toAbsoluteString(),
              });
            }}
          />
        )}
      />
      <Button
        color="primary"
        variant="light"
        fullWidth
        onClick={handleSubmit((data) => append(data))}
      >
        Add agenda item to timeline
      </Button>
    </Card>
  );
}
