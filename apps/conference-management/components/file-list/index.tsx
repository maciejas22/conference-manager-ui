import { Icon } from '@iconify/react';

import { Button, Link } from '@repo/shared/nextui';
import { formatBytes } from '@repo/shared/utils/formatters/bytes-formatter/index';

import { isRemoteFile, isStoredFile, type ListFile } from '@/types/file';

import { fileTypes, type FileCategory } from './types/file-types';

type FileListProps = {
  mode: 'view' | 'edit';
  attachments: {
    file: ListFile;
    onDeleteClick?: () => void;
  }[];
};

const getFileExtension = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.name.split('.').pop();
    case isStoredFile(file):
      return file.name.split('.').pop();
    default:
      return '';
  }
};

const getExtensionIcon = (file: ListFile) => {
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

const getFileName = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.name.split('/').pop();
    case isStoredFile(file):
      return file.name;
    default:
      return 'Unknown file';
  }
};

const getFileSizeInBytes = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.size;
    case isStoredFile(file):
      return file.size;
    default:
      return 0;
  }
};

const getFormattedFileSize = (file: ListFile) => {
  return formatBytes(getFileSizeInBytes(file));
};

const getFileUrl = (file: ListFile) => {
  return isRemoteFile(file) ? file.url : undefined;
};

export function FileList({ mode, attachments }: FileListProps) {
  return (
    <ul className="space-y-4">
      {attachments.map((item) => (
        <li
          key={isRemoteFile(item.file) ? item.file.id : item.file.name}
          className="flex flex-row items-center justify-between"
        >
          <div className="flex flex-row items-center gap-2">
            <Icon icon={getExtensionIcon(item.file)} className="text-2xl" />
            <Link isExternal href={getFileUrl(item.file)}>
              {getFileName(item.file)}
            </Link>
            <span>{getFormattedFileSize(item.file)}</span>
          </div>
          {mode === 'edit' && (
            <Button
              isIconOnly
              color="danger"
              onClick={() => {
                if (item.onDeleteClick) {
                  item.onDeleteClick();
                }
              }}
              aria-label={`Delete ${item.file.name}`}
            >
              <Icon icon="ri:close-fill" className="h-6" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
