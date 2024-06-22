"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
  parseTime,
  parseZonedDateTime,
  toCalendarDate,
  toCalendarDateTime,
  toZoned,
} from "@/lib/date";
import { dayjs } from "@/lib/dayjs";

import {
  AgendaItem,
  CreateConferenceInput,
  ModifyConferenceInput,
} from "@/graphql/__types__/types";

import {
  createConference,
  getAssociatedConferences as getAssociatedConferencesQuery,
  joinConference,
  leaveConference,
  modifyConference,
} from "@/services/conference";

const createConferenceSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  additionalInfo: z.string().min(1),
  hour: z.string().refine((val) => dayjs(val, "HH:mm:ss", true).isValid()),
  date: z.string().refine((val) => dayjs(val).isValid()),
});

interface FormState {
  errors: {
    title?: string[];
    location?: string[];
    hour?: string[];
    date?: string[];
    additionalInfo?: string[];
  };
  message?: string;
}

async function createConferenceAction(
  agendaItems: AgendaItem[],
  _formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = createConferenceSchema.safeParse({
    title: formData.get("title"),
    location: formData.get("location"),
    hour: formData.get("hour"),
    date: formData.get("date"),
    additionalInfo: formData.get("additionalInfo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
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

  let newConferenceData;
  try {
    const res = await createConference(input);
    newConferenceData = res?.createConference;
  } catch (error) {
    return {
      errors: {},
      message: "Could not create conference",
    };
  }

  revalidatePath("/conferences");
  redirect(`/conference/${newConferenceData?.id}`);
}

async function modifyConferenceAction(
  agendaItems: AgendaItem[],
  _formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const date = toCalendarDate(
    parseZonedDateTime(formData.get("date") as string),
  );
  const time = parseTime(formData.get("hour") as string);

  const validatedFields = createConferenceSchema.safeParse({
    title: formData.get("title"),
    location: formData.get("location"),
    hour: time.toString(),
    date: date.toString(),
    additionalInfo: formData.get("additionalInfo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const dateTime = toCalendarDateTime(date, time);
  const isoDate = toZoned(dateTime, "UTC").toAbsoluteString();
  const input: ModifyConferenceInput = {
    id: formData.get("id") as string,
    title: validatedFields.data.title,
    location: validatedFields.data.location,
    date: isoDate,
    additionalInfo: validatedFields.data.additionalInfo,
    agenda: agendaItems.map((item) => ({
      event: item.event,
      speaker: item.speaker,
      startTime: dayjs(item.startTime).format(),
      endTime: dayjs(item.endTime).format(),
    })),
  };

  let newConferenceData;
  try {
    const res = await modifyConference(input);
    newConferenceData = res?.modifyConference;
  } catch (error) {
    return {
      errors: {},
      message: "Could not modify conference",
    };
  }

  revalidatePath("/conferences");
  revalidatePath(`/conference/${newConferenceData?.id}`);
  redirect(`/conference/${newConferenceData?.id}`);
}

async function joinConferenceAction(conferenceId: string) {
  const queryClient = new QueryClient();

  try {
    const data = await queryClient.fetchQuery({
      queryKey: [],
      queryFn: async () => joinConference(conferenceId),
    });

    revalidatePath(`/conference/${conferenceId}`);
    return data.addUserToConference?.id;
  } catch (error) {
    return null;
  }
}

async function leaveConferenceAction(conferenceId: string) {
  const queryClient = new QueryClient();

  try {
    const data = await queryClient.fetchQuery({
      queryKey: [],
      queryFn: async () => leaveConference(conferenceId),
    });

    revalidatePath(`/conference/${conferenceId}`);
    return data.removeUserFromConference?.id;
  } catch (error) {
    return null;
  }
}

async function getAssociatedConferences() {
  const queryClient = new QueryClient();

  try {
    const data = await queryClient.fetchQuery({
      queryKey: ["associated-conferences"],
      queryFn: async () => getAssociatedConferencesQuery(),
    });
    return data.associatedConferences;
  } catch (error) {
    return null;
  }
}

export {
  createConferenceAction,
  getAssociatedConferences,
  joinConferenceAction,
  leaveConferenceAction,
  modifyConferenceAction,
  type FormState,
};
