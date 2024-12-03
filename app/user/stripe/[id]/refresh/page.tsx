import { redirect } from 'next/navigation';

import { publicEnv } from '@/config/env';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getAccountLinkMutation = graphql(`
  mutation GetAccontLink($returnUrl: String!, $refreshUrl: String!) {
    stripeOnboard(returnUrl: $returnUrl, refreshUrl: $refreshUrl)
  }
`);

export default async function StripeRefreshPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await params.then((p) => p.id);
  const accountLink = await serverFetcher({
    document: getAccountLinkMutation,
    variables: {
      returnUrl: `${publicEnv.uiBaseUrl}/user/stripe`,
      refreshUrl: `${publicEnv.apiBaseUrl}/api/stripe/${id}/refresh`,
    },
  });

  redirect(accountLink.stripeOnboard);
}
