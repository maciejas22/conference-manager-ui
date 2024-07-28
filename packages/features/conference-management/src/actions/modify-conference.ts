'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { parseAbsolute } from '@internationalized/date';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import {
  modifyConference,
  type ModifyConferenceInput,
} from '#services/modify-conference';
import { type AgendaItem } from '#types/agenda';

const modifyConferenceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  acronym: z.string().optional(),
  location: z.string().min(1),
  website: z.string().optional(),
  additionalInfo: z.string().optional(),
  startDateTime: z.string().datetime({ offset: true }),
  endDateTime: z.string().datetime({ offset: true }),
});

type ModifyConferenceSchemaType = z.infer<typeof modifyConferenceSchema>;

export interface ModifyConferenceFormState {
  errors: Partial<
    Record<keyof ModifyConferenceSchemaType, string[] | undefined>
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

export const modifyConferenceAction = async (
  additionalFormData: AdditionalFormData,
  _formState: ModifyConferenceFormState,
  formData: FormData,
): Promise<ModifyConferenceFormState> => {
  const startDateTime =
    additionalFormData.dateRange &&
    parseAbsolute(additionalFormData.dateRange.start, 'UTC').toAbsoluteString();
  const endDateTime =
    additionalFormData.dateRange &&
    parseAbsolute(additionalFormData.dateRange.end, 'UTC').toAbsoluteString();
  const validatedFields = modifyConferenceSchema.safeParse({
    id: formData.get('id'),
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
        id: 'error',
        text: 'Validation failed',
      },
    };
  }

  const input: ModifyConferenceInput = {
    id: validatedFields.data.id,
    title: validatedFields.data.title,
    acronym: validatedFields.data.acronym,
    location: validatedFields.data.location,
    startDate: validatedFields.data.startDateTime,
    endDate: validatedFields.data.endDateTime,
    website: validatedFields.data.website,
    additionalInfo: validatedFields.data.additionalInfo,
    agenda: additionalFormData.agendaItems.map((item) => ({
      id: item.id,
      event: item.event,
      speaker: item.speaker,
      startTime: item.startTime,
      endTime: item.endTime,
    })),
  };

  let newConferenceData;
  try {
    newConferenceData = await modifyConference(input);

    if (!newConferenceData.modifyConference?.id) {
      throw new Error('Failed to modify conference');
    }
  } catch (error) {
    console.error(error);
    return {
      errors: {},
      message: {
        id: 'error',
        text: 'Failed to modify conference',
      },
    };
  }

  revalidatePath('/conferences');
  revalidatePath(`/conference/${newConferenceData.modifyConference.id}`);
  redirect(`/conference/${newConferenceData.modifyConference.id}`);
};
