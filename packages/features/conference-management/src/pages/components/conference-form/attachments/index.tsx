'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Card, DropZone } from '@repo/shared/components';

import { FileList } from '#components/file-list/index';

import { type ConferenceFormSchema } from '../types/form-schema';

export function AttachmentsForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ConferenceFormSchema>();

  return (
    <Card header="Attachments">
      <Controller
        name="attachments"
        control={control}
        render={({ field }) => (
          <>
            <FileList
              mode="edit"
              attachments={field.value.map((i) => ({
                file: i,
                onDeleteClick: () => {
                  field.onChange(field.value.filter((file) => file !== i));
                },
              }))}
            />
            <DropZone
              onDrop={(files) => {
                field.onChange([...field.value, ...files]);
              }}
            />
          </>
        )}
      />
      {errors.attachments?.message}
    </Card>
  );
}
