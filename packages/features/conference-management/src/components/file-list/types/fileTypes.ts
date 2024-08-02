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

type FileTypes = Record<FileCategory, FileType>;

export const fileTypes: FileTypes = {
  image: {
    extensions: ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'tiff', 'svg'],
    icon: 'mdi:file-image',
  },
  video: {
    extensions: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
    icon: 'mdi:file-video',
  },
  audio: {
    extensions: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'wma'],
    icon: 'mdi:file-music',
  },
  document: {
    extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
    icon: 'mdi:file-document',
  },
  archive: {
    extensions: ['zip', 'rar', 'tar', 'gz', '7z'],
    icon: 'mdi:folder-zip',
  },
  code: {
    extensions: ['js', 'html', 'css', 'py', 'java', 'cpp', 'c', 'rb', 'php'],
    icon: 'mdi:file-code',
  },
  executable: {
    extensions: ['exe', 'bat', 'sh', 'bin', 'app'],
    icon: 'mdi:file-cog',
  },
  font: {
    extensions: ['ttf', 'otf', 'woff', 'woff2'],
    icon: 'mdi:file-font',
  },
};
