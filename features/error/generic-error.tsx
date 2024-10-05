import { Alert } from '@/components/alert';

type GenericErrorProps = {
  header: string;
  message: string;
};

export function GenericError({ header, message }: GenericErrorProps) {
  return <Alert type="error" title={header} message={message} />;
}
