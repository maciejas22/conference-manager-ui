import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import { ListFile } from '../../types/file';
import {
  getExtensionIcon,
  getFileName,
  getFileUrl,
  getFormattedFileSize,
  isRemoteFile,
} from './utils';

type FileListProps = {
  mode: 'view' | 'edit';
  attachments: {
    file: ListFile;
    onDeleteClick?: () => void;
  }[];
};

export function FileList({ mode, attachments }: FileListProps) {
  return attachments.length < 1 ? (
    <h2>No files found</h2>
  ) : (
    <ul className="space-y-4">
      {attachments.map((item) => (
        <li
          key={isRemoteFile(item.file) ? item.file.key : item.file.name}
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
              aria-label={`Delete ${getFileName(item.file) ?? 'file'}`}
            >
              <Icon icon="ri:close-fill" className="h-6" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
