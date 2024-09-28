import { getTermsOfService } from './action';
import { TermsAccordion } from './components/accordion';

export default async function TermsOfService() {
  const termsData = await getTermsOfService();
  const terms = termsData?.termsAndConditions;

  return (
    <>
      <h3 className="my-2 text-lg">{terms.introduction}</h3>
      <TermsAccordion termsConent={terms.sections} />
      <h3 className="my-2 text-lg">{terms.acknowledgement}</h3>
    </>
  );
}
