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
      className="comps-mt-2 comps-flex comps-justify-center comps-rounded-lg comps-bg-zinc-800 hover:comps-bg-zinc-700 comps-px-6 comps-py-10"
    >
      <input {...getInputProps()} className="comps-sr-only" />
      <div className="comps-text-center">
        <Icon
          icon="mdi:file"
          className="comps-mx-auto comps-h-12 comps-w-12 comps-text-gray-400"
        />
        <div className="comps-mt-4 comps-flex comps-text-sm comps-leading-6 comps-text-gray-400">
          <label
            htmlFor="file-upload"
            className="comps-relative comps-cursor-pointer comps-rounded-md comps-font-semibold comps-text-primary hover:comps-text-primary/80"
          >
            <span>Upload a file</span>
          </label>
          <p className="comps-pl-1">or drag and drop</p>
        </div>
        <p className="comps-text-xs comps-leading-5 comps-text-gray-400">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
};
