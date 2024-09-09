import { z } from 'zod';
import { zfd } from 'zod-form-data';

const uploadFileSchema = z.object({
  fileName: z.string(),
  base64Content: z.string(),
});

const deleteFileSchema = z.object({
  id: z.string(),
});

const createAgendaItemSchema = z.object({
  speaker: z.string(),
  event: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const createConferenceSchema = zfd.formData({
  title: zfd.text(),
  acronym: zfd.text().optional(),
  location: zfd.text(),
  startDate: zfd.text(),
  endDate: zfd.text(),
  website: zfd.text().optional(),
  additionalInfo: zfd.text().optional(),
  agenda: zfd.json(z.array(createAgendaItemSchema)),
  attachments: zfd.json(z.array(uploadFileSchema)),
});

const modifyAgendaItemSchema = createAgendaItemSchema.extend({
  id: z.string(),
  _destroy: z.boolean().optional(),
});

export const modifyConferenceSchema = zfd.formData({
  id: zfd.text(),
  title: zfd.text(),
  acronym: zfd.text().optional(),
  location: zfd.text(),
  startDate: zfd.text(),
  endDate: zfd.text(),
  website: zfd.text().optional(),
  additionalInfo: zfd.text().optional(),
  agenda: zfd.json(z.array(modifyAgendaItemSchema)),
  attachments: zfd.json(z.array(z.union([uploadFileSchema, deleteFileSchema]))),
});
