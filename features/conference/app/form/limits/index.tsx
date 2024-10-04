import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  toZoned,
} from '@internationalized/date';
import { DatePicker } from '@nextui-org/date-picker';
import { Input } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

import { Card } from '@/components/card';

import { type ConferenceFormSchema } from '../types/form-schema';

export function LimitsForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ConferenceFormSchema>();

  return (
    <Card header="Limits">
      <Input
        label="Limit of Participants"
        errorMessage={errors.participantsLimit?.message}
        isInvalid={Boolean(errors.participantsLimit?.message)}
        {...register('participantsLimit', { valueAsNumber: true })}
      />
      <Controller
        control={control}
        name="registrationDeadline"
        render={({ field }) => (
          <DatePicker
            label="Registration Deadline"
            hideTimeZone
            granularity="minute"
            errorMessage={errors.registrationDeadline?.message}
            isInvalid={Boolean(errors.registrationDeadline?.message)}
            value={field.value ? parseAbsoluteToLocal(field.value) : undefined}
            onChange={(value) => {
              field.onChange(
                toZoned(value, getLocalTimeZone()).toAbsoluteString(),
              );
            }}
          />
        )}
      />
    </Card>
  );
}
