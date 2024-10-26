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
  speaker: z.string().min(1, { message: 'Speaker is required' }),
  event: z.string().min(1, { message: 'Event is required' }),
  dateRange: z.object({
    startDate: z.string({ message: 'Start Date is required' }).datetime(),
    endDate: z.string({ message: 'End Date is required' }).datetime(),
  }),
  _destroy: z.boolean().optional(),
});

export const conferenceFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  acronym: z.string().optional(),

  participantsLimit: z.number(),
  registrationDeadline: z.string().datetime().optional(),

  location: z.string().min(1, { message: 'Location is required' }),
  dateRange: z.object({
    startDate: z.string({ message: 'Start Date is required' }).datetime(),
    endDate: z.string({ message: 'End Date is required' }).datetime(),
  }),
  ticketPrice: z.number().min(0),
  website: z.string().optional(),
  additionalInfo: z.string().optional(),

  attachments: listFileSchema.array().default([]),

  agenda: agendaItemSchema.array().default([]),
});

export type ConferenceFormSchema = z.infer<typeof conferenceFormSchema>;
