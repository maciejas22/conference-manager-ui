import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/link';

import { getStripeAccountDetails } from '@/actions/get-stripe-account';

export async function StripeOnBoardingCta() {
  const stripeAccountDetails = await getStripeAccountDetails().catch(
    () => null,
  );

  return !stripeAccountDetails?.user?.stripeAccountDetails?.isVerified ? (
    <Button
      href={`/user/stripe/${stripeAccountDetails?.user?.stripeAccountDetails?.id}/refresh`}
      color="primary"
      as={Link}
      showAnchorIcon
    >
      Finish Onboarding
    </Button>
  ) : (
    <Chip color="success" variant="flat">
      Verified
    </Chip>
  );
}
