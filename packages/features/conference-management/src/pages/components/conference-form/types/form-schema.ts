import { z } from 'zod';

import { ListFileSchema } from '#types/file';

export const agendaItemSchema = z.object({
  id: z.string().optional(),
  speaker: z.string().min(1),
  event: z.string().min(1),
  dateRange: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
  _destroy: z.boolean().optional(),
});

export const conferenceFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  acronym: z.string().optional(),

  location: z.string().min(1),
  dateRange: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
  website: z.string().optional(),
  additionalInfo: z.string().optional(),

  attachments: ListFileSchema.array().default([]),

  agenda: agendaItemSchema.array().default([]),
});
export type ConferenceFormSchema = z.infer<typeof conferenceFormSchema>;
