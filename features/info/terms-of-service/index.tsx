import { FragmentOf, readFragment } from '@/libs/graphql';

import { TermsAccordion } from './components/accordion';
import { getTermsOfServiceFragment } from './get-terms-of-service-fragment';

type TermsOfServiceProps = {
  data: FragmentOf<typeof getTermsOfServiceFragment>;
};

export function TermsOfService({ data }: TermsOfServiceProps) {
  const terms = readFragment(getTermsOfServiceFragment, data);

  return (
    <>
      <h3 className="my-2 text-lg">{terms.introduction}</h3>
      <TermsAccordion termsConent={terms.sections} />
      <h3 className="my-2 text-lg">{terms.acknowledgement}</h3>
    </>
  );
}

export { getTermsOfServiceFragment };
