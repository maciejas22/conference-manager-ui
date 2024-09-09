import type { Metadata } from 'next';

import { ChangePasswordForm } from './change-password-form';

export const metadata: Metadata = {
  title: 'Change Password | Conference Manager',
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
