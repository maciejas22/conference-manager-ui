import { Icon } from '@iconify/react';

import { Button, Link } from '@repo/shared/nextui';
import { formatBytes } from '@repo/shared/utils/formatters/bytes-formatter/index';

import { isRemoteFile, isStoredFile, type ListFile } from '#types/file';

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

export function FileList({ mode, attachments }: FileListProps) {
  return (
    <ul className="cm-space-y-4">
      {attachments.map((item) => (
        <li
          key={isRemoteFile(item.file) ? item.file.id : item.file.name}
          className="cm-flex cm-flex-row cm-items-center cm-justify-between"
        >
          <div className="cm-flex cm-flex-row cm-items-center cm-gap-2">
            <Icon icon={getExtensionIcon(item.file)} className="cm-text-2xl" />
            <Link isExternal>{getFileName(item.file)}</Link>
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
              <Icon icon="ri:close-fill" className="cm-h-6" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
