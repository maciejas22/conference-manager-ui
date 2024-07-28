'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { parseAbsolute } from '@internationalized/date';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import {
  createConference,
  type CreateConferenceInput,
} from '#services/create-conference';
import { type AgendaItem } from '#types/agenda';

const createConferenceSchema = z.object({
  title: z.string().min(1),
  acronym: z.string().optional(),
  location: z.string().min(1),
  website: z.string().optional(),
  additionalInfo: z.string().optional(),
  startDateTime: z.string().datetime({ offset: true }),
  endDateTime: z.string().datetime({ offset: true }),
});

type CreateConferenceSchemaType = z.infer<typeof createConferenceSchema>;

export interface CreateConferenceFormState {
  errors: Partial<
    Record<keyof CreateConferenceSchemaType, string[] | undefined>
  >;
  message?: {
    id: string;
    text: string;
  };
}

interface AdditionalFormData {
  agendaItems: AgendaItem[];
  dateRange: {
    start: string;
    end: string;
  } | null;
}

export const createConferenceAction = async (
  additionalFormData: AdditionalFormData,
  _formState: CreateConferenceFormState,
  formData: FormData,
): Promise<CreateConferenceFormState> => {
  const startDateTime =
    additionalFormData.dateRange &&
    parseAbsolute(additionalFormData.dateRange.start, 'UTC').toAbsoluteString();
  const endDateTime =
    additionalFormData.dateRange &&
    parseAbsolute(additionalFormData.dateRange.end, 'UTC').toAbsoluteString();
  const validatedFields = createConferenceSchema.safeParse({
    title: formData.get('title'),
    acronym: formData.get('acronym'),
    location: formData.get('location'),
    website: formData.get('website'),
    additionalInfo: formData.get('additionalInfo'),
    startDateTime,
    endDateTime,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {
        id: nanoid(),
        text: 'Validation failed',
      },
    };
  }

  const input: CreateConferenceInput = {
    title: validatedFields.data.title,
    acronym: validatedFields.data.acronym,
    location: validatedFields.data.location,
    startDate: validatedFields.data.startDateTime,
    endDate: validatedFields.data.endDateTime,
    website: validatedFields.data.website,
    additionalInfo: validatedFields.data.additionalInfo,
    agenda: additionalFormData.agendaItems.map((item) => ({
      event: item.event,
      speaker: item.speaker,
      startTime: item.startTime,
      endTime: item.endTime,
    })),
  };

  let newConferenceData;
  try {
    newConferenceData = await createConference(input);
    if (!newConferenceData.createConference?.id) {
      throw new Error('Could not create conference');
    }
  } catch (error) {
    return {
      errors: {},
      message: {
        id: nanoid(),
        text: 'Could not create conference',
      },
    };
  }

  revalidatePath('/conferences');
  redirect(`/conference/${newConferenceData.createConference.id}`);
};
