import { parseAbsoluteToLocal } from '@internationalized/date';

import { Header, Subtext } from '@repo/components';
import { getFormattedDateTime } from '@repo/utils/date-formatter';

import { getTermsOfService } from '#actions/get-terms-of-service';

import { TermsAccordion } from './components/terms-accordion';

export async function TermsPage() {
  const data = await getTermsOfService();
  const terms = data.termsAndConditions;
  const formattedDate = getFormattedDateTime(
    parseAbsoluteToLocal(terms.updatedAt),
  );

  return (
    <div className="info-my-10 info-space-y-6">
      <div className="info-flex info-justify-between">
        <Header>Terms of service</Header>
        <Subtext>Last updated: {formattedDate}</Subtext>
      </div>
      <h3 className="info-my-2 info-text-lg">{terms.introduction}</h3>
      <TermsAccordion termsConent={terms.sections} />
      <div className="info-flex info-justify-between">
        <h3 className="info-my-2 info-text-lg">{terms.acknowledgement}</h3>
        <Subtext className="info-text-right">
          Terms and conditions were generated by ChatGPT.
        </Subtext>
      </div>
    </div>
  );
}
