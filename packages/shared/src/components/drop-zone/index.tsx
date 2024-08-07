'use client';

import { useCallback } from 'react';

import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onDrop: (files: File[]) => void;
}

export const DropZone = ({ onDrop }: DropZoneProps) => {
  const onFilesRead = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 10 * 1024 * 1024,
    onDrop: onFilesRead,
  });

  return (
    <div
      {...getRootProps()}
      className="mt-2 flex justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 px-6 py-10"
    >
      <input {...getInputProps()} className="comps-sr-only" />
      <div className="text-center">
        <Icon icon="mdi:file" className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4 flex text-sm leading-6 text-gray-400">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
          >
            <span>Upload a file</span>
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-400">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
};
