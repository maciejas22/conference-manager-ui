export enum FormStatus {
  Success = 'success',
  Error = 'error',
}

export type ServerResponse = {
  status: FormStatus;
  message: string;
};
