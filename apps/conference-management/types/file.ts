import { z } from 'zod';

import { type MergeTypes } from '@repo/shared/utils/merge-types';

import { type CreateConferenceInputFile } from '@/graphql/create-conference';
import { type RemoteFile } from '@/graphql/get-conference';
import { type ModifyConferenceInputFile } from '@/graphql/modify-conference';

export type FileInput = MergeTypes<
  CreateConferenceInputFile,
  ModifyConferenceInputFile
>;

export type StoredFile = File;
export const storedFileSchema = z.instanceof(File);

export const remoteFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  url: z.string(),
  _destroy: z.boolean().optional(),
});

export type ListFile = StoredFile | RemoteFile;
export const listFileSchema = z.union([storedFileSchema, remoteFileSchema]);

export const isRemoteFile = (file: ListFile): file is RemoteFile => {
  return 'url' in file;
};

export const isStoredFile = (file: ListFile): file is StoredFile => {
  return !isRemoteFile(file);
};
