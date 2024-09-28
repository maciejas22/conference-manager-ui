'use client';

import { Input } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

import { Card } from '@/components';

import { type ConferenceFormSchema } from '../types/form-schema';

export function KeyInformationsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ConferenceFormSchema>();

  return (
    <Card header="Informations">
      <Input
        label="Title"
        isRequired
        errorMessage={errors.title?.message}
        isInvalid={Boolean(errors.title?.message)}
        {...register('title')}
      />
      <Input
        label="Acronym"
        errorMessage={errors.acronym?.message}
        isInvalid={Boolean(errors.acronym?.message)}
        {...register('acronym')}
      />
    </Card>
  );
}
