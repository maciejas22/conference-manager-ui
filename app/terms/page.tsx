import { Header } from '@/components/header';
import {
  getTermsOfServiceFragment,
  TermsOfService,
} from '@/features/info/terms-of-service';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const getTermsOfServiceQuery = graphql(
  `
    query GetTermsOfService {
      termsAndConditions {
        ...TermsOfServiceFragment
      }
    }
  `,
  [getTermsOfServiceFragment],
);

export default async function TermsPage() {
  const terms = await serverFetcher({ document: getTermsOfServiceQuery });
  return (
    <div className="space-y-6">
      <Header>Terms of service</Header>
      <TermsOfService data={terms.termsAndConditions} />
    </div>
  );
}
