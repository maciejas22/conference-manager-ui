import { z } from 'zod';

export const listFileSchema = z.union([
  z.instanceof(File),
  z.object({
    key: z.string(),
    size: z.number(),
    url: z.string().url(),
    _destroy: z.boolean().optional(),
  }),
]);

export const agendaItemSchema = z.object({
  id: z.number().optional(),
  speaker: z.string().min(1),
  event: z.string().min(1),
  dateRange: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
  _destroy: z.boolean().optional(),
});

export const conferenceFormSchema = z.object({
  title: z.string().min(1),
  acronym: z.string().optional(),

  location: z.string().min(1),
  dateRange: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
  website: z.string().optional(),
  additionalInfo: z.string().optional(),

  attachments: listFileSchema.array().default([]),

  agenda: agendaItemSchema.array().default([]),
});

export type ConferenceFormSchema = z.infer<typeof conferenceFormSchema>;
