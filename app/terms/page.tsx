import { Header } from '@/components';
import TermsOfService from '@/features/info/terms-of-service';

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <Header>Terms of service</Header>
      <TermsOfService />
    </div>
  );
}
