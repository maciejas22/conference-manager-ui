import 'react-dom';

declare module 'react-dom' {
  interface FormStatusNotPending {
    pending: false;
    data: null;
    method: null;
    action: null;
  }

  interface FormStatusPending {
    pending: true;
    data: FormData;
    method: string;
    action: string | ((formData: FormData) => void | Promise<void>);
  }

  type FormStatus = FormStatusPending | FormStatusNotPending;

  function useFormStatus(): FormStatus;
}
