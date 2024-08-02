import { Icon } from '@iconify/react';

import { Button, Link } from '@repo/libs/nextui';
import { formatBytes } from '@repo/utils/bytes-formatter';

import { isRemoteFile, isStoredFile, ListFile } from '#types/file';

import { FileCategory, fileTypes } from './types/fileTypes';

interface FileListProps {
  mode: 'view' | 'edit';
  attachments: {
    file: ListFile;
    onDeleteClick?: () => void;
  }[];
}

const getFileExtension = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.name.split('.').pop();
    case isStoredFile(file):
      return file.name.split('.').pop();
  }

  return '';
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
  }
};

const getFileSizeInBytes = (file: ListFile) => {
  switch (true) {
    case isRemoteFile(file):
      return file.size;
    case isStoredFile(file):
      return file.size;
  }

  return 0;
};

const getFormattedFileSize = (file: ListFile) => {
  return formatBytes(getFileSizeInBytes(file));
};

export const FileList = ({ mode, attachments }: FileListProps) => {
  return (
    <ul className="cm-space-y-4">
      {attachments.map((item, index) => (
        <li
          key={index}
          className="cm-flex cm-flex-row cm-items-center cm-justify-between"
        >
          <div className="cm-flex cm-flex-row cm-items-center cm-gap-2">
            <Icon icon={getExtensionIcon(item.file)} className="cm-text-2xl" />
            <Link>{getFileName(item.file)}</Link>
            <span>{getFormattedFileSize(item.file)}</span>
          </div>
          {mode === 'edit' && (
            <Button
              isIconOnly
              color="danger"
              onClick={() => {
                if (item?.onDeleteClick) {
                  console.log(item);
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
};
