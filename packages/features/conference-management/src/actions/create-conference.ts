'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { nanoid } from 'nanoid';
import { z } from 'zod';

import { dayjs } from '@repo/libs/dayjs';

import {
  createConference,
  type CreateConferenceAgendaItem,
  type CreateConferenceInput,
} from '#services/create-conference';

const createConferenceSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  additionalInfo: z.string(),
  hour: z.string().refine((val) => dayjs(val, 'HH:mm:ss', true).isValid()),
  date: z.string().refine((val) => dayjs(val).isValid()),
});

export interface CreateConferenceFormState {
  errors: {
    title?: string[];
    location?: string[];
    hour?: string[];
    date?: string[];
    additionalInfo?: string[];
  };
  message?: {
    id: string;
    text: string;
  };
}

export const createConferenceAction = async (
  agendaItems: CreateConferenceAgendaItem[],
  _formState: CreateConferenceFormState,
  formData: FormData,
): Promise<CreateConferenceFormState> => {
  const validatedFields = createConferenceSchema.safeParse({
    title: formData.get('title'),
    location: formData.get('location'),
    hour: formData.get('hour'),
    date: formData.get('date'),
    additionalInfo: formData.get('additionalInfo'),
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
    location: validatedFields.data.location,
    date: dayjs(
      `${validatedFields.data.date} ${validatedFields.data.hour}`,
    ).format(),
    additionalInfo: validatedFields.data.additionalInfo,
    agenda: agendaItems.map((item) => ({
      event: item.event,
      speaker: item.speaker,
      startTime: dayjs(item.startTime).format(),
      endTime: dayjs(item.endTime).format(),
    })),
  };

  try {
    const res = await createConference(input);
    revalidatePath('/conferences');
    if (res.createConference) {
      redirect(`/conference/${res.createConference.id}`);
    }
    return {
      errors: {},
      message: {
        id: nanoid(),
        text: 'Conference created successfully',
      },
    };
  } catch (error) {
    return {
      errors: {},
      message: {
        id: nanoid(),
        text: 'Could not create conference',
      },
    };
  }
};
