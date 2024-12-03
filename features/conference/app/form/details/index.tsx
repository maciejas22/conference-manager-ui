'use client';

import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  toZoned,
} from '@internationalized/date';
import { DateRangePicker } from '@nextui-org/date-picker';
import { Input, Textarea } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

import { Card } from '@/components/card';

import { type ConferenceFormSchema } from '../types/form-schema';

export function DetailsForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ConferenceFormSchema>();

  return (
    <Card header="Details">
      <Input
        label="Location"
        isRequired
        errorMessage={errors.location?.message}
        isInvalid={Boolean(errors.location?.message)}
        {...register('location')}
      />
      <Input
        label="Ticket Price"
        type="number"
        isRequired
        errorMessage={errors.ticketPrice?.message}
        isInvalid={Boolean(errors.ticketPrice?.message)}
        {...register('ticketPrice', { valueAsNumber: true })}
      />
      <Controller
        control={control}
        name="dateRange"
        render={({ field }) => (
          <DateRangePicker
            label="Duration"
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
              field.value.startDate && field.value.endDate
                ? {
                    start: parseAbsoluteToLocal(field.value.startDate),
                    end: parseAbsoluteToLocal(field.value.endDate),
                  }
                : null
            }
            onChange={(value) => {
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
      <Input
        label="Website"
        errorMessage={errors.website?.message}
        isInvalid={Boolean(errors.website?.message)}
        {...register('website')}
      />
      <Textarea
        label="Additional Informations"
        errorMessage={errors.additionalInfo?.message}
        isInvalid={Boolean(errors.additionalInfo?.message)}
        {...register('additionalInfo')}
      />
    </Card>
  );
}
