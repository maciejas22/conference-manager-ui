export type FileCategory =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'archive'
  | 'code'
  | 'executable'
  | 'font';

export type FileType = {
  extensions: string[];
  icon: string;
};

export type FileTypes = Record<FileCategory, FileType>;
