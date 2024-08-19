'use client';

import { useFormContext } from 'react-hook-form';

import { Card } from '@repo/shared/components';
import { Input } from '@repo/shared/nextui';

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
