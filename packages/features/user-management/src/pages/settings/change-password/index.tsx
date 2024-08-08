import { FormLayout } from '../components/form-layout';
import { ChangePasswordForm } from './change-password-form';

export function ChangePasswordPage() {
  return (
    <FormLayout header="Change password">
      <ChangePasswordForm />
    </FormLayout>
  );
}
