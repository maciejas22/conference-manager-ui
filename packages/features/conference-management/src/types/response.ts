export enum ResponseStatus {
  Success = 'success',
  Error = 'error',
}

export type ServerResponse = {
  status: ResponseStatus;
  message: string;
};
