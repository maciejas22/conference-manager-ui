import { formatBytes } from '@/utils/formatters/bytes-formatter';

import { ListFile, RemoteFile, StoredFile } from '../../types/file';
import { fileTypes } from './file-types';
import { FileCategory } from './types/file-types';

export const isRemoteFile = (file: ListFile): file is RemoteFile => {
  return 'key' in file;
};

export const isStoredFile = (file: ListFile): file is StoredFile => {
  return !isRemoteFile(file);
};

export const getFileName = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.key.split('/').pop();
    case isStoredFile(file):
      return file.name;
    default:
      return 'Unknown file';
  }
};

export const getFileSizeInBytes = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.size;
    case isStoredFile(file):
      return file.size;
    default:
      return 0;
  }
};

export const getFormattedFileSize = (file: ListFile) => {
  return formatBytes(getFileSizeInBytes(file));
};

export const getFileUrl = (file: ListFile) => {
  return isRemoteFile(file) ? file.url : undefined;
};

export const getFileExtension = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.key.split('/').pop();
    case isStoredFile(file):
      return file.name.split('.').pop();
    default:
      return '';
  }
};

export const getExtensionIcon = (file: ListFile) => {
  const extension = getFileExtension(file);

  if (!extension) {
    return 'mdi:file';
  }
  for (const key of Object.keys(fileTypes)) {
    const fileCategory = fileTypes[key as FileCategory];
    if (fileCategory.extensions.includes(extension)) {
      return fileCategory.icon;
    }
  }

  return 'mdi:file';
};
