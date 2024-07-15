'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  parseTime,
  parseZonedDateTime,
  toCalendarDate,
  toCalendarDateTime,
  toZoned,
} from '@internationalized/date';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { dayjs } from '@repo/libs/dayjs';

import {
  modifyConference,
  type ModifyConferenceAgendaItem,
  type ModifyConferenceInput,
} from '#services/modify-conference';

const modifyConferenceSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  additionalInfo: z.string().min(1),
  hour: z.string().refine((val) => dayjs(val, 'HH:mm:ss', true).isValid()),
  date: z.string().refine((val) => dayjs(val).isValid()),
});

export interface ModifyConferenceFormState {
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

export const modifyConferenceAction = async (
  agendaItems: ModifyConferenceAgendaItem[],
  _formState: ModifyConferenceFormState,
  formData: FormData,
): Promise<ModifyConferenceFormState> => {
  const date = toCalendarDate(
    parseZonedDateTime(formData.get('date') as string),
  );
  const time = parseTime(formData.get('hour') as string);

  const validatedFields = modifyConferenceSchema.safeParse({
    title: formData.get('title'),
    location: formData.get('location'),
    hour: time.toString(),
    date: date.toString(),
    additionalInfo: formData.get('additionalInfo'),
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

  const dateTime = toCalendarDateTime(date, time);
  const isoDate = toZoned(dateTime, 'UTC').toAbsoluteString();
  const input: ModifyConferenceInput = {
    id: formData.get('id') as string,
    title: validatedFields.data.title,
    location: validatedFields.data.location,
    date: isoDate,
    additionalInfo: validatedFields.data.additionalInfo,
    agenda: agendaItems.map((item) => ({
      id: item.id,
      event: item.event,
      speaker: item.speaker,
      startTime: dayjs(item.startTime).format(),
      endTime: dayjs(item.endTime).format(),
      _destroy: item._destroy,
    })),
  };

  try {
    const res = await modifyConference(input);
    const newConferenceData = res.modifyConference;
    if (newConferenceData?.id) {
      revalidatePath('/conferences');
      revalidatePath(`/conference/${newConferenceData.id}`);
      redirect(`/conference/${newConferenceData.id}`);
    }
  } catch (error) {
    return {
      errors: {},
      message: {
        id: nanoid(),
        text: 'Could not modify conference',
      },
    };
  }

  return {
    errors: {},
  };
};
