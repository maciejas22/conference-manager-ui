'use client';

import { parseAbsoluteToLocal } from '@internationalized/date';
import { Controller, useFormContext } from 'react-hook-form';

import { Card } from '@/components/card';

import { TimeLine } from '../../../components/timeline';
import { type ConferenceFormSchema } from '../types/form-schema';

export function Timeline() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ConferenceFormSchema>();

  return (
    <Card header="Timeline">
      <Controller
        name="agenda"
        control={control}
        render={({ field }) => (
          <TimeLine
            events={field.value
              .filter((i) => !i._destroy)
              .map((i) => ({
                title: i.speaker,
                description: i.event,
                date: parseAbsoluteToLocal(i.dateRange.startDate),
                onDeleteClick: () => {
                  field.onChange(
                    field.value.map((item) =>
                      item === i ? { ...item, _destroy: true } : item,
                    ),
                  );
                },
              }))}
            mode="edit"
          />
        )}
      />
      {errors.agenda?.message}
    </Card>
  );
}
