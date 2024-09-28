import type { Metadata } from 'next';

import { ChangePasswordForm } from '@/features/user-management/change-password';

export const metadata: Metadata = {
  title: 'Change Password | Conference Manager',
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
