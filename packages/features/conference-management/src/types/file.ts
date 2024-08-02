import { CreateConferenceInputFile } from '#services/create-conference';
import { RemoteFile } from '#services/get-conference';
import { ModifyConferenceInputFile } from '#services/modify-conference';
import { type MergeTypes } from '#utils/merge-types';

export type FileInput = MergeTypes<
  CreateConferenceInputFile,
  ModifyConferenceInputFile
>;

export type StoredFile = File;

export type ListFile = StoredFile | RemoteFile;

export const isRemoteFile = (file: ListFile): file is RemoteFile => {
  return 'url' in file;
};

export const isStoredFile = (file: ListFile): file is StoredFile => {
  return !isRemoteFile(file);
};
