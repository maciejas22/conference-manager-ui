import { z } from 'zod';

import { listFileSchema } from '../types/form-schema';

type ListFile = z.infer<typeof listFileSchema>;

export const isUploadedFile = (file: ListFile): file is File =>
  file instanceof File;
export const isDeletedFile = (file: ListFile) =>
  '_destroy' in file && file._destroy;
