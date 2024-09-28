export type StoredFile = File;
export type RemoteFile = {
  key: string;
  size: number;
  url: string;
  _destroy?: boolean;
};

export type ListFile = StoredFile | RemoteFile;
