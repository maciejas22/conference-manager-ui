'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Card } from '@/components/card';
import { DropZone } from '@/components/drop-zone';

import { FileList } from '../../../components/file-list';
import { type ConferenceFormSchema } from '../types/form-schema';
import { isDeletedFile, isUploadedFile } from '../utils/fileUtils';

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
              attachments={field.value
                .filter((file) => isUploadedFile(file) || !isDeletedFile(file))
                .map((i) => ({
                  file: i,
                  onDeleteClick: () => {
                    isUploadedFile(i)
                      ? field.onChange(field.value.filter((file) => file !== i))
                      : field.onChange(
                          field.value.map((file) =>
                            file === i ? { ...file, _destroy: true } : file,
                          ),
                        );
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
